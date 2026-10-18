# SeedX CMS — React / Next.js Prototype

SeedX CMS V1 migrates the original static prototype into a React-based application with reusable components, interactive page navigation, Motion animations, a draggable homepage section builder, content editor, responsive preview, and local draft persistence.

## Stack

- Next.js App Router
- React + TypeScript
- Motion for React (`motion/react`)
- Lucide React icons
- Tailwind CSS 4 is installed for future utility-based styling; the first design pass uses `app/globals.css` for exact brand tokens.

## Requirements

- Node.js 20.9+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current functionality

- Responsive dashboard shell and sidebar navigation
- Overview with honest placeholder metrics (no fabricated data)
- Homepage CMS with 13 initial sections
- Drag-and-drop reordering (Motion Reorder), plus arrow controls
- Section visibility toggles
- Section content editor
- Desktop/mobile homepage preview
- SEO title and meta description editor
- Local browser storage for draft data
- Toast feedback and reduced-motion CSS support

## Important prototype limits

This is not a production CMS yet. Data is stored in local browser storage. There is no real login, role-based permissions, database, media upload service, audit log, or live publishing. The Publish button saves a local draft and explicitly does not publish to a public website.

## Suggested next implementation stages

1. Connect Supabase Auth and PostgreSQL.
2. Define normalized CMS tables for pages, page sections, projects, services, articles, contributors, events, and media.
3. Add Supabase Storage for media and validation of allowed file types/size.
4. Implement server-side publishing, draft revisions, roles, and audit logs.
5. Connect the public SeedX website to the same content model.
6. Add automated tests and deploy to a staging environment before production.
