# Emiton Style Architecture

## Design Philosophy

The project follows these principles:

- Simplicity
- Reusability
- Scalability
- Maintainability
- Separation of Concerns

Code should be easy to understand before it is clever.

---

# Folder Structure

app/
components/
lib/
hooks/
types/
prisma/

---

# Components

Components are grouped by feature.

components/

- admin/
- store/
- shared/

---

# Pages

The application consists of two major sections.

## Public Store

/

/shop

/about

/contact

## Admin

/admin

/admin/products

/admin/orders

/admin/users

/admin/settings

---

# Database

PostgreSQL

ORM

Prisma

---

# Authentication

Auth.js

Role Based Access

ADMIN

MANAGER

EDITOR

---

# UI Principles

Minimal

Premium

Fast

Accessible

Responsive

---

# Color Palette

Charcoal Black

#1F1F1F

Warm Ivory

#F5F1EA

Soft Gold

#C89B3C

---

# Naming

PascalCase

Components

camelCase

Functions

kebab-case

Folders

UPPER_CASE

Enums