#!/bin/bash

# Local development setup script
set -e

PROJECT_NAME="portfolio-website"

echo "🛠️  Setting up local development environment for $PROJECT_NAME..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "💡 Visit: https://nodejs.org/en/download/"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up environment file
if [ ! -f .env ]; then
    echo "📝 Creating development environment file..."
    cp .env.example .env
    
    # Update for development
    sed -i 's/NODE_ENV=development/NODE_ENV=development/' .env
    sed -i 's/PORT=5000/PORT=5000/' .env
    
    echo "✅ Created .env file for development"
    echo "💡 You can edit .env to customize your local settings"
else
    echo "ℹ️  .env file already exists"
fi

# Type check
echo "🔍 Running TypeScript checks..."
npm run check

# Start development server
echo "🚀 Starting development server..."
echo "📍 The application will be available at: http://localhost:5000"
echo "🔄 Hot reload is enabled - changes will update automatically"
echo ""
echo "Press Ctrl+C to stop the development server"
echo ""

npm run dev