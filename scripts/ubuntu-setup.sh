#!/bin/bash

# Ubuntu Server Setup Script - Run after git pull
# Usage: ./scripts/ubuntu-setup.sh

set -e

echo "🚀 Setting up Portfolio Website on Ubuntu Server"

# Check Node.js version
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1 || echo "0")
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node --version 2>/dev/null || echo 'not installed')"
    echo "Install Node.js 20 LTS:"
    echo "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
    echo "sudo apt-get install -y nodejs"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application with production config
echo "🔨 Building application..."
npm run build

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before starting the server"
fi

# Make scripts executable
echo "🔧 Setting up permissions..."
chmod +x scripts/*.sh

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the server:"
echo "   npm start"
echo ""
echo "🌐 Server will be available at:"
echo "   http://your-server-ip:5000"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env file if needed"
echo "   2. Run 'npm start' to start the production server"
echo "   3. Configure your Nginx VM to proxy to this server"
echo ""
echo "💡 For production deployment with systemd:"
echo "   sudo ./scripts/ubuntu-deploy.sh"