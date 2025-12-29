#!/bin/bash
set -e

# Configuration
REGION="us-central1"
BACKEND_SERVICE="nexa-backend"
FRONTEND_SERVICE="nexa-frontend"
# Secrets should be loaded from environment or .env.local
# STRIPE_SECRET_KEY="<your-secret-key>"
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="<your-publishable-key>"
NEXT_PUBLIC_BASE_URL="https://nexa-sphere.com"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Deployment to Google Cloud Run ===${NC}"

# 1. Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed or not in your PATH.${NC}"
    echo "Please install the Google Cloud SDK: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# 2. Check if user is logged in
echo "Checking authentication..."
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Error: No active GCP project found.${NC}"
    echo "Run 'gcloud init' or 'gcloud config set project [YOUR_PROJECT_ID]' first."
    exit 1
fi
echo -e "Deploying to Project: ${GREEN}$PROJECT_ID${NC}"

# 3. Enable necessary APIs (Idempotent)
echo -e "${BLUE}Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com

# 4. Deploy Backend
echo -e "${BLUE}Deploying Backend to Cloud Run ($REGION)...${NC}"
cd backend
gcloud run deploy $BACKEND_SERVICE \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --platform managed

# Get the assigned URL
BACKEND_URL=$(gcloud run services describe $BACKEND_SERVICE --region $REGION --format 'value(status.url)')
echo -e "${GREEN}Backend successfully deployed at: $BACKEND_URL${NC}"

# 5. Deploy Frontend
echo -e "${BLUE}Deploying Frontend to Cloud Run ($REGION)...${NC}"
cd ../frontend


# Load environment variables from frontend/.env.local
if [ -f ../frontend/.env.local ]; then
    echo -e "${BLUE}Loading environment variables from frontend/.env.local...${NC}"
    export $(grep -v '^#' ../frontend/.env.local | xargs)
fi

# Deploy with the BACKEND_URL environment variable
# We need to build the image first to pass the build argument
echo "Building Frontend Image..."
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_NEXT_PUBLIC_API_URL=$BACKEND_URL/api,_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,_NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL .

echo "Deploying Frontend Container..."
gcloud run deploy $FRONTEND_SERVICE \
  --image gcr.io/$PROJECT_ID/$FRONTEND_SERVICE \
  --region $REGION \
  --allow-unauthenticated \
  --platform managed \
  --set-env-vars NEXT_PUBLIC_API_URL=$BACKEND_URL/api,STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY,NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_STRIPE_PRICE_STARTER=$NEXT_PUBLIC_STRIPE_PRICE_STARTER,NEXT_PUBLIC_STRIPE_PRICE_GROWTH=$NEXT_PUBLIC_STRIPE_PRICE_GROWTH,NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR=$NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR,NEXT_PUBLIC_STRIPE_PRICE_STARTER_ONETIME=$NEXT_PUBLIC_STRIPE_PRICE_STARTER_ONETIME,NEXT_PUBLIC_STRIPE_PRICE_STARTER_MAINTENANCE=$NEXT_PUBLIC_STRIPE_PRICE_STARTER_MAINTENANCE,NEXT_PUBLIC_STRIPE_PRICE_GROWTH_ONETIME=$NEXT_PUBLIC_STRIPE_PRICE_GROWTH_ONETIME,NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MAINTENANCE=$NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MAINTENANCE,NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_ONETIME=$NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_ONETIME,NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_MAINTENANCE=$NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_MAINTENANCE,NEXT_PUBLIC_STRIPE_PRICE_AGENCY_IGNITE=$NEXT_PUBLIC_STRIPE_PRICE_AGENCY_IGNITE,NEXT_PUBLIC_STRIPE_PRICE_AGENCY_GROWTH=$NEXT_PUBLIC_STRIPE_PRICE_AGENCY_GROWTH,NEXT_PUBLIC_STRIPE_PRICE_AGENCY_DOMINATOR=$NEXT_PUBLIC_STRIPE_PRICE_AGENCY_DOMINATOR,NEXT_PUBLIC_STRIPE_PRICE_AGENCY_ELITE=$NEXT_PUBLIC_STRIPE_PRICE_AGENCY_ELITE,NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_CORE=$NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_CORE,NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_FULL=$NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_FULL

FRONTEND_URL=$(gcloud run services describe $FRONTEND_SERVICE --region $REGION --format 'value(status.url)')

echo -e "${BLUE}=== Deployment Complete ===${NC}"
echo -e "Frontend: ${GREEN}$FRONTEND_URL${NC}"
echo -e "Backend:  ${GREEN}$BACKEND_URL${NC}"
