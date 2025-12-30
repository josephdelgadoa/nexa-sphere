#!/bin/bash
set -e

# Configuration
VPS_USER="root"
VPS_HOST="srv1229016.hstgr.cloud"
PROJECT_NAME="nexa-sphere"
REMOTE_DIR="/root/${PROJECT_NAME}"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Deploying ${PROJECT_NAME} to ${VPS_HOST} ===${NC}"

# 1. Ask for Secrets (if not set in env)
if [ -z "$GEMINI_API_KEY" ]; then
    read -s -p "Enter GEMINI_API_KEY: " GEMINI_API_KEY
    echo ""
fi

if [ -z "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" ]; then
    read -s -p "Enter NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: " NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    echo ""
fi

# 2. Build URL
NEXT_PUBLIC_API_URL="http://${VPS_HOST}:8080"
echo -e "Backend URL will be: ${GREEN}${NEXT_PUBLIC_API_URL}${NC}"

# 3. Zip the project
echo -e "${BLUE}Zipping project...${NC}"
zip -r ${PROJECT_NAME}.zip . -x "*/node_modules/*" -x "*/.git/*" -x "*/.next/*" -x "*/dist/*"

# 4. Copy to VPS
echo -e "${BLUE}Copying to VPS...${NC}"
scp ${PROJECT_NAME}.zip ${VPS_USER}@${VPS_HOST}:/root/

# 5. SSH and Deploy
echo -e "${BLUE}Executing remote deployment commands...${NC}"
ssh ${VPS_USER}@${VPS_HOST} << EOF
    # Install unzip and docker if missing (basic check)
    if ! command -v unzip &> /dev/null; then
        apt-get update && apt-get install -y unzip
    fi

    # Prepare directory
    mkdir -p ${REMOTE_DIR}
    mv /root/${PROJECT_NAME}.zip ${REMOTE_DIR}/
    cd ${REMOTE_DIR}
    
    # Overwrite with new files
    unzip -o ${PROJECT_NAME}.zip > /dev/null
    rm ${PROJECT_NAME}.zip

    # Create .env file for Docker Compose
    echo "GEMINI_API_KEY=${GEMINI_API_KEY}" > .env
    echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env
    echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}" >> .env

    # Start services with the PROD compose file
    echo "Rebuilding and restarting containers..."
    docker compose -f docker-compose.prod.yml down
    docker compose -f docker-compose.prod.yml up -d --build --remove-orphans
EOF

echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "Frontend: http://${VPS_HOST}:8003"
echo -e "Backend:  http://${VPS_HOST}:8080"

# Cleanup local zip
rm ${PROJECT_NAME}.zip
