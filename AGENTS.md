<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# Emiton Style AI Development Guide

## Project

Emiton Style is a premium fashion e-commerce platform.

The application consists of:

- Public Store
- Admin CMS

Future support:

- Emiton Family Group

---

## Technology

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma 7
- PostgreSQL (Neon)
- Auth.js

---

## Architecture

Public Store

app/

Admin CMS

app/admin/

Reusable Components

components/

Business Logic

lib/

Database

Prisma

---

## Coding Standards

Always:

- Use TypeScript.
- Prefer Server Components.
- Use Client Components only when necessary.
- Keep components under 200 lines.
- Avoid duplicated logic.
- Create reusable components.
- Use Tailwind CSS.
- Follow accessibility best practices.

---

## Design System

Primary

Charcoal Black

#1F1F1F

Secondary

Warm Ivory

#F5F1EA

Accent

Soft Gold

#C89B3C

---

## Git Workflow

Never work directly on main.

Always create feature branches.

Examples:

feature/products

feature/orders

feature/auth

---

## Future Architecture

The project should remain scalable enough to support:

- Emiton Style
- Emiton Academy
- Emiton Logistics

without major restructuring.

---

## Before generating code

Think about:

- Reusability
- Maintainability
- Responsiveness
- Performance
- Accessibility
- Scalability