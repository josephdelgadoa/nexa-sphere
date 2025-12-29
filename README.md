# Nexa-Sphere: AI-Powered Consulting Agency Website

Nexa-Sphere is a modern, AI-empowered website for a Silicon Valley-based consulting agency. It features a Next.js frontend, a Node.js backend, and deep integration with Google's Gemini API for intelligent user experiences.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion (planned)
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Gemini API (gemini-1.5-pro)
- **Cloud**: Google Cloud Run, Firebase Hosting (optional)

## 📂 Project Structure

```
/nexa-sphere
  /frontend      # Next.js application
    /app         # App Router pages
    /components  # Reusable UI components
    /services    # API integration services
  /backend       # Node.js Express application
    /index.ts    # Server entry point
    /gemini.ts   # AI logic
```

## 🛠 Prerequisites

- Node.js v18+
- npm or pnpm
- Google Cloud Account
- Gemini API Key (from Google AI Studio)

## 💻 Local Development Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Add your Gemini API Key to `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=8080
   ```
5. Start the server:                                              
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8080`.

### Custom Domain Configuration (e.g., Hostinger)

1.  **Generate Records**: Run `gcloud beta run domain-mappings create --service nexa-frontend --domain [YOUR_DOMAIN] --region us-central1`.
2.  **Update DNS**: Log in to your registrar (Hostinger, Namecheap, etc.).
3.  **Clean Up**: **Delete** any existing `A` records that point to default parking pages (e.g., `84.32.84.32`).
4.  **Add New Records**: Add the records provided by the `gcloud` command.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   Ensure `NEXT_PUBLIC_API_URL` points to your backend (default: `http://localhost:8080/api`).
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

## ☁️ Google Cloud Deployment

We have automated the deployment process to Google Cloud Run!

### Prerequisites

1.  **Google Cloud SDK (`gcloud`)**: Must be installed and authenticated.
    - [Install Guide](https://cloud.google.com/sdk/docs/install)
    - Run `gcloud init` after installation.

### Automated Deployment (Recommended)

Run the included deployment script to build and deploy both the Frontend and Backend:

```bash
./deploy.sh
```

This script will:
1.  Check for `gcloud` installation.
2.  Enable necessary Google Cloud APIs.
3.  Deploy the **Backend** to Cloud Run.
4.  Build the **Frontend** with the correct Backend URL.
5.  Deploy the **Frontend** to Cloud Run.

### Manual Steps (Reference)

If you prefer to deploy manually or need to troubleshoot, you can follow these steps:

#### Backend (Cloud Run)

1.  **Build the container**:
    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/nexa-backend ./backend
    ```
2.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy nexa-backend \
      --image gcr.io/YOUR_PROJECT_ID/nexa-backend \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --set-env-vars GEMINI_API_KEY=your_key
    ```
3.  Note the URL provided by Cloud Run.

#### Frontend (Cloud Run)

1.  **Build the container** (requires Backend URL):
    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/nexa-frontend \
      --build-arg NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL ./frontend
    ```
2.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy nexa-frontend \
      --image gcr.io/YOUR_PROJECT_ID/nexa-frontend \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --set-env-vars NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL
    ```

## 🤖 AI Features

- **Service Recommender**: Analyzes user needs (industry, goals, budget) to suggest the best Nexa-Sphere service.
- **FAQ Assistant**: An intelligent chatbot that answers questions about the agency using a predefined context.
- **Contact Helper**: Generates professional message drafts for users based on their topic and key points.

## 📝 Maintenance

- **Logs**: View backend logs in Google Cloud Console > Cloud Run > Logs.
- **API Keys**: Rotate keys in Google Cloud Secret Manager or Cloud Run environment variables.
                                ...................................