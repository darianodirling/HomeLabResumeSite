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
    echo "Created .env file - edit if needed"
fi

echo "Setup complete. Run 'npm start' to start the server."