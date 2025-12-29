#!/bin/bash
set -e

# Configuration
VPS_USER="root" # Change this if using a different user
VPS_IP=""       # User must provide this
PROJECT_NAME="nexa-sphere"
REMOTE_DIR="/root/${PROJECT_NAME}"

# 1. Ask for VPS IP if not set
if [ -z "$VPS_IP" ]; then
    read -p "Enter VPS IP Address: " VPS_IP
fi

# 2. Ask for Environment Variables
read -s -p "Enter GEMINI_API_KEY: " GEMINI_API_KEY
echo ""
NEXT_PUBLIC_API_URL="http://${VPS_IP}:8080" # Default backend URL

echo "Using Backend URL: $NEXT_PUBLIC_API_URL"

# 3. Zip the project (excluding node_modules and git)
echo "Zipping project..."
zip -r ${PROJECT_NAME}.zip . -x "*/node_modules/*" -x "*/.git/*" -x "*/.next/*" -x "*/dist/*"

# 4. Copy to VPS
echo "Copying to VPS (${VPS_IP})..."
scp ${PROJECT_NAME}.zip ${VPS_USER}@${VPS_IP}:/root/

# 5. SSH and Deploy
echo "Deploying on VPS..."
ssh ${VPS_USER}@${VPS_IP} << EOF
    # Install unzip if missing
    apt-get install -y unzip

    # Prepare directory
    mkdir -p ${REMOTE_DIR}
    mv /root/${PROJECT_NAME}.zip ${REMOTE_DIR}/
    cd ${REMOTE_DIR}
    
    # Overwrite with new files
    unzip -o ${PROJECT_NAME}.zip
    rm ${PROJECT_NAME}.zip

    # Create .env file for Docker Compose
    echo "GEMINI_API_KEY=${GEMINI_API_KEY}" > .env
    echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env

    # Start services (rebuild to pick up changes)
    docker compose down
    docker compose up -d --build --remove-orphans
EOF

echo "Deployment Complete!"
echo "Frontend: http://${VPS_IP}"
echo "Backend:  http://${VPS_IP}:8080"

# Cleanup local zip
rm ${PROJECT_NAME}.zip
