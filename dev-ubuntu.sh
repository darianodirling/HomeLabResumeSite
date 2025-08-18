#!/bin/bash

# Ubuntu-compatible development script
# Usage: ./dev-ubuntu.sh

echo "🚀 Starting development server (Ubuntu-compatible)..."

# Check if we need to build first
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

# Start development server with ubuntu-compatible config
echo "🔄 Starting development server..."
NODE_ENV=development npx tsx server/index.ts