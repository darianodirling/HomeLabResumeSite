#!/bin/bash

# Ubuntu Server Setup Script for Portfolio Website
# Usage: ./scripts/setup-ubuntu.sh [domain]

set -e

DOMAIN=${1:-"localhost"}
APP_DIR="/opt/portfolio-website"
SERVICE_USER="portfolio"
NODE_VERSION="20"

echo "🚀 Setting up Portfolio Website on Ubuntu Server"
echo "Domain: $DOMAIN"
echo "App Directory: $APP_DIR"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root (use sudo)" 
   exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20 LTS
echo "📦 Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

# Install additional dependencies
echo "📦 Installing system dependencies..."
apt-get install -y nginx certbot python3-certbot-nginx ufw git

# Create service user
echo "👤 Creating service user..."
if ! id "$SERVICE_USER" &>/dev/null; then
    useradd --system --shell /bin/false --home-dir $APP_DIR --create-home $SERVICE_USER
fi

# Create app directory
echo "📁 Setting up application directory..."
mkdir -p $APP_DIR
chown $SERVICE_USER:$SERVICE_USER $APP_DIR

# Copy application files (assumes script is run from project root)
echo "📋 Copying application files..."
cp -r . $APP_DIR/
chown -R $SERVICE_USER:$SERVICE_USER $APP_DIR

# Switch to app directory and setup
cd $APP_DIR

# Use standalone package.json for deployment
echo "📦 Setting up standalone configuration..."
cp package-standalone.json package.json

# Install dependencies
echo "📦 Installing Node.js dependencies..."
sudo -u $SERVICE_USER npm install --production

# Build application with standalone config
echo "🔨 Building application..."
sudo -u $SERVICE_USER npm run build

# Create systemd service
echo "⚙️  Creating systemd service..."
cat > /etc/systemd/system/portfolio-website.service << EOF
[Unit]
Description=Portfolio Website
After=network.target

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=5000
ExecStart=/usr/bin/node $APP_DIR/dist/index.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=portfolio-website

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/portfolio << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Static files
    location /assets/ {
        alias $APP_DIR/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API and dynamic content
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check endpoint (bypass proxy for faster response)
    location /api/health {
        proxy_pass http://127.0.0.1:5000;
        access_log off;
    }
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'

# Start and enable services
echo "🚀 Starting services..."
systemctl daemon-reload
systemctl enable portfolio-website
systemctl start portfolio-website
systemctl enable nginx
systemctl restart nginx

# Setup SSL if domain is not localhost
if [[ "$DOMAIN" != "localhost" && "$DOMAIN" != "127.0.0.1" ]]; then
    echo "🔒 Setting up SSL with Let's Encrypt..."
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || echo "SSL setup failed - you can run 'sudo certbot --nginx -d $DOMAIN' manually later"
fi

# Show status
echo "✅ Setup complete!"
echo ""
echo "Service status:"
systemctl status portfolio-website --no-pager
echo ""
echo "🌐 Your website should now be available at:"
if [[ "$DOMAIN" != "localhost" && "$DOMAIN" != "127.0.0.1" ]]; then
    echo "   https://$DOMAIN"
    echo "   http://$DOMAIN (will redirect to HTTPS)"
else
    echo "   http://$DOMAIN"
fi
echo ""
echo "📊 Useful commands:"
echo "   sudo systemctl status portfolio-website  # Check service status"
echo "   sudo systemctl restart portfolio-website # Restart application"
echo "   sudo journalctl -u portfolio-website -f  # View live logs"
echo "   sudo nginx -t && sudo systemctl reload nginx # Reload Nginx config"