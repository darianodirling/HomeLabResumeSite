#!/bin/bash

# Quick fix script for Ubuntu deployment
# Run this script on your Ubuntu server to fix the import.meta.dirname error

echo "🔧 Applying Ubuntu compatibility fixes..."

# Backup original files
echo "📋 Creating backups..."
cp vite.config.ts vite.config.ts.backup 2>/dev/null || echo "No vite.config.ts found"
cp package.json package.json.backup 2>/dev/null || echo "No package.json found"

# Use Ubuntu-compatible configurations
echo "🔄 Applying Ubuntu-compatible configuration..."
cp vite.config.ubuntu.ts vite.config.ts
cp package-standalone.json package.json

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Check if we're running as a service and restart
if systemctl is-active --quiet portfolio-website; then
    echo "🔄 Restarting portfolio service..."
    sudo systemctl restart portfolio-website
fi

echo "✅ Ubuntu compatibility fixes applied!"
echo ""
echo "🚀 Your application should now work without Node.js errors."
echo "   Access it at: http://your-server-ip:5000"
echo ""
echo "💡 If you're still having issues:"
echo "   1. Check Node.js version: node --version (should be 18+)"
echo "   2. Check service status: sudo systemctl status portfolio-website"
echo "   3. View logs: sudo journalctl -u portfolio-website -f"