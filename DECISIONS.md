# Emiton Style - Architecture Decisions

This document records important technical and architectural decisions made during the development of Emiton Style.

The goal is to capture **why** decisions were made so that future development remains consistent and maintainable.

---

# Decision Status

| Status | Meaning |
|---------|---------|
| Proposed | Under discussion and not yet implemented |
| Accepted | Approved and currently in use |
| Superseded | Replaced by a newer decision |
| Deprecated | No longer recommended |

---

# Decision 001 – Next.js Full Stack

**Date:** 2026-07-04

**Status:** Accepted

## Context

The project required both a public storefront and a content management system (CMS).

Initially, a separate PHP backend was considered.

## Decision

Use Next.js as both the frontend and backend.

## Reasoning

- Single codebase
- Shared TypeScript models
- Excellent React ecosystem
- API Routes built in
- Easy deployment
- Lower maintenance
- Excellent support from Vercel

## Consequences

### Advantages

- Faster development
- Shared components
- Shared types
- Easier deployment

### Disadvantages

- Requires learning full-stack Next.js

---

# Decision 002 – Database

**Date:** 2026-07-04

**Status:** Accepted

## Context

A cloud-hosted production database with a generous free tier was required.

## Decision

Use PostgreSQL hosted on Neon.

## Reasoning

- Excellent free tier
- Serverless
- Reliable
- Automatic backups
- Works well with Prisma
- Easy Vercel integration

## Consequences

### Advantages

- Production ready
- Highly scalable
- No database server management

### Disadvantages

- Requires internet connectivity

---

# Decision 003 – ORM

**Date:** 2026-07-04

**Status:** Accepted

## Context

The application requires a modern ORM that integrates well with TypeScript.

## Decision

Use Prisma 7.

## Reasoning

- Type-safe database queries
- Excellent developer experience
- Database migrations
- Strong Next.js integration
- Large community

## Consequences

### Advantages

- Reduced SQL errors
- Faster development
- Easier maintenance

### Disadvantages

- Prisma 7 introduces adapter-based connections which require additional configuration

---

# Decision 004 – Authentication

**Date:** Pending

**Status:** Proposed

## Context

The CMS requires secure authentication.

## Decision

Use Auth.js with the Prisma Adapter.

## Reasoning

- Official authentication library for modern Next.js
- Secure session handling
- Credentials provider
- Easy integration with Prisma
- Supports future OAuth providers

## Consequences

### Advantages

- Secure
- Flexible
- Extensible

### Disadvantages

- Initial setup is more involved than a custom authentication solution

---

# Decision 005 – Password Security

**Date:** 2026-07-04

**Status:** Accepted

## Context

Passwords should never be stored in plain text.

## Decision

Hash all passwords using bcryptjs.

## Reasoning

- Industry standard
- Secure
- Easy Prisma integration

## Consequences

Passwords cannot be recovered and must be reset if forgotten.

---

# Decision 006 – Git Workflow

**Date:** 2026-07-04

**Status:** Accepted

## Context

The project will continue to grow over several years.

## Decision

Develop all new features in dedicated feature branches.

## Workflow

```
main
    │
    ├── feature/admin-auth
    ├── feature/products
    ├── feature/collections
    ├── feature/orders
    ├── feature/customers
    ├── feature/users
    └── feature/settings
```

## Reasoning

- Easier testing
- Cleaner history
- Smaller pull requests
- Safer development

---

# Decision 007 – Sprint-Based Development

**Date:** 2026-07-04

**Status:** Accepted

## Context

Large features become difficult to manage.

## Decision

Build features in small, testable sprints.

## Development Workflow

```
Plan

↓

Implement

↓

Lint

↓

Build

↓

Manual Testing

↓

Commit

↓

Push

↓

Review
```

## Reasoning

- Easier debugging
- Better quality
- More frequent checkpoints
- Reduced risk

---

# Decision 008 – Project Structure

**Date:** 2026-07-04

**Status:** Accepted

## Decision

Separate components by feature rather than by file type.

## Structure

```
components/

admin/
store/
shared/
```

Each feature should contain its own UI components where appropriate.

## Reasoning

- Better scalability
- Easier navigation
- Reduced coupling

---

# Decision 009 – UI Design Philosophy

**Date:** 2026-07-04

**Status:** Accepted

## Decision

Maintain a premium, minimal and consistent design throughout the application.

## Design Principles

- Clean
- Modern
- Responsive
- Accessible
- Consistent
- Fast

## Brand Colours

| Colour | Hex |
|---------|-----|
| Charcoal Black | #1F1F1F |
| Warm Ivory | #F5F1EA |
| Soft Gold | #C89B3C |

---

# Decision 010 – Long-Term Vision

**Date:** 2026-07-04

**Status:** Accepted

## Context

Although the current focus is an online fashion store, the long-term vision extends beyond e-commerce.

## Decision

Design the system to support multiple businesses under the Emiton Family Group.

## Planned Businesses

- Emiton Style
- Emiton Academy
- Emiton Logistics
- Emiton Technologies

## Consequences

Current implementations should favour modularity, reusable components and scalability to minimise future restructuring.

---

# Future Decisions

The following decisions will be documented as the project evolves.

- Image Storage
- Payment Gateway
- Email Service
- Notifications
- Inventory Management
- Order Processing
- Analytics
- Search
- Caching
- API Versioning
- Mobile Application
- Multi-language Support
- Multi-currency Support
- Deployment Strategy
- CI/CD Pipeline

---

# Decision Guidelines

Before making a significant technical change, ask the following questions:

1. Why is this change needed?
2. What alternatives were considered?
3. Why was this option chosen?
4. What are the long-term consequences?
5. Will this decision still make sense in two years?

If the answer is "yes", record the decision here before implementation.

---

**Last Updated:** 2026-07-04