# Emiton Style - Project Audit Report

**Generated:** July 2026  
**Version:** 0.1.0  
**Status:** Phase 2 - Admin CMS (In Progress)

---

## Executive Summary

Emiton Style is a premium fashion e-commerce platform built with modern web technologies. The project is currently in active development, with Phase 1 (Public Store) completed and Phase 2 (Admin CMS) in progress. This report provides a comprehensive overview of the current codebase for new developers joining the project.

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.10 | Full-stack React framework |
| React | 19.2.4 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4 | Styling |
| Prisma | 7.8.0 | ORM for database operations |
| PostgreSQL (Neon) | - | Database |
| Auth.js | 5.0.0-beta.31 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |

---

## Project Structure

```
emiton-style/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin CMS routes
│   │   ├── (protected)/    # Protected admin pages (auth required)
│   │   │   ├── layout.tsx  # Auth check + AdminLayout wrapper
│   │   │   ├── page.tsx    # Dashboard
│   │   │   ├── products/   # Product management
│   │   │   ├── collections/ # Collection management
│   │   │   └── categories/   # Category management
│   │   ├── layout.tsx      # Admin root layout
│   │   └── login/          # Admin login page
│   ├── about/              # Public pages
│   ├── contact/
│   ├── shop/
│   ├── catalog/
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   ├── admin/              # Admin-specific components
│   │   ├── layout/         # Admin layout (Header, AdminLayout)
│   │   ├── auth/           # Login components
│   │   ├── products/       # Product forms, tables, rows
│   │   ├── collections/    # Collection forms, tables, rows
│   │   ├── categories/     # Category forms, tables, rows
│   │   ├── common/         # Shared admin components (StatusBadge)
│   │   ├── ui/             # UI primitives (PageHeader, QuickActions)
│   │   ├── activity/       # Recent activity component
│   │   ├── navigation/       # UserMenu, NotificationMenu
│   │   ├── Sidebar.tsx     # Admin sidebar navigation
│   │   ├── AdminContainer.tsx
│   │   └── DashboardCard.tsx
│   ├── home/               # Homepage components
│   ├── layout/             # Shared layout (Navbar, Footer)
│   ├── shared/             # Shared components
│   └── ui/                 # UI primitives
├── lib/                    # Business logic
│   ├── actions/            # Server actions (CRUD operations)
│   │   ├── product.actions.ts
│   │   ├── collection.actions.ts
│   │   └── category.actions.ts
│   ├── auth/               # Authentication utilities
│   │   ├── session.ts      # Session management
│   │   ├── users.ts        # User queries
│   │   ├── password.ts     # Password hashing/verification
│   │   └── permissions.ts  # Role-based permissions
│   ├── prisma/             # Database client
│   │   └── client.ts
│   └── dashboard.ts        # Dashboard utilities
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Database models
│   ├── seed.ts             # Database seeding
│   └── migrations/
├── types/                  # TypeScript type extensions
│   └── next-auth.d.ts      # NextAuth type extensions
├── public/                 # Static assets
└── .env.example            # Environment variables template
```

---

## Database Schema

The database uses PostgreSQL with Prisma ORM. The following models are defined:

### User & Authentication Models

- **Role** - User roles (ADMIN, MANAGER, EDITOR)
- **User** - User accounts with role association
- **Account** - OAuth accounts (NextAuth)
- **Session** - User sessions
- **VerificationToken** - Email verification tokens
- **Authenticator** - WebAuthn credentials

### E-commerce Models

- **Collection** - Product collections (e.g., "Men", "Ladies", "Teens", "Kids")
  - Fields: id, name, slug, description, imageUrl, isActive
  - Relations: hasMany Categories, hasMany Products

- **Category** - Product categories within collections
  - Fields: id, name, slug, collectionId, isActive
  - Relations: belongsTo Collection, hasMany Products

- **Product** - Store products
  - Fields: id, name, slug, description, price, imageUrl, isActive, collectionId, categoryId
  - Relations: belongsTo Collection, belongsTo Category (optional)

---

## Authentication System

### Overview
- **Auth.js** (NextAuth v5 beta) with Credentials provider
- **JWT sessions** for stateless authentication
- **Prisma Adapter** for database integration
- **bcryptjs** for password hashing (10 salt rounds)

### Key Files
- `auth.ts` - Main Auth.js configuration
- `lib/auth/session.ts` - Session utilities (`getSession`, `getCurrentUser`, `requireUser`)
- `lib/auth/users.ts` - User database queries
- `lib/auth/password.ts` - Password hashing and verification
- `types/next-auth.d.ts` - TypeScript extensions for session/user types

### User Roles
- **ADMIN** - Full access
- **MANAGER** - Management access
- **EDITOR** - Content editing access

### Login Flow
1. User accesses `/admin/login`
2. Credentials are validated against database
3. On success, redirected to `/admin` (dashboard)
4. Protected routes use `requireUser()` to enforce authentication

---

## Admin CMS - Implemented Features

### Dashboard (`/admin`)
- Overview cards for Products, Collections, Orders, Customers
- Performance metrics display
- Quick Actions component
- Recent Activity component

### Products Management
- **List View** (`/admin/products`)
  - Product table with columns: Product, Collection, Category, Price, Status, Created, Actions
  - Empty state with call-to-action
  - Add Product button

- **Create Product** (`/admin/products/new`)
  - Form with: name, slug (auto-generated), description, price, collection, category, status
  - Form validation with error messages
  - Auto-slug generation from name

- **Edit Product** (`/admin/products/[id]/edit`)
  - Pre-populated form with existing data
  - Same validation as create form

- **Delete Product**
  - Confirmation dialog
  - Server action with error handling

### Collections Management
- **List View** (`/admin/collections`)
  - Collection table with: Collection, Slug, Categories count, Products count, Status, Created, Actions

- **Create Collection** (`/admin/collections/new`)
  - Form with: name, slug (auto-generated), description, imageUrl, status

- **Edit Collection** (`/admin/collections/[id]/edit`)
  - Pre-populated form for editing

### Categories Management
- **List View** (`/admin/categories`)
  - Category table with: Category, Slug, Collection, Products count, Status, Created, Actions

- **Create Category** (`/admin/categories/new`)
  - Form with: name, slug (auto-generated), collection (required), status

- **Edit Category** (`/admin/categories/[id]/edit`)
  - Pre-populated form for editing

- **Delete Category**
  - Protected deletion (cannot delete if products exist)

---

## Component Patterns

### Server Components
- Used by default for data fetching
- Examples: Page components, Table components, Row components

### Client Components
- Used for interactivity (forms, buttons, state management)
- Marked with `"use client"` directive
- Examples: Forms, Delete buttons, Sidebar, Header

### Server Actions
- Located in `lib/actions/`
- Use `"use server"` directive
- Handle form submissions with `useActionState` hook
- Return typed form state with errors

### Form Pattern
```tsx
// Client component with useActionState
const [state, formAction, isPending] = useActionState(createAction, undefined);

// Server action with validation
export async function createAction(prevState, formData) {
  // Validation
  // Database operation
  // revalidatePath + redirect
}
```

---

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Charcoal Black | `#1F1F1F` | Primary text, backgrounds |
| Warm Ivory | `#F5F1EA` | Backgrounds, accents |
| Soft Gold | `#C89B3C` | Primary action color, highlights |

### Fonts
- **Inter** - Body text, UI elements
- **Playfair Display** - Headings, titles

### UI Components
- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows (shadow-sm)
- Consistent spacing (p-4, p-6, p-8)
- Responsive design (lg:, md: breakpoints)

---

## Environment Variables

```bash
# Database connection
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Auth secret for JWT encryption
AUTH_SECRET="replace-with-a-secure-random-secret"

# Auth URL for callbacks
AUTH_URL="http://localhost:3000"
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npx prisma db push    # Push schema to database
npx prisma generate   # Generate Prisma client
npx prisma seed       # Seed database
```

---

## Development Workflow

1. **Create feature branch** from `main`
2. **Implement changes** following coding standards
3. **Run lint** to check code quality
4. **Build** to verify no compilation errors
5. **Test** manually in browser
6. **Commit** with descriptive message
7. **Push** and create pull request

### Branch Naming Convention
- `feature/products`
- `feature/orders`
- `feature/auth`
- `feature/users`

---

## Coding Standards

- **TypeScript** - Always use TypeScript
- **Server Components** - Prefer over Client Components
- **Component Size** - Keep under 200 lines
- **Tailwind CSS** - For styling
- **Accessibility** - Use aria-* attributes, proper labels
- **Reusability** - Create reusable components
- **No Duplication** - Avoid duplicated logic

---

## Current Status

### Completed (Phase 1)
- [x] Homepage with Hero, Featured Collections, Featured Products
- [x] Responsive Navbar with mobile menu
- [x] About, Contact, Shop pages
- [x] Tailwind CSS setup with custom fonts

### In Progress (Phase 2)
- [x] Authentication system
- [x] Dashboard layout
- [x] Products CRUD
- [x] Collections CRUD
- [x] Categories CRUD
- [ ] Orders management
- [ ] Customers management
- [ ] Users management
- [ ] Settings

### Planned (Phase 3)
- [ ] Order processing
- [ ] Customer management
- [ ] Inventory tracking
- [ ] Image upload

### Future (Phase 4-5)
- [ ] Analytics dashboard
- [ ] Multi-business platform support
- [ ] Emiton Academy, Logistics, Technologies

---

## Key Dependencies

### Production
- `@auth/prisma-adapter` - NextAuth Prisma integration
- `@prisma/adapter-pg` - PostgreSQL adapter for Prisma
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-icons` - Additional icons
- `clsx` - Conditional class names

### Development
- `eslint` - Code linting
- `tailwindcss` - CSS framework
- `ts-node` - TypeScript execution for seeding

---

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure values
3. Install dependencies: `npm install`
4. Run database migrations: `npx prisma db push`
5. Seed the database: `npx prisma seed`
6. Start development: `npm run dev`
7. Access admin at: `http://localhost:3000/admin/login`
   - Default credentials: `admin@emitonstyle.com` / `admin123`

---

## Notes for New Developers

1. **Next.js Version** - This project uses Next.js 16, which has breaking changes from older versions. Check `node_modules/next/dist/docs/` for updated APIs.

2. **Prisma 7** - Uses adapter-based connections. The `PrismaPg` adapter is configured in `lib/prisma/client.ts`.

3. **Server Actions** - The project uses Next.js Server Actions for form handling. These are defined in `lib/actions/` and called from client components.

4. **Component Organization** - Components are organized by feature (admin, home, layout) rather than by file type.

5. **Design System** - Follow the established color palette and design patterns. The Soft Gold (`#C89B3C`) is the primary action color.

6. **Authentication** - The `requireUser()` function in `lib/auth/session.ts` is used to protect admin routes. It throws an error if no user is authenticated, which triggers a redirect.

7. **Database Seeding** - The seed file creates default roles (ADMIN, MANAGER, EDITOR) and a default admin user.

---

## Architecture Decisions

Key decisions are documented in `DECISIONS.md`:
- Decision 001: Next.js Full Stack (Accepted)
- Decision 002: PostgreSQL on Neon (Accepted)
- Decision 003: Prisma 7 ORM (Accepted)
- Decision 004: Auth.js Authentication (Proposed)
- Decision 005: bcryptjs for passwords (Accepted)
- Decision 006: Feature branch workflow (Accepted)
- Decision 007: Sprint-based development (Accepted)
- Decision 008: Feature-based component structure (Accepted)
- Decision 009: Premium minimal design (Accepted)
- Decision 010: Multi-business platform vision (Accepted)