# FixMate - Appliance Repair Web App

A modern, production-ready website and web application for appliance repair businesses. Built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Features

### Customer-Facing
- **Home Page**: Hero section, trust signals, service categories, and reviews
- **Services Page**: Detailed breakdown of repair services for each appliance type
- **Booking Wizard**: Multi-step guided form for service requests
  - Step 1: Appliance selection (Dryer, Washer, Refrigerator, Oven, Stove)
  - Step 2: Issue description and urgency
  - Step 3: Contact information and preferences
  - Step 4: Confirmation with tracking number
- **Contact Page**: Business info, contact form, and service area map placeholder

### Admin Dashboard (Protected)
- **Authentication**: Secure login with NextAuth.js
- **Request Management**: View all service requests in a sortable table
- **Status Updates**: Change request status (New → In Progress → Completed → Closed)
- **Filtering**: Filter by status and search by customer name/email/ID
- **Detail View**: Modal with full request information

### Technical Features
- **Database**: SQLite (local) / PostgreSQL (production) with Prisma ORM
- **Form Validation**: Zod schemas with React Hook Form
- **Responsive Design**: Mobile-first, fully responsive UI
- **Type Safety**: Full TypeScript coverage
- **Modern UI**: Tailwind CSS with custom design system

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM (SQLite/PostgreSQL)
- **Authentication**: NextAuth.js v5 (beta)
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 20.19+ (required for Prisma 6, or use Prisma 5 with Node 20.10+)
- npm or yarn

### Local Development

1. **Clone and Install**
   ```bash
   cd fixmate
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and set:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your-secret-key-here"
   ```
   
   Generate a secure secret:
   ```bash
   npx auth secret
   ```

3. **Initialize Database**
   ```bash
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

### Admin Access

Default admin credentials (hardcoded in `src/auth.ts`):
- **Email**: `admin@fixmate.com`
- **Password**: `admin123`

Access the admin dashboard at: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## Project Structure

```
fixmate/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/          # Public pages (Home, Services, Contact, Book)
│   │   ├── admin/             # Admin pages (Login, Dashboard)
│   │   └── api/               # API routes (submissions, auth)
│   ├── components/
│   │   ├── ui/                # Reusable UI components (Button, Card, Input, etc.)
│   │   ├── layout/            # Navbar, Footer
│   │   └── booking/           # Booking wizard steps
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── schemas.ts         # Zod validation schemas
│   │   └── utils.ts           # Utility functions
│   ├── auth.ts                # NextAuth configuration
│   └── middleware.ts          # Route protection middleware
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## Deployment

### Recommended: Vercel + Supabase

1. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Setup Supabase (PostgreSQL)**
   - Create a project at [supabase.com](https://supabase.com)
   - Copy the connection string from Settings → Database
   - Add to Vercel environment variables:
     ```
     DATABASE_URL="postgresql://..."
     AUTH_SECRET="your-production-secret"
     ```

3. **Run Migrations**
   ```bash
   npx prisma db push
   ```

### Alternative: Railway / Render

Both platforms support Next.js and PostgreSQL:
- Connect your GitHub repo
- Add environment variables
- Deploy automatically on push

### Environment Variables (Production)

Required variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
AUTH_SECRET="generate-with-npx-auth-secret"
```

## Database Schema

### ServiceRequest
- `id`: Unique identifier
- `createdAt`, `updatedAt`: Timestamps
- `applianceType`: Dryer, Washer, Refrigerator, Oven, Stove
- `issueType`: Common issue description
- `description`: Detailed problem description
- `urgency`: Today, This week, Flexible
- `name`, `phone`, `email`, `address`: Customer info
- `preferredContact`: Call, Text, Email
- `status`: new, in_progress, completed, closed
- `internalNotes`: Admin notes
- `images`: Photo URLs (optional)

### AdminUser
- `id`: Unique identifier
- `email`: Admin email
- `password`: Hashed password

## Customization

### Update Business Info

Edit the following files:
- `src/components/layout/navbar.tsx` - Phone number, business name
- `src/components/layout/footer.tsx` - Contact details, service area
- `src/app/contact/page.tsx` - Contact page details

### Change Admin Credentials

Edit `src/auth.ts` and update the hardcoded credentials, or implement database-based authentication.

### Add Email Notifications

Install an email service (Resend, SendGrid, or Nodemailer):
```bash
npm install resend
```

Add email sending logic in `src/app/api/submissions/route.ts` after successful submission.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database

## License

MIT

## Support

For issues or questions, contact: support@fixmate.com
