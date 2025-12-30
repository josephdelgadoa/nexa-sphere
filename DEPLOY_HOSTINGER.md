# Deploying to Hostinger VPS

This guide explains how to deploy the **Nexa Sphere** application to your Hostinger VPS (`srv1229016.hstgr.cloud`) on port **8003**.

## Prerequisites

1.  **SSH Access**: Ensure you have SSH access to `root@srv1229016.hstgr.cloud`.
2.  **Docker on VPS**: The VPS must have Docker and Docker Compose installed. (The `deploy_hostinger.sh` script assumes they are present, or use `vps_setup.sh` to install them first).
3.  **Ports**: Ensure ports `8003` (Frontend) and `8080` (Backend) are open in your VPS firewall.

## Deployment Steps

1.  **Run the Deployment Script**:
    From your local machine's project root, run:
    ```bash
    ./deploy_hostinger.sh
    ```

2.  **Provide Secrets**:
    The script will prompt you for:
    - `GEMINI_API_KEY`
    - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    (If these are set in your local environment, the script will use them automatically).

3.  **Wait for Completion**:
    The script will:
    - Zip your local code (excluding heavy folders).
    - SCP the zip to the VPS.
    - SSH into the VPS, unzip, and run `docker compose up`.

## Verification

After successful deployment, access your application at:
- **Frontend**: [http://srv1229016.hstgr.cloud:8003](http://srv1229016.hstgr.cloud:8003)
- **Backend API**: [http://srv1229016.hstgr.cloud:8080](http://srv1229016.hstgr.cloud:8080)

## Troubleshooting

- **Connection Refused**: Check if the Docker containers are running on the VPS:
  ```bash
  ssh root@srv1229016.hstgr.cloud "docker ps"
  ```
- **Logs**: View logs for debugging:
  ```bash
  ssh root@srv1229016.hstgr.cloud "cd nexa-sphere && docker compose -f docker-compose.prod.yml logs -f"
  ```
