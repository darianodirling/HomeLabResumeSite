# Deploy to Cloudflare Pages

This portfolio is a static Vite site and can be deployed directly to Cloudflare Pages.

## One-time setup

1. Push this repository to GitHub.
2. In the Cloudflare dashboard, open **Workers & Pages** and select **Create application** > **Pages** > **Connect to Git**.
3. Select `darianodirling/HomeLabResumeSite` and use `main` as the production branch.
4. Configure the build:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank
5. Select **Save and Deploy**. Cloudflare will provide a `pages.dev` URL.
6. To use a custom domain, open the Pages project, select **Custom domains**, and follow the DNS prompts.

Each push to `main` will deploy the live website. Other branches receive preview deployments.

## Local preview

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

---

# Legacy Deployment Guide

This guide covers different deployment strategies for the portfolio website.

## Quick Start Options

### 1. Local Development
```bash
# Clone and setup
git clone <repository-url>
cd portfolio-website
npm install
cp .env.example .env
npm run dev
```

### 2. Docker Deployment
```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or build and run manually
docker build -t portfolio-website .
docker run -p 5000:5000 --env-file .env portfolio-website
```

### 3. HomeLab Deployment
```bash
# Automated setup for Ubuntu/Debian systems
sudo ./scripts/setup-homelab.sh your-domain.local
```

## Deployment Environments

### Development
- **Purpose**: Local development with hot reload
- **Command**: `npm run dev`
- **Port**: 5000
- **Features**: Hot reload, TypeScript checking, development logging

### Production
- **Purpose**: Optimized for performance and security
- **Command**: `npm run build && npm start`
- **Port**: 5000 (configurable via PORT env var)
- **Features**: Minified assets, production logging, health checks

## Infrastructure Options

### Option 1: Single Server (Simplest)
```
Internet → Server (Node.js app on port 5000)
```

**Setup:**
1. Build application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (optional but recommended)

### Option 2: Nginx + Node.js (Recommended)
```
Internet → Nginx (port 80/443) → Node.js app (port 5000)
```

**Benefits:**
- SSL termination
- Static file serving
- Load balancing
- Security headers

**Setup:**
```bash
# Install and configure Nginx
sudo apt install nginx
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### Option 3: Docker with Load Balancer
```
Internet → Load Balancer → Multiple Docker containers
```

**Setup:**
```bash
# Scale with Docker Compose
docker-compose up -d --scale portfolio-app=3
```

### Option 4: Kubernetes (Advanced)
For high-availability homelab deployments on Kubernetes.

## Database Options

### Option 1: In-Memory (Default)
- **Pros**: No setup required, fast
- **Cons**: Data lost on restart
- **Use case**: Demo, development

### Option 2: PostgreSQL (Production)
- **Pros**: Persistent, reliable, scalable
- **Cons**: Requires setup and maintenance
- **Setup**: See docker-compose.yml or setup scripts

### Option 3: Managed Database
- **Examples**: Neon, Supabase, AWS RDS
- **Pros**: Managed, scalable, backed up
- **Cons**: External dependency, cost

## SSL/TLS Configuration

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Self-Signed (Development/HomeLab)
```bash
# Generate certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key -out certificate.crt

# Use in Nginx configuration
```

## Monitoring and Logging

### Health Checks
The application provides a health check endpoint at `/api/health`:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "production"
}
```

### System Monitoring
```bash
# View application logs
sudo journalctl -u portfolio-website -f

# Check service status
sudo systemctl status portfolio-website

# Monitor resource usage
htop
```

### Log Rotation
```bash
# Configure logrotate
sudo tee /etc/logrotate.d/portfolio-website <<EOF
/var/log/portfolio-website/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload portfolio-website
    endscript
}
EOF
```

## Security Considerations

### Application Security
- Environment variables for secrets
- Session management with secure cookies
- Input validation with Zod schemas
- CORS configuration
- Rate limiting (via Nginx)

### System Security
- Firewall configuration (UFW)
- Fail2ban for intrusion prevention
- Regular security updates
- Non-root user execution
- SSL/TLS encryption

### Network Security
```bash
# Basic UFW configuration
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Performance Optimization

### Frontend Optimization
- Code splitting with Rollup
- Asset compression (gzip/brotli)
- Image optimization
- CDN integration
- Browser caching

### Backend Optimization
- Process clustering
- Database connection pooling
- Response caching
- Compression middleware

### Infrastructure Optimization
- Load balancing
- CDN integration
- Database optimization
- Monitoring and alerting

## Backup Strategy

### Application Backup
```bash
# Backup script
#!/bin/bash
tar -czf "backup-$(date +%Y%m%d).tar.gz" \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  .
```

### Database Backup
```bash
# PostgreSQL backup
pg_dump portfolio_db > backup-$(date +%Y%m%d).sql

# Automated backup with cron
0 2 * * * pg_dump portfolio_db > /backups/portfolio-$(date +\%Y\%m\%d).sql
```

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   ```bash
   # Find process using port
   sudo lsof -i :5000
   # Kill process or change PORT in .env
   ```

2. **Build failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Database connection errors**
   ```bash
   # Check database status
   sudo systemctl status postgresql
   # Test connection
   psql -h localhost -U portfolio_user -d portfolio_db
   ```

4. **Nginx configuration errors**
   ```bash
   # Test configuration
   sudo nginx -t
   # Check logs
   sudo tail -f /var/log/nginx/error.log
   ```

### Performance Issues
- Check resource usage: `htop`, `iostat`, `free -h`
- Monitor application logs: `journalctl -u portfolio-website -f`
- Profile database queries
- Enable application metrics

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Session storage (Redis)
- Database read replicas
- CDN integration

### Vertical Scaling
- Increase server resources
- Optimize application code
- Database tuning
- Caching strategies

---

For more specific deployment scenarios or troubleshooting help, refer to the main README.md or contact support.
