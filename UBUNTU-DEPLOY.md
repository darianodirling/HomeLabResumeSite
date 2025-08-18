# Ubuntu Server Deployment Guide

This guide covers deploying the portfolio website on Ubuntu server via git pull.

## Quick Deployment

### 1. Clone Repository on Ubuntu Server
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-website

# Or update existing installation
git pull origin main
```

### 2. Run Setup Script
```bash
# Make scripts executable and run setup
chmod +x scripts/*.sh
./scripts/ubuntu-setup.sh
```

### 3. Start the Server
```bash
# For development (with hot reload)
./dev-ubuntu.sh

# For production
npm start

# Or deploy as production service
sudo ./scripts/ubuntu-deploy.sh
```

## Architecture for Your Setup

```
Internet → Nginx VM (Proxy/Load Balancer) → Ubuntu Server (Node.js App on port 5000)
```

## Configuration Files

### Production Vite Config
- **File**: `vite.config.production.ts`
- **Purpose**: Ubuntu-compatible build configuration
- **Key fixes**: Uses `fileURLToPath` instead of `import.meta.dirname`

### Environment Configuration
- **File**: `.env`
- **Setup**: Copy from `.env.example` and modify as needed
- **Default port**: 5000 (accessible from other VMs)

## Node.js Requirements

- **Minimum**: Node.js 18+
- **Recommended**: Node.js 20 LTS
- **Install if needed**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

## Scripts Overview

### `./scripts/ubuntu-setup.sh`
- Checks Node.js version
- Installs dependencies
- Builds application
- Creates `.env` file
- Basic setup for manual start

### `./scripts/ubuntu-deploy.sh` (requires sudo)
- Creates system user
- Sets up systemd service
- Configures firewall
- Production deployment

## Manual Deployment Steps

If you prefer manual control:

```bash
# 1. Install dependencies
npm install

# 2. Build application
npm run build

# 3. Create environment file
cp .env.example .env
# Edit .env as needed

# 4. Start server
npm start
```

## Connecting from Nginx VM

Your Nginx VM should proxy to:
```
http://ubuntu-server-ip:5000
```

Example Nginx configuration for your proxy VM:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://ubuntu-server-ip:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

### Common Issues

1. **Node.js version error**
   ```bash
   node --version  # Should be 18+
   ```

2. **Port already in use**
   ```bash
   sudo lsof -i :5000
   sudo killall node  # If needed
   ```

3. **Permission errors**
   ```bash
   sudo chown -R $USER:$USER .
   ```

4. **Service logs** (if using systemd)
   ```bash
   sudo journalctl -u portfolio-website -f
   ```

### Build Errors

If you encounter `import.meta.dirname` errors:
- The `vite.config.production.ts` should handle this
- Ensure you're using Node.js 18+
- Check that the build uses the production config

## Updates

To update the application:
```bash
git pull origin main
./scripts/ubuntu-setup.sh
sudo systemctl restart portfolio-website  # If using systemd
```

## Security Notes

- The application runs on port 5000
- Only allow access from your Nginx VM if possible
- Use UFW or iptables to restrict access:
  ```bash
  sudo ufw allow from nginx-vm-ip to any port 5000
  ```

## Monitoring

Check application status:
```bash
# If using systemd
sudo systemctl status portfolio-website

# Manual process
ps aux | grep node

# Check port
sudo netstat -tlnp | grep :5000
```