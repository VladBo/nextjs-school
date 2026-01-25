# H5P Editor Implementation Guide

> **IMPORTANT**: This document provides context for AI assistants working on the H5P editor feature. Read this completely before making changes.

## Goal

Implement a **full H5P editor** in Strapi CMS that works like:

- **Lumi Education** desktop app
- **Drupal 7 H5P module**

The user should be able to:

1. Create new H5P content directly in Strapi admin
2. Select content types (Multiple Choice, Interactive Video, Course Presentation, etc.)
3. Edit existing H5P content
4. Preview/play H5P content
5. Export H5P files

**Current file upload works** - users can upload pre-made `.h5p` files and play them on the frontend. But **creating/editing H5P content in browser does not work**.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                          │
│  /Users/Vladyslav_Bondarchuk/Work/school/nextjs-school              │
│                                                                     │
│  - H5P Player component (features/h5p/components/h5p-player.tsx)    │
│  - Uses h5p-standalone library to render .h5p content               │
│  - Fetches content via /api/h5p/[contentId]/[...path]               │
│  - STATUS: WORKING                                                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Strapi)                            │
│  /Users/Vladyslav_Bondarchuk/Work/school/strapi-school              │
│                                                                     │
│  - Strapi 5.25.0 (uses Koa.js, NOT Express)                        │
│  - H5P Plugin at src/plugins/h5p/                                   │
│  - H5P Content Type at src/api/h5p-content/                         │
│  - STATUS: PARTIALLY WORKING (editor doesn't load)                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Current State Analysis

### What Works

- `.h5p` file upload via Strapi media field
- H5P content playback on Next.js frontend using `h5p-standalone`
- H5P plugin routes are registered
- H5P content type exists with custom field

### What Doesn't Work

- **H5P Editor shows "Loading H5P Editor..." forever**
- Editor iframe loads but never initializes
- No H5P Hub content type selector appears

### Root Cause

The H5P libraries in `/public/uploads/h5p/libraries/` are **incomplete stubs**:

- Only contain `library.json` metadata files
- Missing actual JavaScript, CSS, and asset files
- H5PEditor can't render without complete libraries

---

## Strapi H5P Plugin Structure

**Location**: `/Users/Vladyslav_Bondarchuk/Work/school/strapi-school/src/plugins/h5p/`

```
src/plugins/h5p/
├── admin/              → Points to dist/admin
├── server/             → Points to dist/server
├── dist/
│   ├── admin/
│   │   └── index.js    → Admin UI components (H5PEditorField)
│   ├── server/
│   │   └── index.js    → Server routes and services (~1,235 lines)
│   └── _chunks/
│       └── index-*.js  → Compiled React components
└── package.json
```

### Plugin Dependencies

```json
{
  "@lumieducation/h5p-server": "^10.0.4",
  "@lumieducation/h5p-express": "^10.0.0",
  "@lumieducation/h5p-html-exporter": "^10.0.0"
}
```

**IMPORTANT**: `@lumieducation/h5p-express` is designed for Express.js, but Strapi uses **Koa.js**. The current plugin attempts to adapt Express patterns to Koa.

### Plugin Routes (in dist/server/index.js)

| Route                                 | Method | Purpose                                  |
| ------------------------------------- | ------ | ---------------------------------------- |
| `/api/h5p/editor-page/:contentId`     | GET    | Main editor HTML page (iframe src)       |
| `/api/h5p/core/:type/:file*`          | GET    | Serve H5P core CSS/JS                    |
| `/api/h5p/editor/:type/:file*`        | GET    | Serve H5P editor CSS/JS                  |
| `/api/h5p/ajax`                       | POST   | AJAX for content hub, library operations |
| `/api/h5p/params/:contentId`          | GET    | Get content parameters                   |
| `/api/h5p/libraries/:ubername/:file*` | GET    | Get library files                        |
| `/api/h5p/content/:contentId/:file*`  | GET    | Get content files                        |
| `/api/h5p/play/:contentId`            | GET    | Render content for playback              |

### Admin Component Flow

```
Strapi Admin: Edit H5P Content
        │
        ▼
H5PEditorField component renders iframe:
  <iframe src="/api/h5p/editor-page/new" />
        │
        ▼
Iframe listens for postMessage events:
  - "h5p-editor-loaded"  → Hide loading spinner
  - "h5p-content-saved"  → Update field value
  - "h5p-editor-error"   → Show error
        │
        ▼
PROBLEM: "h5p-editor-loaded" never sent
         because H5P libraries are incomplete
```

---

## H5P Content Type

**Location**: `/Users/Vladyslav_Bondarchuk/Work/school/strapi-school/src/api/h5p-content/`

### Schema

```json
{
  "collectionName": "h5p_contents",
  "attributes": {
    "title": { "type": "string", "required": true },
    "h5pContent": {
      "type": "json",
      "customField": "plugin::h5p.h5p-editor"
    },
    "h5pFile": {
      "type": "media",
      "allowedTypes": ["files"]
    }
  }
}
```

---

## Plugin Configuration

**Location**: `/Users/Vladyslav_Bondarchuk/Work/school/strapi-school/config/plugins.ts`

```typescript
h5p: {
  enabled: true,
  resolve: './src/plugins/h5p',
  contentTypes: false,
  config: {
    librariesPath: "h5p/libraries",
    contentPath: "h5p/content",
    temporaryFilesPath: "h5p/temp-files",
    enableHubLocalization: true,
    contentUserDataStorage: true,
  },
}
```

---

## H5P Asset Locations

**Base path**: `/Users/Vladyslav_Bondarchuk/Work/school/strapi-school/public/uploads/h5p/`

```
public/uploads/h5p/
├── core/           → H5P core JS/CSS (h5p.js, h5p.css, etc.)
├── editor/         → H5P editor files (h5peditor.js, etc.)
├── libraries/      → H5P content type libraries (INCOMPLETE!)
│   ├── H5P.QuestionSet-1.0.0/library.json  (stub only)
│   ├── H5P.InteractiveVideo-.../library.json (stub only)
│   └── ...
├── content/        → Saved H5P content
└── temp-files/     → Temporary upload files
```

---

## Required H5P Libraries

The H5P Hub provides these content types. Full libraries must be downloaded:

### Essential Libraries

- `H5P.MultiChoice` - Multiple choice questions
- `H5P.QuestionSet` - Quiz with multiple questions
- `H5P.InteractiveVideo` - Video with interactions
- `H5P.CoursePresentation` - Slide-based presentations
- `H5P.DragQuestion` - Drag and drop
- `H5P.Blanks` - Fill in the blanks
- `H5P.TrueFalse` - True/False questions

### How to Download Full Libraries

Option 1: **H5P Hub API**

```javascript
// Use H5PEditor.installLibraryFromHub(machineName)
await h5pEditor.installLibraryFromHub('H5P.MultiChoice');
```

Option 2: **Lumi Export**

1. Create content in Lumi desktop app
2. Export as .h5p file
3. Extract (it's a ZIP) to get library files
4. Copy to `public/uploads/h5p/libraries/`

Option 3: **H5P.org Download**

1. Go to https://h5p.org/content-types-and-applications
2. Download content type packages
3. Extract and copy libraries

---

## Implementation Plan

> Based on https://lumieducation.github.io/H5P-Nodejs-library/documents/Examples.REST_Example.html

### Phase 1: Fix H5P Library Installation

**Priority: CRITICAL** - The editor cannot work without complete libraries.

#### Task 1.1: Create Library Download Script

Create a script to download H5P libraries from the H5P Hub.

**File**: `strapi-school/scripts/download-h5p-libraries.js`

```javascript
const { H5PEditor, H5PConfig } = require('@lumieducation/h5p-server');
const fsExtra = require('fs-extra');
const path = require('path');

const ESSENTIAL_LIBRARIES = [
  'H5P.MultiChoice',
  'H5P.QuestionSet',
  'H5P.TrueFalse',
  'H5P.Blanks',
  'H5P.DragQuestion',
  'H5P.MarkTheWords',
  'H5P.DragText',
  'H5P.InteractiveVideo',
  'H5P.CoursePresentation',
];

async function downloadLibraries() {
  // Initialize H5P Editor with config
  // Call h5pEditor.installLibraryFromHub() for each library
  // Libraries are saved to configured libraryStorage path
}
```

#### Task 1.2: Download H5P Core and Editor Files

Download the H5P core player and editor JavaScript/CSS files.

```bash
# Download from H5P releases or use Lumi's bundled files
# Place in strapi-school/public/uploads/h5p/core/
# Place in strapi-school/public/uploads/h5p/editor/
```

**Required Core Files**:

- `h5p.js`, `h5p.css`
- `js/h5p-content-type.js`
- `js/h5p-action-bar.js`
- `js/h5p-confirmation-dialog.js`
- `fonts/`, `images/`, `styles/`

**Required Editor Files**:

- `h5peditor.js`, `h5peditor.css`
- `ckeditor/`
- `language/`
- `images/`
- `libs/`

#### Task 1.3: Verify Library Structure

Each library folder should contain:

```
H5P.MultiChoice-1.16/
├── library.json          (metadata - HAVE THIS)
├── semantics.json        (content schema - MISSING)
├── *.js                  (JavaScript - MISSING)
├── *.css                 (Styles - MISSING)
├── icon.svg              (Icon - MISSING)
└── upgrades.js           (Version upgrades - MISSING)
```

---

### Phase 2: Fix Koa Integration

**Priority: HIGH** - Strapi uses Koa, not Express.

#### Task 2.1: Create Koa-Compatible Route Handlers

The `@lumieducation/h5p-express` package provides Express middleware. We need Koa equivalents.

**Key Differences**:
| Express | Koa |
|---------|-----|
| `req.params.id` | `ctx.params.id` |
| `req.body` | `ctx.request.body` |
| `req.query` | `ctx.query` |
| `res.send(html)` | `ctx.body = html` |
| `res.json(data)` | `ctx.body = data` |
| `res.status(404)` | `ctx.status = 404` |
| `res.set('Content-Type')` | `ctx.set('Content-Type')` |
| `res.sendFile(path)` | Use `koa-send` or read file |

#### Task 2.2: Implement H5P Koa Routes

**File**: `strapi-school/src/plugins/h5p/server/routes/h5p-routes.ts`

```typescript
// Required routes for H5P editor functionality:

// 1. GET /h5p/editor-page/:contentId
//    - Renders full HTML page with H5P editor
//    - Called as iframe src from Strapi admin

// 2. POST /h5p/ajax
//    - Handles H5P Hub requests (content-type-cache, libraries, etc.)
//    - Query params: action (libraries, content-type-cache, library-install, etc.)

// 3. GET /h5p/params/:contentId
//    - Returns content parameters JSON

// 4. POST /h5p/params/:contentId
//    - Saves content parameters

// 5. GET /h5p/libraries/:uberName/:file
//    - Serves library files (JS, CSS, JSON)

// 6. GET /h5p/content/:contentId/:file
//    - Serves content files (images, videos, etc.)

// 7. GET /h5p/core/:file
//    - Serves H5P core files

// 8. GET /h5p/editor/:file
//    - Serves H5P editor files

// 9. GET /h5p/temp-files/:file
//    - Serves temporary uploaded files

// 10. POST /h5p/temp-files
//     - Handles file uploads during editing
```

#### Task 2.3: H5P AJAX Endpoint Actions

The `/h5p/ajax` endpoint handles multiple actions via query parameter:

```typescript
// ?action=content-type-cache
// Returns list of available content types from H5P Hub

// ?action=libraries
// Returns library dependencies
// Query: machineName, majorVersion, minorVersion

// ?action=library-install
// Installs a library from H5P Hub
// Query: id (library machine name)

// ?action=library-upload
// Uploads and installs a library from .h5p file
// Body: multipart file upload

// ?action=files
// Handles temporary file uploads during editing
// Body: multipart file upload

// ?action=filter
// Filters content text (security)
// Body: { text: string }

// ?action=content-hub-metadata-cache
// Returns H5P Hub metadata
```

---

### Phase 3: Fix Admin Component

**Priority: MEDIUM** - Make editor UI work properly.

#### Task 3.1: Debug Iframe Loading

The admin component uses an iframe to load the editor. Debug why it shows "Loading" forever.

**Check**:

1. Does `/api/h5p/editor-page/new` return valid HTML?
2. Does the HTML include correct script/CSS paths?
3. Are scripts loading (check Network tab)?
4. Are there JavaScript errors in iframe console?

#### Task 3.2: Fix PostMessage Communication

The iframe should send messages to parent:

```javascript
// In editor HTML page (rendered by server):
window.parent.postMessage({ type: 'h5p-editor-loaded' }, '*');
window.parent.postMessage({ type: 'h5p-content-saved', contentId: id }, '*');
window.parent.postMessage({ type: 'h5p-editor-error', error: message }, '*');
```

#### Task 3.3: Handle Content Saving

When user clicks "Save" in H5P editor:

1. H5P editor calls save callback
2. Server saves content to storage
3. Server returns contentId
4. PostMessage sent to parent with contentId
5. Strapi admin field updates with contentId

---

### Phase 4: Storage Integration

**Priority: MEDIUM** - Connect H5P storage to Strapi.

#### Task 4.1: Implement IContentStorage

Store H5P content metadata in Strapi database:

```typescript
interface H5PContentMetadata {
  contentId: string;
  title: string;
  mainLibrary: string;
  embedTypes: string[];
  language: string;
  preloadedDependencies: Library[];
  // ... other H5P metadata
}
```

#### Task 4.2: Implement ILibraryStorage

Store library files in filesystem:

- `public/uploads/h5p/libraries/`

#### Task 4.3: Implement ITemporaryFileStorage

Handle file uploads during editing:

- `public/uploads/h5p/temp-files/`
- Cleanup job every 5 minutes

---

### Phase 5: Testing & Verification

**Priority: HIGH** - Ensure everything works.

#### Task 5.1: Test Editor Loading

1. Start Strapi: `cd strapi-school && npm run develop`
2. Open http://localhost:1337/admin
3. Navigate to Content Manager → H5P Content → Create new entry
4. H5P editor should load showing content type selector

#### Task 5.2: Test Content Creation

1. Select a content type (e.g., Multiple Choice)
2. Fill in the content form
3. Click Save
4. Verify content saves to database

#### Task 5.3: Test Content Playback

1. Open saved content in Strapi
2. Click "Preview" or play button
3. Verify content renders correctly

#### Task 5.4: Test on Frontend

1. Start Next.js: `cd nextjs-school && npm run dev`
2. Open http://localhost:3000/quizzes
3. Click on H5P content
4. Verify it plays correctly

---

### Phase 6: Documentation & Cleanup

#### Task 6.1: Update CLAUDE.md

Add H5P editor section with implementation status.

#### Task 6.2: Create Admin Documentation

Document how to use the H5P editor in Strapi.

#### Task 6.3: Code Cleanup

- Remove unused code
- Add proper TypeScript types
- Add error handling
- Add logging

---

## Implementation Checklist

### Phase 1: Libraries

- [ ] Create `download-h5p-libraries.js` script
- [ ] Download H5P core files to `public/uploads/h5p/core/`
- [ ] Download H5P editor files to `public/uploads/h5p/editor/`
- [ ] Install essential libraries via H5P Hub API
- [ ] Verify library folder structure is complete

### Phase 2: Koa Routes

- [ ] Implement `/h5p/editor-page/:contentId` route
- [ ] Implement `/h5p/ajax` route with all actions
- [ ] Implement `/h5p/params/:contentId` GET/POST routes
- [ ] Implement `/h5p/libraries/:uberName/:file` route
- [ ] Implement `/h5p/content/:contentId/:file` route
- [ ] Implement `/h5p/core/:file` and `/h5p/editor/:file` routes
- [ ] Implement file upload routes

### Phase 3: Admin Component

- [ ] Debug iframe loading issue
- [ ] Fix PostMessage communication
- [ ] Test content saving flow

### Phase 4: Storage

- [ ] Verify IContentStorage implementation
- [ ] Verify ILibraryStorage implementation
- [ ] Implement temp file cleanup job

### Phase 5: Testing

- [ ] Test editor loading in Strapi admin
- [ ] Test content creation (Multiple Choice)
- [ ] Test content editing
- [ ] Test content playback in Strapi
- [ ] Test content playback on Next.js frontend

---

## Key Files Reference

### Strapi Backend

| File                                                                      | Purpose                 |
| ------------------------------------------------------------------------- | ----------------------- |
| `strapi-school/src/plugins/h5p/dist/server/index.js`                      | Main plugin server code |
| `strapi-school/src/plugins/h5p/dist/admin/index.js`                       | Admin UI registration   |
| `strapi-school/src/api/h5p-content/content-types/h5p-content/schema.json` | Content type schema     |
| `strapi-school/config/plugins.ts`                                         | Plugin configuration    |
| `strapi-school/public/uploads/h5p/`                                       | H5P assets directory    |

### Next.js Frontend

| File                                                       | Purpose                   |
| ---------------------------------------------------------- | ------------------------- |
| `nextjs-school/features/h5p/components/h5p-player.tsx`     | H5P player component      |
| `nextjs-school/app/api/h5p/[contentId]/[...path]/route.ts` | API route for H5P content |
| `nextjs-school/app/quizzes/[id]/page.tsx`                  | Quiz page with H5P player |

---

## Technology Stack

### Required Packages

- `@lumieducation/h5p-server` - Core H5P server functionality
- `@lumieducation/h5p-express` - Express adapter (needs Koa adaptation)
- `h5p-standalone` - Frontend player (already working)

### Key Documentation

- H5P-Nodejs-library: https://github.com/Lumieducation/H5P-Nodejs-library
- REST Example: https://lumieducation.github.io/H5P-Nodejs-library/documents/Examples.REST_Example.html
- Lumi Documentation: https://docs.lumi.education/

---

## Debugging Tips

### Check if H5P routes are registered

```bash
# In Strapi, check registered routes
curl http://localhost:1337/api/h5p/editor-page/new
```

### Check H5P library files

```bash
# Should have more than just library.json
ls -la strapi-school/public/uploads/h5p/libraries/H5P.MultiChoice-*/
```

### Check browser console

When editing H5P content in Strapi admin:

1. Open browser DevTools
2. Check Console for JavaScript errors
3. Check Network tab for failed requests
4. Look for iframe loading issues

### Check Strapi server logs

```bash
cd strapi-school && npm run develop
# Watch for H5P-related errors in console
```

---

## Success Criteria

The H5P editor is working when:

1. Opening H5P Content in Strapi admin shows the H5P Hub interface
2. User can select content types (Multiple Choice, etc.)
3. User can create/edit H5P content using the visual editor
4. Content saves to Strapi database
5. Content plays correctly on Next.js frontend

---

## Contact / Resources

- Lumi Education GitHub: https://github.com/lumieducation
- H5P Official: https://h5p.org
- Strapi Documentation: https://docs.strapi.io
- Strapi Plugin Development: https://docs.strapi.io/dev-docs/plugins-development

---

## Implementation Plan Addendum (2026-01-25)

### A. Full-Width Editor Iframe (Admin + Editor Page)

- [ ] Admin field container forces full width (Box + iframe styles)
- [ ] Editor iframe page uses `html, body, .h5p-editor-wrapper, .h5p-create, .h5p-editor { width: 100% }`
- [ ] Remove body padding/margins inside the iframe

### B. TypeScript Sources + Autogenerated Dist

- [ ] Confirm Strapi v5 TS support for plugin server code and admin TSX
- [ ] Create `strapi-school/src/plugins/h5p/admin/src` (TSX) and `server/src` (TS)
- [ ] Move logic from `dist/` into TS/TSX sources
- [ ] Add build step to generate `dist/` from sources (Strapi build or `tsc`/`tsup`)
- [ ] Keep `dist/` ignored in git; ensure CI/build produces it

### C. Multi Choice Selection Error

- [ ] Align `/h5p/ajax` behavior with `H5PAjaxEndpoint` (GET/POST)
- [ ] Ensure `action=libraries` uses `machineName`, `majorVersion`, `minorVersion`
- [ ] Ensure `action=library-install` uses `id` and returns a success response
- [ ] Normalize file uploads to the H5P server format (`name`, `tempFilePath`, `data`)
- [ ] Validate Multiple Choice selection in iframe with browser console + network

_Last Updated: January 2025_
_Created for AI assistant context in future sessions_
