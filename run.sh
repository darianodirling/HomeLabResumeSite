#!/bin/bash

# Direct run script for Ubuntu - bypasses npm scripts entirely
echo "Running portfolio website directly..."

# Update vite config
cp vite.config.standalone.ts vite.config.ts

# Set environment and run server directly
export NODE_ENV=development
export HOST=0.0.0.0
export PORT=5000

# Run the server directly with tsx
npx tsx server/index.ts