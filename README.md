# Darian O'Dirling - Portfolio Website

A modern, dark-themed portfolio website showcasing IT expertise and homelab infrastructure. Built with React, TypeScript, and Express.js, featuring a sophisticated design with emerald green accents.

## 🚀 Features

- **Dark Theme Design**: Modern dark UI with emerald green accent colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Navigation**: Scroll-based navigation with active section highlighting
- **Professional Sections**:
  - Hero introduction with call-to-action buttons
  - About section with education and certifications
  - Professional experience timeline
  - HomeLab infrastructure showcase
  - Contact information and social links

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Wouter** for client-side routing
- **TanStack Query** for state management
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database management
- **Neon Database** (PostgreSQL)
- **Express Session** for authentication

### Development
- **ESM modules** throughout
- **TypeScript** strict mode
- **Hot reloading** in development
- **Path aliases** for clean imports

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Git** for version control
- (Optional) **PostgreSQL** database for full functionality

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Development settings
NODE_ENV=development
PORT=5000

# Database (optional - uses in-memory storage by default)
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# Session secret (generate a secure random string)
SESSION_SECRET=your-super-secret-session-key-here
```

### 4. Start the Application

**For Replit development:**
```bash
npm run dev
```

**For Ubuntu server deployment:**
```bash
./setup.sh
./start-ubuntu.sh
```

**Or use the direct run script:**
```bash
./run.sh
```

The application will be available at:
- **Frontend & API**: http://localhost:5000

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | Type check with TypeScript |
| `npm run db:push` | Push database schema changes |

## 📁 Project Structure

```
portfolio-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage interface
│   └── vite.ts           # Vite development integration
├── shared/                # Shared types and schemas
│   └── schema.ts         # Database schemas and types
├── attached_assets/       # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## ✏️ Editing the Website

### Updating Content

1. **Personal Information**: Edit the hero section in `client/src/components/hero-section.tsx`
2. **About Section**: Update education and skills in `client/src/components/about-section.tsx`
3. **Work Experience**: Modify the experiences array in `client/src/components/resume-section.tsx`
4. **HomeLab Projects**: Update projects in `client/src/components/homelab-section.tsx`
5. **Contact Info**: Change contact details in `client/src/components/contact-section.tsx`

### Styling Changes

1. **Colors**: Modify CSS variables in `client/src/index.css`
2. **Fonts**: Update font imports and CSS variables in the same file
3. **Component Styles**: Most components use Tailwind classes for styling
4. **Theme**: Adjust color scheme in `tailwind.config.ts`

### Adding New Sections

1. Create a new component in `client/src/components/`
2. Import and add it to `client/src/pages/home.tsx`
3. Update navigation in `client/src/components/navigation.tsx`

## 🚀 Production Deployment

### Building for Production

```bash
npm run build
```

This creates:
- `dist/public/` - Frontend build files
- `dist/index.js` - Backend server bundle

### Deployment Options

#### Option 1: Single Server Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

#### Option 2: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t portfolio-website .
docker run -p 5000:5000 portfolio-website
```

#### Option 3: Static Site + API

For better performance, you can serve the frontend statically:

1. Build the frontend: `npm run build`
2. Serve `dist/public/` with Nginx, Apache, or CDN
3. Deploy the API separately on your preferred platform

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-production-database-url
SESSION_SECRET=your-secure-production-secret
```

## 🏠 Local HomeLab Deployment

### Nginx Configuration

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name your-domain.local;

    location / {
        proxy_pass http://localhost:5000;
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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Systemd Service

Create `/etc/systemd/system/portfolio.service`:

```ini
[Unit]
Description=Portfolio Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/portfolio-website
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable portfolio.service
sudo systemctl start portfolio.service
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Session Secret**: Use a cryptographically secure random string
3. **Database**: Ensure your database is properly secured
4. **HTTPS**: Use SSL certificates in production
5. **Firewall**: Configure appropriate firewall rules

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT environment variable
2. **Build failures**: Ensure all dependencies are installed
3. **Database connection**: Check DATABASE_URL format
4. **Asset loading**: Verify asset paths and Vite configuration

### Development Issues

1. **Hot reload not working**: Check Vite configuration
2. **TypeScript errors**: Run `npm run check` for detailed errors
3. **Styling issues**: Verify Tailwind CSS setup

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:

- **Email**: darianodirling@gmail.com
- **LinkedIn**: [linkedin.com/in/darianodirling](https://linkedin.com/in/darianodirling)
- **Website**: [darianodirling.com](https://darianodirling.com)

---

**Built with ❤️ and hosted on a Proxmox HomeLab**