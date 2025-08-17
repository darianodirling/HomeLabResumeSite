#!/bin/bash

# Deployment script for portfolio website
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="portfolio-website"

echo "🚀 Deploying $PROJECT_NAME to $ENVIRONMENT environment..."

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your actual configuration values"
    echo "🛑 Deployment paused. Please configure .env and run again."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run type checking
echo "🔍 Running type checks..."
npm run check

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Set up systemd service (if running on Linux)
if command -v systemctl >/dev/null 2>&1; then
    echo "🔧 Setting up systemd service..."
    
    # Create systemd service file
    sudo tee /etc/systemd/system/$PROJECT_NAME.service > /dev/null <<EOF
[Unit]
Description=Portfolio Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$(pwd)
ExecStart=$(which node) dist/index.js
Restart=on-failure
Environment=NODE_ENV=$ENVIRONMENT
EnvironmentFile=$(pwd)/.env

[Install]
WantedBy=multi-user.target
EOF

    # Enable and start service
    sudo systemctl enable $PROJECT_NAME.service
    sudo systemctl restart $PROJECT_NAME.service
    sudo systemctl status $PROJECT_NAME.service
    
    echo "✅ Systemd service configured and started"
else
    echo "ℹ️  Systemd not available. Starting application manually..."
    npm start &
    echo "✅ Application started in background"
fi

# Check if application is running
echo "🔍 Checking application health..."
sleep 5

PORT=${PORT:-5000}
if curl -f http://localhost:$PORT/api/health >/dev/null 2>&1; then
    echo "✅ Application is running and healthy on port $PORT"
else
    echo "⚠️  Health check failed. Please check the application logs."
fi

echo "🎉 Deployment completed!"
echo "📍 Application URL: http://localhost:$PORT"
echo "📋 Logs: sudo journalctl -u $PROJECT_NAME.service -f"