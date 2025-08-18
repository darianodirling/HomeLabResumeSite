#!/bin/bash

# Ubuntu-compatible start script
# This bypasses the serveStatic issue by running in development mode

echo "Starting portfolio website (Ubuntu-compatible)..."

# Ensure we have the built files
if [ ! -d "dist" ]; then
    echo "Building application first..."
    npm run build
fi

# Start in development mode to use vite middleware instead of serveStatic
NODE_ENV=development npm start