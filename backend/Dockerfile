FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies) to allow building
RUN npm ci

COPY . .

# Build the TypeScript code
RUN npm run build

# Prune dev dependencies to keep image small (optional but good practice)
# Re-install only production deps
# RUN npm prune --production

EXPOSE 8080

CMD ["npm", "start"]
