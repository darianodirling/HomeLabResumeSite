#!/bin/bash

# Ubuntu Production Deployment Script
# Creates systemd service for production deployment
# Usage: sudo ./scripts/ubuntu-deploy.sh

set -e

if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)" 
   exit 1
fi

APP_DIR="$(pwd)"
SERVICE_USER="portfolio"
SERVICE_NAME="portfolio-website"

echo "🚀 Setting up production deployment for Portfolio Website"
echo "App Directory: $APP_DIR"

# Create service user if it doesn't exist
echo "👤 Setting up service user..."
if ! id "$SERVICE_USER" &>/dev/null; then
    useradd --system --shell /bin/false --home-dir $APP_DIR --no-create-home $SERVICE_USER
fi

# Set ownership
chown -R $SERVICE_USER:$SERVICE_USER $APP_DIR

# Create systemd service
echo "⚙️  Creating systemd service..."
cat > /etc/systemd/system/$SERVICE_NAME.service << EOF
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
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

# Security settings
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes
ReadWritePaths=$APP_DIR
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
EOF

# Configure firewall if ufw is available
if command -v ufw >/dev/null 2>&1; then
    echo "🔥 Configuring firewall..."
    ufw allow 5000/tcp
fi

# Start and enable service
echo "🚀 Starting service..."
systemctl daemon-reload
systemctl enable $SERVICE_NAME
systemctl start $SERVICE_NAME

# Show status
echo "✅ Deployment complete!"
echo ""
echo "📊 Service Status:"
systemctl status $SERVICE_NAME --no-pager --lines=5

echo ""
echo "🌐 Your website is now running at:"
echo "   http://$(hostname -I | awk '{print $1}'):5000"
echo ""
echo "📋 Useful commands:"
echo "   sudo systemctl status $SERVICE_NAME     # Check service status"
echo "   sudo systemctl restart $SERVICE_NAME    # Restart service"
echo "   sudo journalctl -u $SERVICE_NAME -f     # View live logs"
echo "   sudo systemctl stop $SERVICE_NAME       # Stop service"
echo ""
echo "💡 Configure your Nginx VM to proxy to this server's IP:5000"