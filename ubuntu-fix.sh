#!/bin/bash

# Complete Ubuntu fix - replaces all problematic files and creates proper .env
echo "Applying complete Ubuntu compatibility fix..."

# Replace vite configs
cp vite.config.ubuntu-fixed.ts vite.config.ts
cp server/vite.ubuntu-fixed.ts server/vite.ts

# Create Ubuntu-specific .env file
cat > .env << EOF
# Ubuntu-compatible environment
NODE_ENV=development
PORT=5000
HOST=0.0.0.0

# Database (optional)
# DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# Session secret
SESSION_SECRET=ubuntu-dev-secret-key-change-in-production

# Logging
LOG_LEVEL=info
EOF

echo "Ubuntu fix applied!"
echo "Files updated:"
echo "  - vite.config.ts (Ubuntu-compatible)"
echo "  - server/vite.ts (Ubuntu-compatible)"
echo "  - .env (development mode)"
echo ""
echo "Run: npm install && npm run dev"