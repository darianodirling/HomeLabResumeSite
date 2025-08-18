#!/bin/bash

# Simple setup script for Ubuntu deployment
echo "Setting up portfolio website..."

# Replace vite config with Ubuntu-compatible version
cp vite.config.standalone.ts vite.config.ts

# Install dependencies and build
npm install
npm run build

# Create .env if needed
if [ ! -f .env ]; then
    cp .env.example .env
    echo "NODE_ENV=development" >> .env
    echo "Created .env file - running in development mode to avoid serveStatic issue"
fi

# Force development mode to avoid serveStatic path issues
sed -i 's/NODE_ENV=production/NODE_ENV=development/' .env

echo "Setup complete!"
echo "The server will run in development mode to avoid Node.js compatibility issues."
echo "Run 'npm start' to start the server."