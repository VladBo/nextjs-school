# H5P Integration Guide

## Overview

This guide explains how to use the H5P integration between Strapi and Next.js for your school website.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Strapi CMS    │         │   Next.js API    │         │  Next.js Pages  │
│   (Backend)     │◄────────│   (Proxy)        │◄────────│   (Frontend)    │
└─────────────────┘         └──────────────────┘         └─────────────────┘
│                                                                  │
│ - H5P Plugin                                                    │
│ - H5P Editor                                                    │
│ - Content Storage                                               │
│ - Library Management                                  - Quiz Listing
│                                                       - Quiz Player
│                                                       - Filters
```

## How It Works

### 1. **Content Creation in Strapi**
Your mom will create H5P content directly in the Strapi admin panel using the built-in H5P editor. The editor provides:
- Multiple Choice Questions
- Drag and Drop
- Fill in the Blanks
- Interactive Videos
- Image Hotspots
- And 40+ other content types

### 2. **Content Storage**
H5P content is stored in Strapi's database with:
- Content parameters (JSON)
- Metadata (title, description, etc.)
- Library information
- Assets (images, videos, etc.)

### 3. **Content Delivery**
- Next.js fetches content metadata from Strapi API
- H5P player loads the interactive content
- Assets are served through Strapi or proxied through Next.js

## Setup Instructions

### Phase 1: Strapi Configuration (Already Completed ✓)

The H5P plugin is already enabled in `/strapi-school/config/plugins.ts`

### Phase 2: Strapi Admin Setup

1. **Start Strapi**:
   ```bash
   cd /Users/Vladyslav_Bondarchuk/Work/school/strapi-school
   npm run develop
   ```

2. **Access Admin Panel**:
   - Navigate to `http://localhost:1337/admin`
   - Log in with your credentials

3. **Check H5P Plugin**:
   - In the sidebar, you should see "H5P" or "Content" section
   - The plugin provides the H5P editor interface

### Phase 3: Create H5P Content

1. **Navigate to H5P Content**:
   - Click "H5P" or "Content" in the Strapi sidebar
   - Click "Create new entry"

2. **Use H5P Editor**:
   - You'll see the H5P content type selector
   - Choose a content type (e.g., "Multiple Choice")
   - Fill in the content using the editor
   - Add title, description, and metadata

3. **Download H5P Libraries** (First Time Only):
   - The editor will prompt you to install H5P libraries
   - These are downloaded from H5P.org
   - Common libraries:
     - H5P.MultiChoice
     - H5P.DragQuestion
     - H5P.Blanks
     - H5P.ImageHotspots

4. **Publish Content**:
   - Click "Save" to store the content
   - Make sure to publish it (toggle the published status)

### Phase 4: Configure Permissions

1. **Navigate to Settings → Roles → Public**:
   - Find "H5P" plugin permissions
   - Enable:
     - `find` - List all H5P content
     - `findOne` - Get specific H5P content
     - `play` - Play H5P content

2. **Save permissions**

### Phase 5: Test Integration

1. **Start Next.js**:
   ```bash
   cd /Users/Vladyslav_Bondarchuk/Work/school/nextjs-school
   npm run dev
   ```

2. **Navigate to Quizzes**:
   - Go to `http://localhost:3000/quizzes`
   - You should see any published H5P content

## API Endpoints

### Strapi H5P Plugin Endpoints

The H5P plugin provides these endpoints:

#### Content API (Public):
- `GET /api/h5p` - List all H5P content
- `GET /api/h5p/:id` - Get specific H5P content
- `GET /h5p/play/:id` - Play H5P content (returns player HTML/data)

#### Editor API (Admin only):
- `POST /h5p/new` - Create new H5P content
- `PUT /h5p/:id` - Update H5P content
- `DELETE /h5p/:id` - Delete H5P content

#### Library API:
- `GET /h5p/libraries` - List installed libraries
- `POST /h5p/libraries` - Install new library

### Next.js Proxy Endpoints (Already Created)

- `GET /api/h5p/[contentId]` - Proxies H5P play data
- `GET /api/h5p/content/[contentId]` - Proxies H5P content parameters

## Content Type Structure

The H5P plugin creates its own content type. You can extend it with custom fields:

### Option 1: Use Plugin Content Type As-Is
The plugin's built-in content type includes:
- `title` (string)
- `h5pContent` (JSON) - The actual H5P content
- `library` (string) - H5P library used
- `params` (JSON) - Content parameters

### Option 2: Create Extended Content Type
If you want additional fields (grade, subject, etc.), create a new collection type that references H5P content:

```json
{
  "collectionName": "quizzes",
  "info": {
    "singularName": "quiz",
    "pluralName": "quizzes"
  },
  "attributes": {
    "title": { "type": "string", "required": true },
    "description": { "type": "text" },
    "h5pContent": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "plugin::h5p.content"
    },
    "grade": { "type": "enumeration", "enum": ["1"-"11"] },
    "subject": { "type": "enumeration" },
    "thumbnail": { "type": "media" }
  }
}
```

## Updating Next.js Integration

The current Next.js code expects a specific content type structure. Once you decide on your approach (Option 1 or 2), we'll update:

1. **Database Queries** (`features/h5p/db/queries.ts`):
   - Update endpoints to match Strapi H5P plugin
   - Map response structure correctly

2. **Type Definitions** (`features/h5p/types/index.ts`):
   - Match Strapi's H5P content type structure

3. **H5P Player** (`features/h5p/components/h5p-player.tsx`):
   - Integrate with H5P player library
   - Load required CSS/JS assets

## H5P Libraries

Common H5P libraries for educational content:

### Quizzes:
- **Multiple Choice** - Single/multiple answer questions
- **True/False Question** - Simple true/false
- **Fill in the Blanks** - Text input questions
- **Drag and Drop** - Match items

### Interactive:
- **Interactive Video** - Video with embedded questions
- **Image Hotspots** - Clickable areas on images
- **Timeline** - Chronological presentations
- **Course Presentation** - Slideshow with interactive elements

### Games:
- **Memory Game** - Card matching
- **Drag the Words** - Text arrangement
- **Mark the Words** - Highlight correct words

## Troubleshooting

### Issue: "H5P libraries not found"
**Solution**: Download libraries from H5P.org through the Strapi admin editor

### Issue: "Content won't load in Next.js"
**Solution**:
1. Check Strapi API permissions
2. Verify content is published
3. Check browser console for CORS errors
4. Ensure `NEXT_PUBLIC_STRAPI_URL` is set correctly

### Issue: "Editor not showing in Strapi"
**Solution**:
1. Restart Strapi server
2. Check plugin is enabled in `config/plugins.ts`
3. Clear browser cache

## Next Steps

Once Strapi is configured and content is created:

1. I'll update the Next.js database queries to use the actual H5P plugin API
2. We'll implement the proper H5P player integration
3. We'll test end-to-end content creation and display

## Resources

- [H5P.org](https://h5p.org) - Official H5P website
- [H5P Examples](https://h5p.org/content-types-and-applications) - Content type examples
- [Strapi H5P Plugin](https://github.com/Lumieducation/strapi-plugin-h5p) - Plugin documentation
