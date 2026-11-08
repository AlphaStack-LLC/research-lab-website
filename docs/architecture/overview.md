# Architecture Overview

## Goals

- Fully static site: no server, database, authentication, or CMS.
- Content editable as Markdown; invalid content fails the build.
- Cheap, reproducible hosting on S3 + CloudFront.

## Stack

- **Next.js (App Router)** with `output: "export"` and
  `trailingSlash: true` — `npm run build` emits a complete static site to
  `out/`. Every route is a directory containing an `index.html`.
- **TypeScript** in strict mode.
- **Tailwind CSS** for styling; no component library.
- **Markdown content** in `content/`, parsed at build time with
  `gray-matter` and rendered with `react-markdown` (+ `remark-gfm`).
- No `next/image` optimization server: `images.unoptimized: true` in
  `next.config.ts`, so images are served as-is.

## Request path (production)

```
browser -> CloudFront (HTTPS, ACM certificate)
        -> CloudFront Function (viewer-request URL rewrite)
        -> S3 private bucket (access via Origin Access Control only)
```

The CloudFront Function
(`infrastructure/cloudfront/url-rewrite-function.js`) rewrites clean URLs
(`/research/`) to the exported files (`/research/index.html`). This is what
makes direct navigation, refresh, and deep links work on every route.

## Content pipeline

```
content/<collection>/*.md
        |  gray-matter (frontmatter) + validation
        v
src/lib/content/*.ts  (typed loaders; throw on invalid data)
        |  imported by Server Components at build time
        v
static HTML in out/
```

Because content is read at build time only, adding or editing a Markdown
file requires a rebuild and redeploy — there is no runtime content store.

## Route map

| Route               | Source                                   |
| ------------------- | ---------------------------------------- |
| `/`                 | `src/app/page.tsx`                       |
| `/research/`        | `src/app/research/page.tsx`              |
| `/projects/`        | `src/app/projects/page.tsx`              |
| `/projects/[slug]/` | `src/app/projects/[slug]/page.tsx` (`generateStaticParams`) |
| `/publications/`    | `src/app/publications/page.tsx`          |
| `/team/`            | `src/app/team/page.tsx`                  |
| `/collaborate/`     | `src/app/collaborate/page.tsx`           |
| `sitemap.xml`       | `src/app/sitemap.ts` (`force-static`)    |
| `robots.txt`        | `src/app/robots.ts` (`force-static`)     |

## Explicitly out of scope

- SSR, ISR, Server Actions, runtime API routes, middleware — all are
  incompatible with `output: "export"` and intentionally unused.
- Contact forms (no backend exists; contact is via email).
- WebGL visualizations (the hero network is SVG + CSS only and respects
  `prefers-reduced-motion`).
