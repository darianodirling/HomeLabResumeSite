#!/bin/bash

# Minimal Ubuntu fix - just what you need to run the server
echo "Applying minimal Ubuntu fix..."

# Replace the problematic vite configs
cp vite.config.ubuntu-fixed.ts vite.config.ts
cp server/vite.ubuntu-fixed.ts server/vite.ts

# Create minimal .env - no session secret needed for portfolio
cat > .env << EOF
NODE_ENV=development
PORT=5000
HOST=0.0.0.0
EOF

echo "Minimal fix applied!"
echo "Your portfolio will run without session authentication."
echo "Run: npm install && npm run dev"