# Overview

This is a full-stack React application with Express.js backend that serves as a personal portfolio website for Darian O'Dirling. The application showcases professional experience, education, skills, and homelab projects. It's built as a modern single-page application with a focus on systems engineering and cybersecurity expertise.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the user interface
- **Vite** as the build tool and development server with hot module replacement
- **Tailwind CSS** for styling with a dark theme design system
- **shadcn/ui** component library providing pre-built accessible components
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management and caching
- **React Hook Form** with Zod validation for form handling

## Backend Architecture
- **Express.js** server with TypeScript support
- **In-memory storage** implementation with interface for potential database migration
- Minimal API structure with placeholder routes in `/api` namespace
- Vite integration for development with middleware mode
- Error handling and request logging middleware

## Database Layer
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Neon Database** as the PostgreSQL provider
- User schema with username/password authentication structure
- Migration system set up for schema changes

## Styling and Theming
- CSS custom properties for consistent design tokens
- Dark theme with emerald green accent colors
- Typography hierarchy using Inter, Playfair Display, and JetBrains Mono fonts
- Responsive design with mobile-first approach
- Component variants using class-variance-authority for consistent styling

## Development Workflow
- TypeScript strict mode enabled across frontend and backend
- ESM modules throughout the codebase
- Path aliases for clean imports (@/, @shared/, @assets/)
- Hot reloading in development with error overlay
- Build process separates client and server bundles

# External Dependencies

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider functionality

## Backend Services
- **Neon Database**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database queries and migrations

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Autoprefixer

## State Management
- **TanStack Query**: Server state management with caching
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation

## Authentication Ready
- Session management setup with connect-pg-simple
- Password hashing utilities available
- User schema defined for authentication implementation