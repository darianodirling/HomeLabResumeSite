#!/bin/bash

# Simple build script for Ubuntu - uses production config
# Usage: ./build-ubuntu.sh

echo "🔨 Building for Ubuntu deployment..."

# Use production vite config to avoid import.meta.dirname issues
if [ -f "vite.config.production.ts" ]; then
    echo "✅ Using production config (Ubuntu-compatible)"
    npx vite build -c vite.config.production.ts
else
    echo "⚠️  Production config not found, using default"
    npx vite build
fi

# Build server
echo "🔨 Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "✅ Build complete!"
echo "📁 Built files are in: ./dist/"
echo ""
echo "🚀 To start production server:"
echo "   NODE_ENV=production node dist/index.js"