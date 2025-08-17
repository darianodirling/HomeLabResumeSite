#!/bin/bash

# HomeLab setup script for portfolio website
# This script sets up the portfolio website on a Proxmox-based homelab

set -e

PROJECT_NAME="portfolio-website"
DOMAIN=${1:-"portfolio.local"}
NGINX_CONF="/etc/nginx/sites-available/$PROJECT_NAME"

echo "🏠 Setting up $PROJECT_NAME for HomeLab deployment..."

# Check if running as root for system configuration
if [[ $EUID -eq 0 ]]; then
   echo "❌ This script should not be run as root for security reasons."
   echo "💡 Run as a regular user with sudo privileges."
   exit 1
fi

# Update system packages
echo "🔄 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt install -y \
    nginx \
    nodejs \
    npm \
    postgresql \
    postgresql-contrib \
    certbot \
    python3-certbot-nginx \
    ufw \
    fail2ban

# Create project directory
PROJECT_DIR="/opt/$PROJECT_NAME"
echo "📁 Setting up project directory: $PROJECT_DIR"
sudo mkdir -p $PROJECT_DIR
sudo chown $USER:$USER $PROJECT_DIR

# Clone or copy project files (assuming current directory has the project)
echo "📋 Copying project files..."
cp -r . $PROJECT_DIR/
cd $PROJECT_DIR

# Set up environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment configuration..."
    cp .env.example .env
    
    # Generate secure session secret
    SESSION_SECRET=$(openssl rand -base64 32)
    sed -i "s/your-super-secret-session-key-here-change-this-in-production/$SESSION_SECRET/" .env
    sed -i "s/NODE_ENV=development/NODE_ENV=production/" .env
fi

# Install dependencies and build
echo "🏗️  Installing dependencies and building..."
npm ci --only=production
npm run build

# Set up PostgreSQL database
echo "🗄️  Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH ENCRYPTED PASSWORD 'portfolio_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
EOF

# Update database URL in .env
DB_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"
sed -i "s|DATABASE_URL=.*|DATABASE_URL=$DB_URL|" .env

# Set up Nginx configuration
echo "🌐 Configuring Nginx..."
sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:5000;
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

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:5000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable Nginx site
sudo ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up systemd service
echo "⚙️  Setting up systemd service..."
sudo tee /etc/systemd/system/$PROJECT_NAME.service > /dev/null <<EOF
[Unit]
Description=Portfolio Website
After=network.target postgresql.service

[Service]
Type=simple
User=$USER
WorkingDirectory=$PROJECT_DIR
ExecStart=$(which node) dist/index.js
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
EnvironmentFile=$PROJECT_DIR/.env

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable $PROJECT_NAME.service
sudo systemctl start $PROJECT_NAME.service

# Configure firewall
echo "🛡️  Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Set up fail2ban for additional security
echo "🔒 Configuring fail2ban..."
sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 10m
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

sudo systemctl restart fail2ban

# Check service status
echo "🔍 Checking service status..."
sudo systemctl status $PROJECT_NAME.service

# Wait for application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Health check
if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ Application is running and healthy!"
else
    echo "⚠️  Health check failed. Checking logs..."
    sudo journalctl -u $PROJECT_NAME.service --no-pager -n 20
fi

echo ""
echo "🎉 HomeLab setup completed!"
echo "🌐 Website URL: http://$DOMAIN"
echo "📍 Local URL: http://localhost:5000"
echo ""
echo "📋 Useful commands:"
echo "   sudo systemctl status $PROJECT_NAME     # Check service status"
echo "   sudo journalctl -u $PROJECT_NAME -f    # View logs"
echo "   sudo systemctl restart $PROJECT_NAME   # Restart service"
echo "   sudo nginx -t                          # Test Nginx config"
echo "   sudo systemctl reload nginx           # Reload Nginx"
echo ""
echo "🔒 Security notes:"
echo "   - UFW firewall is enabled"
echo "   - Fail2ban is configured for SSH and Nginx"
echo "   - Consider setting up SSL with: sudo certbot --nginx -d $DOMAIN"