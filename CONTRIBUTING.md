# Coding Standards

## General

Always use TypeScript.

Prefer Server Components.

Only use Client Components when necessary.

Avoid duplicated code.

Keep components focused.

---

## Components

Maximum recommended size:

200 lines

Split large components.

---

## Styling

Tailwind CSS only.

Avoid inline styles.

Reuse utility classes.

---

## Database

Use Prisma.

Never access the database directly.

---

## API

Business logic belongs in services or lib.

Pages should remain thin.

---

## Git

Feature branches only.

Examples

feature/products

feature/orders

feature/auth

feature/dashboard

Fixes

fix/sidebar

fix/login

---

## Commits

Examples

feat: add product CRUD

fix: resolve sidebar animation

refactor: extract dashboard card

docs: update architecture

---

## Pull Requests

One feature per PR.

Keep PRs focused.

Include screenshots for UI changes.