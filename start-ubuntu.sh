#!/bin/bash

# Ubuntu-compatible start script
# This bypasses the serveStatic issue by running the dev server directly

echo "Starting portfolio website (Ubuntu-compatible)..."

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies first..."
    npm install
fi

# Replace vite config if not already done
if [ ! -f "vite.config.ts.backup" ]; then
    echo "Updating vite config for Ubuntu compatibility..."
    cp vite.config.ts vite.config.ts.backup
    cp vite.config.standalone.ts vite.config.ts
fi

# Create .env if needed
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file"
fi

# Start the development server directly (bypasses production serveStatic)
echo "Starting server in development mode..."
NODE_ENV=development HOST=0.0.0.0 PORT=5000 tsx server/index.ts