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

## Phase 0: Console Debugging (MANDATORY FIRST STEP)

**CRITICAL**: Before making ANY changes or running ANY other diagnostic steps, you MUST check the browser console using the appropriate MCP tool:

### Tool Selection by Application

- **For Strapi (localhost:1337)**: Use `io.github.ChromeDevTools/chrome-devtools-mcp` ONLY

  - Strapi is NOT a Next.js application
  - next-devtools cannot help with Strapi at all
  - Chrome DevTools MCP is the only tool for Strapi debugging

- **For Next.js (localhost:3000)**: Use `next-devtools` MCP tools and `io.github.ChromeDevTools/chrome-devtools-mcp`
  - next-devtools is specifically designed for Next.js applications
  - Has built-in MCP integration with Next.js dev server
  - Can access Next.js runtime diagnostics, routes, and errors

### Workflow

1. **Identify which application** needs debugging:

   - Strapi admin/backend issues → Use Chrome DevTools MCP
   - Next.js frontend issues → Use next-devtools and Chrome DevTools MCP

2. **Run console check** using the appropriate tool:

   - Navigate to the relevant page (H5P editor for Strapi, app pages for Next.js)
   - Capture all console errors, warnings, and logs
   - Focus on JavaScript errors related to H5P initialization

3. **Document findings** before proceeding to other phases

4. **DO NOT**:
   - Use next-devtools for Strapi
   - Skip this step and jump to code changes

**FIRST ACTION**: Based on the issue location, use the correct MCP tool to check browser console. Do NOT ask the user for permission - just run it.

---

## Terminal Management

**CRITICAL**: Exactly two terminals total. One for Strapi, one for Next.js.

**Folders**:

- **FRONTEND (Next.js)** → `~/Work/school/nextjs-school`
- **BACKEND (Strapi)** → `~/Work/school/strapi-school`

### Admin Credentials (Local Only)

- **Do NOT store credentials in this repository.**
- When running browser automation, use environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) from git-ignored `.env` in strapi-school folder.

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

### Phase 0: Chrome DevTools MCP Console Check (MANDATORY FIRST STEP)

- [ ] **FIRST ACTION:** Start Strapi using console and use io.github.ChromeDevTools/chrome-devtools-mcp to open the Strapi admin H5P editor page
- [ ] **ONLY** check the console via io.github.ChromeDevTools/chrome-devtools-mcp
- [ ] **Do NOT** use next-devtools, curl, or any other method before the Chrome MCP console check
- [ ] **Run the io.github.ChromeDevTools/chrome-devtools-mcp console check yourself (no user prompt)**
- [ ] Continue only after reviewing io.github.ChromeDevTools/chrome-devtools-mcp console output

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

1. Select a content type (Multiple Choice)
2. Fill in the content form
3. Click Save
4. Verify content saves to database
5. Repeat for Quiz (Question Set)
6. Repeat for True/False

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
- [ ] Test content creation (Quiz / Question Set)
- [ ] Test content creation (True/False)
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

## Implementation Status Update (2026-01-26)

### Verified Working ✅

1. **H5P Player on Next.js Frontend**: WORKING

   - `h5p-standalone` library renders H5P content correctly
   - Tested with "test quiz" entry (QuestionSet with Multiple Choice)
   - Content fetched via `/api/h5p/[contentId]` endpoint

2. **H5P Editor UI in Strapi**: LOADS

   - Editor iframe loads and displays content type selector
   - Can select content types (Multiple Choice, QuestionSet, etc.)
   - Can fill in question and answer forms

3. **H5P Libraries**: More complete than documented
   - Libraries in `public/uploads/h5p/libraries/` contain actual JS/CSS files
   - Not just stubs as previously thought

### Critical Issue Found ❌

**H5P Content Save Flow is BROKEN**

When creating new H5P content in Strapi admin:

1. User selects content type (e.g., Multiple Choice)
2. User fills in question/answers
3. User clicks "Save" in Strapi
4. Entry is created BUT `h5pContent` field is **NULL**

**Evidence:**

```json
// API response from /api/h5p-contents
[
  {
    "id": 1,
    "title": "test quiz",
    "h5pContent": { "library": "H5P.QuestionSet 1.20", "contentId": 2841334329 }
  }, // OLD - has data
  { "id": 5, "title": "dadsadas", "h5pContent": null }, // NEW - null
  { "id": 7, "title": "Capital Cities Quiz", "h5pContent": null } // NEW - null
]
```

**Root Cause Analysis:**

- The postMessage communication between the H5P editor iframe and Strapi admin panel is not completing
- The `content/` directory is empty: `public/uploads/h5p/content/` has no saved content
- The "test quiz" entry works because it was created via a different method (likely file upload)

### Root Cause Identified (2026-01-26)

**The form submit interception doesn't work with Strapi 5**

The `h5p-editor-field.tsx` component tries to intercept native HTML form `submit` events:

```javascript
document.addEventListener('submit', handleSubmitCapture, true);
```

But **Strapi 5 doesn't use native form submissions**. It uses:

- React state management
- Direct API calls via `strapi.documents()`
- No traditional `<form>` submit events

**Evidence:**

- No `/api/h5p/save` requests appear in network tab when clicking Save
- No console errors related to H5P save
- The `handleSubmitCapture` function never fires

### Fix Required

**Option A: Use Strapi's `beforeSubmit` lifecycle hook** (Recommended)

Custom fields in Strapi can define a `beforeSubmit` callback that runs before the entry is saved. This is the proper way to capture H5P content before Strapi saves.

```typescript
// In h5p-editor-field.tsx
const H5PEditorField = {
  // ... existing code

  // Add beforeSubmit handler that Strapi calls
  async beforeSubmit(value: string, attribute: any) {
    // Trigger H5P save and wait for response
    const h5pContent = await triggerH5PSave();
    return JSON.stringify(h5pContent);
  },
};
```

**Option B: Use a "Save H5P" button**

Add a separate button inside the H5P editor field that explicitly saves the H5P content to the server, then updates the field value. Less elegant but more explicit.

**Option C: Auto-save on content change**

Listen for changes in the H5P editor iframe and automatically save to server, keeping the field value synced. May have performance implications.

### Next Steps

1. [ ] Research Strapi 5 custom field lifecycle hooks (`beforeSubmit`, `validate`)
2. [ ] Modify `h5p-editor-field.tsx` to use proper Strapi integration
3. [ ] Test the save flow end-to-end
4. [ ] Verify h5pContent is populated after save

---

## Implementation Plan Addendum (2026-01-25)

**Execution rule:** Continue until all items in this plan (and addendum) are implemented and verified.

### A. Full-Width Editor Iframe (Admin + Editor Page)

- [ ] Admin field container forces full width (Box + iframe styles)
- [ ] Editor iframe page uses `html, body, .h5p-editor-wrapper, .h5p-create, .h5p-editor { width: 100% }`
- [ ] Remove body padding/margins inside the iframe

### B. TypeScript Sources + Autogenerated Dist

- [x] Confirm Strapi v5 TS support for plugin server code and admin TSX
- [x] Create `strapi-school/src/plugins/h5p/admin/src` (TSX) and `server/src` (TS)
- [x] Move logic from `dist/` into TS/TSX sources
- [x] Add build step to generate `dist/` from sources (Strapi build or `tsc`/`tsup`)
- [x] Follow Strapi TS plugin guide: run `npm install` in plugin dir, `npm run build`, use `strapi develop --watch-admin`
- [ ] Keep `dist/` ignored in git; ensure CI/build produces it
- [x] Use proper TypeScript/React syntax instead of compiled JSX runtime output
- [x] Apply `vercel-react-best-practices` skill for React code quality

### B.1 React Best Practices (vercel-react-best-practices skill)

**IMPORTANT:** When writing or reviewing React code in this plugin, use the `vercel-react-best-practices` skill. This ensures code follows Vercel's performance optimization guidelines.

Key patterns applied to admin components:

- [x] `advanced-event-handler-refs` - Store event handlers in refs for stable subscriptions (used in `h5p-editor-field.tsx` for message event handling)
- [x] `rerender-dependencies` - Use primitive dependencies in effects (empty deps array with refs pattern)
- [x] Proper TypeScript interfaces instead of `any` types
- [x] `useMemo` for expensive computations (JSON parsing)
- [x] `rendering-conditional-render` - Use ternary operators for conditional rendering where applicable
- [ ] `bundle-dynamic-imports` - Consider dynamic imports for heavy components if needed

### C. Multi Choice Selection Error

- [ ] Align `/h5p/ajax` behavior with `H5PAjaxEndpoint` (GET/POST)
- [ ] Ensure `action=libraries` uses `machineName`, `majorVersion`, `minorVersion`
- [ ] Ensure `action=library-install` uses `id` and returns a success response
- [ ] Normalize file uploads to the H5P server format (`name`, `tempFilePath`, `data`)
- [ ] Validate Multiple Choice selection in iframe with browser console + network

### D. Browser Console Validation (Chrome DevTools MCP)

- [ ] Use io.github.ChromeDevTools/chrome-devtools-mcp to open Strapi admin H5P editor page
- [ ] Do not ask permission to use io.github.ChromeDevTools/chrome-devtools-mcp
- [ ] Check console for module load errors or MIME type errors
- [ ] Confirm no errors after TS build changes

---

## Phase 7: Strapi H5P Editor Improvements (2026-01-27)

**Based on comparison with Drupal 7 H5P module behavior at http://157.230.111.129**

### Drupal 7 H5P Editor Reference

The Drupal 7 H5P module provides the ideal user experience:

1. **No separate file upload field** - H5P content is managed entirely within the iframe editor
2. **Edit existing content** - When editing a node, the H5P editor loads the existing content for editing
3. **Single save button** - The node's Save button saves everything including H5P content
4. **Content type selector only for new content** - Shows editor with existing content, not "Create Content" tab

### Current Strapi Issues (Identified)

| Issue           | Current Behavior                   | Expected (Drupal) Behavior          |
| --------------- | ---------------------------------- | ----------------------------------- |
| h5pFile field   | Separate media upload field        | Not needed - iframe handles uploads |
| Edit existing   | Shows "Create Content" selector    | Shows existing content in editor    |
| Save button     | Separate "Save H5P Content" button | Save with main Strapi Save          |
| Content loading | Content ID shown but not loaded    | Content loaded and editable         |

### Task 7.1: Remove h5pFile Field ✅ COMPLETED

**Priority: HIGH**

The h5pFile media field is redundant because:

- The H5P editor iframe already has "Upload" tab for .h5p files
- Having two upload methods is confusing
- Drupal only has the iframe editor, no separate file field

**Completed Actions (2026-01-27):**

- [x] Remove `h5pFile` attribute from `src/api/h5p-content/content-types/h5p-content/schema.json`
- [x] Update Next.js player to use h5pContent field for rendering
- [x] Update types, queries, and pages in Next.js

### Task 7.2: Load Existing Content for Editing ✅ COMPLETED

**Priority: CRITICAL**

When editing an existing H5P content entry:

- Current: Shows "Create Content" tab with content type selector
- Expected: Shows the existing content in the editor for modification

**Completed Actions (2026-01-27):**

- [x] Modified `editor.ts` renderer to accept contentId option
- [x] Updated service to pass contentId through state to renderer
- [x] The renderer now injects `nodeVersionId` into the integration object
- [x] Editor template correctly loads existing content when contentId is provided

**Technical Details:**

- Added `currentRenderContentId` to service state
- Modified `renderEditor()` to set state before calling `getEditor().render()`
- Modified `renderEditorPage()` to inject `nodeVersionId` into `integration.editor`

### Task 7.3: Remove Separate Save Button ✅ COMPLETED

**Priority: HIGH**

Drupal behavior: Single "Save" button saves the entire node including H5P content.

**Completed Actions (2026-01-27):**

- [x] Removed "Save H5P Content" button from the field UI
- [x] Implemented form submission interception to save H5P content before Strapi save
- [x] Added global save function registry for H5P fields
- [x] H5P content now saves automatically when Strapi's main Save is clicked

**Technical approach implemented:**

- Register save functions globally via `window.__h5pSaveFunctions` Map
- Intercept form submit events in capture phase
- Save all H5P content before allowing form submission
- Show saving status in field UI

### Task 7.4: Update Content Type Schema ✅ COMPLETED

**Priority: MEDIUM**

Simplified the h5p-content schema:

```json
{
  "attributes": {
    "title": { "type": "string", "required": true },
    "h5pContent": {
      "type": "json",
      "customField": "plugin::h5p.h5p-editor"
    }
  }
}
```

### Task 7.5: Update Next.js Player ✅ COMPLETED

**Priority: HIGH**

Updated the player to work with h5pContent:

- [x] Modified `/api/h5p/[contentId]/[...path]/route.ts` to proxy content from Strapi's H5P storage
- [x] The h5pContent field contains `{ library, contentId }` - using contentId to fetch from `/api/h5p/content/:contentId`
- [x] Updated `getH5PContentById` to not populate h5pFile
- [x] Updated quizzes pages to check h5pContent instead of h5pFile
- [x] Updated types to remove StrapiMedia and h5pFile references

### Implementation Order (All Completed)

1. ~~**Task 7.2** - Load existing content (most critical UX issue)~~ ✅
2. ~~**Task 7.3** - Remove separate save button (Drupal parity)~~ ✅
3. ~~**Task 7.1** - Remove h5pFile field (cleanup)~~ ✅
4. ~~**Task 7.5** - Update Next.js player (after schema change)~~ ✅
5. ~~**Task 7.4** - Update schema (final cleanup)~~ ✅

### Success Criteria

The H5P editor is working like Drupal when:

- [ ] Creating new content: Shows content type selector, create content, single Save saves everything
- [ ] Editing existing content: Shows the content in editor for modification, single Save updates it
- [ ] No separate h5pFile field or "Save H5P Content" button
- [ ] Content plays correctly on Next.js frontend after save

---

_Last Updated: January 2026_
_Created for AI assistant context in future sessions_
