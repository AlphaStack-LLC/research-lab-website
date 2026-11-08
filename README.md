# AlphaStack Research Lab Website

Public research website for **AlphaStack Research Lab**, an internal research
division of AlphaStack LLC (a California limited liability company). Served at
`https://lab.alpha-stack.ai`.

The site is a fully static [Next.js](https://nextjs.org) export — there is no
server, database, authentication, or CMS. All content lives in this
repository as Markdown files.

## Prerequisites

- Node.js >= 18.18 (Node 24 LTS recommended)
- npm

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint        # ESLint (next/core-web-vitals)
npm run typecheck   # strict TypeScript, no emit
npm run build       # production build, writes the static export to out/
npm test            # smoke test: routes, metadata, and internal links in out/
```

`npm test` requires a completed build (`out/` must exist).

## Updating content

All public content is Markdown with YAML frontmatter under `content/`:

| Directory             | Renders at                     |
| --------------------- | ------------------------------ |
| `content/research/`   | `/research/` sections          |
| `content/projects/`   | `/projects/` and detail pages  |
| `content/publications/` | `/publications/`             |
| `content/team/`       | `/team/` profiles              |

Schemas and the content integrity rules (status labels, no unverified
claims) are documented in
[docs/content-guidelines/README.md](docs/content-guidelines/README.md).
Invalid frontmatter (e.g. an unknown project status) fails the build.

## Deployment

The build output (`out/`) is uploaded to a private S3 bucket and served
through CloudFront with an OAC origin. See
[docs/deployment/aws-s3-cloudfront.md](docs/deployment/aws-s3-cloudfront.md)
for the full setup (bucket, OAC, ACM certificate, CloudFront Function,
GoDaddy DNS) and the rollback procedure.

```bash
S3_BUCKET=... CLOUDFRONT_DISTRIBUTION_ID=... npm run deploy
```

The `Jenkinsfile` runs lint, typecheck, build, smoke test, and deploy (deploy
on the main branch only).

## Architecture

See [docs/architecture/overview.md](docs/architecture/overview.md).

## Boundaries

Research experiments, proprietary algorithms, unpublished patent-sensitive
material, and private datasets live in separate **private** repositories and
must never be committed here. This repository contains only public-facing
content and the code that renders it.
