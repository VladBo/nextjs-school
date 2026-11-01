# Project Context for AI Assistants

This document provides context for AI assistants working on this codebase.

## Project Overview

**nextjs-school** is a modern school website built with Next.js 15 and React 19, featuring H5P interactive quiz integration and a Strapi CMS backend.

- **Framework**: Next.js 15.2.4 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS 3.4 + shadcn/ui components
- **CMS**: Strapi (runs at `http://localhost:1337`)
- **Language**: TypeScript 5

## Directory Structure

```
app/                         # Next.js App Router
├── api/
│   ├── h5p/[contentId]/    # H5P content proxy from Strapi
│   └── invalidate/         # ISR cache invalidation webhook
├── articles/[slug]/        # Dynamic article pages
├── courses/[slug]/         # Dynamic course pages
├── quizzes/                # Quiz listing page
│   └── [id]/               # Individual quiz with H5P player
├── about/                  # About page
├── layout.tsx              # Root layout (Header/Footer)
└── page.tsx                # Homepage

features/                    # Domain-driven feature modules
├── h5p/                    # H5P quiz system
│   ├── components/         # H5PPlayer, QuizCard, QuizFilters
│   ├── db/queries.ts       # Data fetching with caching
│   └── types/              # Quiz TypeScript interfaces
├── articles/               # Article feature
│   ├── components/         # ArticleCard, ArticleBlocks
│   └── db/                 # Article data fetching
├── blocks/                 # Dynamic content block system
│   ├── block-manager.tsx   # Routes block types to components
│   └── components/         # HeroBanner, RichText, Quote, etc.
├── header/                 # Navigation header
├── footer/                 # Footer component
└── homepage/               # Homepage data fetching

components/
├── ui/                     # 54 shadcn/ui components
└── theme-provider.tsx      # Dark/light mode support

lib/
├── api.ts                  # OpenAPI Strapi client (openapi-fetch)
├── cache.ts                # Cache tags & content type mapping
├── fonts.ts                # Google Fonts (Geist, Inter)
└── utils.ts                # Utility functions (cn helper)

types/
└── strapi.d.ts             # Auto-generated Strapi types (251KB)

styles/
└── globals.css             # Tailwind + CSS variables for theming
```

## Key Patterns

### 1. Data Fetching & Caching

Uses `unstable_cache()` with tag-based revalidation:

```typescript
// Example from features/homepage/db/homepage.ts
unstable_cache(
  async () => {
    /* fetch logic */
  },
  ['homepage'],
  { tags: ['homepage'], revalidate: 3600 }
);
```

**Cache Tags** (defined in `lib/cache.ts`):

- `GLOBAL_SETTINGS`, `HOMEPAGE`, `HEADER_MENU`, `FOOTER_MENU`
- `ARTICLES`, `COURSES`, `AUTHORS`, `CATEGORIES`, `TAGS`

### 2. ISR Invalidation Webhook

`app/api/invalidate/route.ts` receives Strapi webhooks to invalidate cache:

- Validates `STRAPI_WEBHOOK_SECRET` header
- Maps content types to cache tags
- Calls `revalidateTag()` or `revalidatePath()`

### 3. Block Manager Pattern

`features/blocks/block-manager.tsx` renders dynamic content blocks:

```typescript
const BLOCK_COMPONENTS = {
  'blocks.hero-banner': HeroBanner,
  'blocks.rich-text': RichText,
  'blocks.features-section': FeaturesSection,
  // ... more block types
};
```

### 4. Strapi API Client

`lib/api.ts` uses `openapi-fetch` with auto-generated types:

```typescript
import createClient from 'openapi-fetch';

import type { paths } from '@/types/strapi';

const client = createClient<paths>({
  baseUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`,
});
```

## H5P Integration

> **IMPORTANT**: See `H5P_EDITOR_IMPLEMENTATION.md` for full implementation details and plan.

### Current Status

| Component                | Status          | Notes                       |
| ------------------------ | --------------- | --------------------------- |
| H5P Player (Next.js)     | **WORKING**     | Uses h5p-standalone library |
| H5P File Upload (Strapi) | **WORKING**     | Upload pre-made .h5p files  |
| H5P Editor (Strapi)      | **NOT WORKING** | Shows "Loading..." forever  |

### Goal

Implement a full H5P editor in Strapi CMS (like Lumi/Drupal 7) so users can create H5P content directly in browser without external tools.

### Root Cause of Editor Issue

The H5P libraries in `strapi-school/public/uploads/h5p/libraries/` are incomplete stubs - only contain `library.json`, missing actual JS/CSS files.

### Next.js Components

- `features/h5p/components/h5p-player.tsx` - Renders H5P content using h5p-standalone
- `features/h5p/db/queries.ts` - `getH5PContents()`, `getH5PContentById()`
- `app/api/h5p/[contentId]/[...path]/route.ts` - Extracts and serves .h5p ZIP contents
- `app/quizzes/` - Quiz listing and player pages

### Strapi Plugin

**Location**: `/Users/Vladyslav_Bondarchuk/Work/school/strapi-school/src/plugins/h5p/`

Uses `@lumieducation/h5p-server` but needs Koa adaptation (Strapi uses Koa, not Express).

### Key Documentation Files

- `H5P_EDITOR_IMPLEMENTATION.md` - **Full implementation guide and plan**
- `H5P_SIMPLE_WORKFLOW.md` - Simple workflow using Lumi desktop app
- `H5P_INTEGRATION_GUIDE.md` - Full plugin integration guide

## Environment Variables

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_WEBHOOK_SECRET=your_webhook_secret_here
```

## Key Configuration Files

- `next.config.ts` - Image optimization for Strapi, H5P URL rewrites
- `tailwind.config.ts` - Theme colors, shadcn/ui plugin
- `tsconfig.json` - Path aliases (`@/` for root)
- `.env.example` - Required environment variables

## UI Components

Uses **shadcn/ui** component library in `components/ui/`:

- Forms: Input, Label, Select, Checkbox, RadioGroup, Switch
- Layout: Card, Tabs, Accordion, NavigationMenu
- Feedback: Dialog, Sheet, Alert, Toast (sonner), Tooltip
- Data: Button, Badge, Progress, Pagination, Chart (Recharts)

## Common Tasks

### Adding a New Page

1. Create route in `app/` directory
2. Fetch data using patterns from `features/*/db/`
3. Use `unstable_cache()` with appropriate tags

### Adding a New Block Type

1. Create component in `features/blocks/components/`
2. Register in `BLOCK_COMPONENTS` map in `block-manager.tsx`
3. Add Strapi content type if needed

### Adding a New Feature Module

1. Create directory in `features/`
2. Structure: `components/`, `db/`, `types/`, `utils/`
3. Export from feature index file

### Invalidating Cache

- Strapi webhook automatically calls `/api/invalidate`
- Manual: Use `revalidateTag('tag-name')` or `revalidatePath('/path')`

## Dependencies

### Core

- next: 15.2.4
- react: 19
- typescript: 5

### Styling

- tailwindcss: 3.4.17
- @radix-ui/\* (shadcn/ui primitives)
- lucide-react: 0.454.0

### Data & Forms

- openapi-fetch: 0.14.1
- react-hook-form: 7.54.1
- zod: 3.24.1
- qs: 6.14.0

### Content

- react-markdown: 10.1.0
- recharts: 2.15.0
- date-fns: 4.1.0

### Dev Tools

- eslint: 9
- prettier: 3.5.3
- husky: 9.1.7

## Git Workflow

- **Main branch**: `main`
- **Current feature branch**: `feature/ui-improvements-h5p-integration`
- Pre-commit hooks via Husky + lint-staged

## Known Issues / TODOs

1. **H5P Editor in Strapi doesn't work** - See `H5P_EDITOR_IMPLEMENTATION.md` for fix plan
   - Root cause: H5P libraries are incomplete stubs
   - Need to download full libraries from H5P Hub
   - Need to adapt Express routes to Koa for Strapi
2. H5P Player on Next.js frontend is **WORKING**
3. TypeScript and ESLint now pass (errors were fixed)
