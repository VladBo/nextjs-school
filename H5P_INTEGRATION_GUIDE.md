# H5P Integration Guide

Complete guide for the H5P integration between Strapi CMS and Next.js frontend.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│  STRAPI CMS (strapi-school)                                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  H5P Plugin (@lumieducation/h5p-server)                         │   │
│  │  - H5P Editor widget in admin panel                              │   │
│  │  - Library management                                            │   │
│  │  - Content storage and serving                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  h5p-content Collection Type                                     │   │
│  │  - title, slug, description                                      │   │
│  │  - h5pContent (JSON from H5P editor)                            │   │
│  │  - h5pFile (uploaded .h5p package)                              │   │
│  │  - grade, subject, difficulty, estimatedTime                    │   │
│  │  - featured, thumbnail                                           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ REST API + H5P Assets
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NEXT.JS FRONTEND (nextjs-school)                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  H5PPlayer Component (h5p-standalone)                            │   │
│  │  - Fetches content from /api/h5p/[contentId]                    │   │
│  │  - Renders interactive H5P content client-side                  │   │
│  │  - Loading/error states with retry                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  URL Rewrites (next.config.ts)                                   │   │
│  │  - /h5p/core/* → Strapi H5P core assets                         │   │
│  │  - /h5p/libraries/* → Strapi H5P libraries                      │   │
│  │  - /h5p/content/* → Strapi H5P content files                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Strapi Setup

### 1. Content Type Schema

The `h5p-content` collection type is configured with these fields:

| Field         | Type    | Description                                       |
| ------------- | ------- | ------------------------------------------------- |
| title         | string  | Quiz title (required)                             |
| slug          | uid     | URL-friendly identifier                           |
| description   | text    | Quiz description                                  |
| h5pContent    | json    | H5P editor content (custom field)                 |
| h5pFile       | media   | Uploaded .h5p package file                        |
| grade         | enum    | Grade level (1-11)                                |
| subject       | enum    | Math, Science, History, English, Geography, Other |
| difficulty    | enum    | Easy, Medium, Hard                                |
| estimatedTime | integer | Minutes to complete (1-180)                       |
| featured      | boolean | Show on homepage                                  |
| thumbnail     | media   | Preview image                                     |

### 2. Install H5P Quiz Libraries

Download from https://h5p.org/content-types-and-applications:

- **H5P.MultiChoice** - Multiple choice questions
- **H5P.Blanks** - Fill in the blanks
- **H5P.DragQuestion** - Drag and drop
- **H5P.TrueFalse** - True/false questions

Upload via Strapi admin or place in `/public/uploads/h5p/libraries/`

### 3. Configure Permissions

In Strapi Admin → Settings → Roles → Public:

- Enable `find`, `findOne` for h5p-content collection
- Enable H5P plugin routes: `play`, `params`, `libraries`

## Next.js Components

### H5PPlayer (Primary)

Location: `features/h5p/components/h5p-player.tsx`

```tsx
import { H5PPlayer } from '@/features/h5p/components';

<H5PPlayer contentId="1" />;
```

Features:

- Uses `h5p-standalone` library
- Dynamic import (avoids SSR issues)
- Loading spinner with "Preparing interactive content"
- Error state with retry button
- Cleanup on unmount

### H5PIframePlayer (Fallback)

Location: `features/h5p/components/h5p-iframe-player.tsx`

```tsx
import { H5PIframePlayer } from '@/features/h5p/components';

<H5PIframePlayer contentId="1" title="Math Quiz" />;
```

Features:

- Embeds Strapi's `/h5p/embed/:id` endpoint
- Simpler integration
- Use when h5p-standalone has issues

### QuizCard

Displays quiz metadata in a card format with thumbnail, title, badges for grade/subject/difficulty.

### QuizFilters

Client-side filtering by grade (1-11) and subject with URL persistence.

## API Routes

### Next.js Proxy Endpoints

| Route                          | Proxies To        | Purpose                                |
| ------------------------------ | ----------------- | -------------------------------------- |
| `/api/h5p/[contentId]`         | `/h5p/play/:id`   | Player data (scripts, styles, content) |
| `/api/h5p/content/[contentId]` | `/h5p/params/:id` | Content parameters JSON                |

### URL Rewrites (next.config.ts)

| Source             | Destination               | Purpose              |
| ------------------ | ------------------------- | -------------------- |
| `/h5p/core/*`      | Strapi `/h5p/core/*`      | H5P core JS/CSS      |
| `/h5p/libraries/*` | Strapi `/h5p/libraries/*` | H5P library files    |
| `/h5p/content/*`   | Strapi `/h5p/content/*`   | H5P content assets   |
| `/h5p/embed/:id`   | Strapi `/h5p/embed/:id`   | Iframe embed page    |
| `/h5p/play/:id`    | Strapi `/h5p/play/:id`    | Direct play endpoint |

### Strapi H5P Plugin Endpoints

| Method | Path                         | Auth   | Description          |
| ------ | ---------------------------- | ------ | -------------------- |
| GET    | `/api/h5p-contents`          | Public | List all H5P content |
| GET    | `/api/h5p-contents/:id`      | Public | Get single content   |
| GET    | `/h5p/play/:id`              | Public | Get player data      |
| GET    | `/h5p/params/:id`            | Public | Get content params   |
| GET    | `/h5p/embed/:id`             | Public | Embed HTML page      |
| GET    | `/h5p/libraries/:name/:file` | Public | Library files        |
| POST   | `/h5p/new`                   | Admin  | Create content       |
| PUT    | `/h5p/:id`                   | Admin  | Update content       |
| DELETE | `/h5p/:id`                   | Admin  | Delete content       |

## Data Fetching

Location: `features/h5p/db/queries.ts`

```typescript
// List quizzes with optional filters
const quizzes = await getQuizzes({ grade: '5', subject: 'Math' });

// Get single quiz
const quiz = await getQuizById('1');

// Get featured quizzes (limit 6)
const featured = await getFeaturedQuizzes();
```

All queries use `unstable_cache` with 1-hour revalidation and cache tags for ISR.

## Usage Examples

### Quiz Listing Page

```tsx
// app/quizzes/page.tsx
import { QuizCard, QuizFilters } from '@/features/h5p/components';
import { getQuizzes } from '@/features/h5p/db';

export default async function QuizzesPage({ searchParams }) {
  const quizzes = await getQuizzes({
    grade: searchParams.grade,
    subject: searchParams.subject,
  });

  return (
    <div className="grid lg:grid-cols-[280px_1fr]">
      <QuizFilters />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {quizzes?.data.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
      </div>
    </div>
  );
}
```

### Quiz Detail Page

```tsx
// app/quizzes/[id]/page.tsx
import { H5PPlayer } from '@/features/h5p/components';
import { getQuizById } from '@/features/h5p/db';

export default async function QuizPage({ params }) {
  const quiz = await getQuizById(params.id);

  return (
    <div className="container max-w-4xl">
      <h1>{quiz.data.title}</h1>
      <H5PPlayer contentId={params.id} />
    </div>
  );
}
```

## Content Creation Workflow

### Using Strapi H5P Editor

1. Open Strapi admin: `http://localhost:1337/admin`
2. Navigate to Content Manager → H5P Content
3. Click "Create new entry"
4. Fill in metadata:
   - Title, description
   - Grade, subject, difficulty
   - Estimated time
   - Thumbnail image
5. Use H5P Editor widget to create interactive content
6. Save and Publish

### Alternative: Using Lumi Education

For offline content creation:

1. Download Lumi: https://lumi.education
2. Create H5P content in desktop app
3. Export as `.h5p` file
4. Upload to Strapi via `h5pFile` field

See `H5P_SIMPLE_WORKFLOW.md` for detailed Lumi instructions.

## Supported Content Types

### Quiz Types (Primary)

- Multiple Choice - Single/multiple answers
- True/False - Binary questions
- Fill in the Blanks - Text completion
- Drag and Drop - Item matching
- Drag the Words - Word placement
- Mark the Words - Word identification

### Interactive Types

- Interactive Video - Videos with embedded questions
- Course Presentation - Interactive slideshows
- Image Hotspots - Clickable image areas

## File Structure

```
nextjs-school/
├── features/h5p/
│   ├── components/
│   │   ├── h5p-player.tsx        # h5p-standalone player
│   │   ├── h5p-iframe-player.tsx # Iframe fallback
│   │   ├── quiz-card.tsx         # Quiz listing card
│   │   ├── quiz-filters.tsx      # Filter UI
│   │   └── index.ts              # Exports
│   ├── db/
│   │   ├── queries.ts            # Data fetching
│   │   └── index.ts
│   └── types/
│       └── index.ts              # TypeScript interfaces
├── app/
│   ├── api/h5p/
│   │   ├── [contentId]/route.ts  # Play data proxy
│   │   └── content/[contentId]/route.ts
│   └── quizzes/
│       ├── page.tsx              # Quiz listing
│       └── [id]/page.tsx         # Quiz detail
├── styles/
│   ├── globals.css               # Imports h5p.css
│   └── h5p.css                   # H5P-specific styles
└── next.config.ts                # URL rewrites

strapi-school/
├── src/
│   ├── api/h5p-content/          # Content type definition
│   │   └── content-types/h5p-content/schema.json
│   └── plugins/h5p/              # H5P plugin
├── public/uploads/h5p/
│   ├── libraries/                # H5P library files
│   └── content/                  # H5P content files
└── config/plugins.ts             # Plugin configuration
```

## Troubleshooting

### H5P Content Not Loading

1. Verify Strapi is running: `http://localhost:1337`
2. Check H5P plugin is configured in `config/plugins.ts`
3. Ensure content is published (not draft)
4. Check browser console for CORS/network errors

### Player Shows Error

1. Test API directly: `/api/h5p/[contentId]`
2. Verify H5P libraries are installed
3. Check Strapi permissions for H5P routes

### Missing Styles/Scripts

1. Verify rewrites in `next.config.ts`
2. Test `/h5p/core/js/h5p.js` is accessible
3. Check Network tab for 404 errors

### Libraries Not Found

1. Download from h5p.org
2. Upload via Strapi admin
3. Restart Strapi after installation

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Resources

- [H5P.org](https://h5p.org) - Official H5P website
- [H5P Content Types](https://h5p.org/content-types-and-applications) - Available types
- [h5p-standalone](https://github.com/tunapanda/h5p-standalone) - Client-side player
- [Lumi Education](https://lumi.education) - Desktop H5P editor
