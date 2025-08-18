#!/bin/bash

# Ubuntu deployment setup - fixes all import.meta.dirname issues
echo "Setting up portfolio website for Ubuntu..."

# Backup original files
if [ ! -f "vite.config.ts.original" ]; then
    cp vite.config.ts vite.config.ts.original
    echo "Backed up original vite.config.ts"
fi

if [ ! -f "server/vite.ts.original" ]; then
    cp server/vite.ts server/vite.ts.original
    echo "Backed up original server/vite.ts"
fi

# Replace with Ubuntu-compatible versions
echo "Installing Ubuntu-compatible configurations..."
cp vite.config.ubuntu-fixed.ts vite.config.ts
cp server/vite.ubuntu-fixed.ts server/vite.ts

# Install dependencies
npm install

# Create .env if needed
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file"
fi

# Build the application
npm run build

echo "Setup complete!"
echo "All import.meta.dirname issues have been fixed."
echo "You can now run: npm start (production) or npm run dev (development)"