# Deployment: AWS S3 + CloudFront

Target: `https://lab.alpha-stack.ai` — a static export in a **private** S3
bucket, served through CloudFront with Origin Access Control (OAC), HTTPS
via ACM, and DNS managed in GoDaddy.

## Live resources (provisioned 2026-11-07)

| Resource | Value |
| --- | --- |
| S3 bucket | `alpha-stack-lab-website` (us-east-1, public access blocked) |
| CloudFront distribution | `E2GPSM6AHRJIS9` (`d12kfqk1jvi586.cloudfront.net`) |
| OAC | `E1TJ1FCTZF2QJC` (`lab-website-oac`) |
| CloudFront Function | `lab-url-rewrite` (viewer-request, cloudfront-js-2.0) |
| ACM certificate | `29e9b570-934a-4716-9e53-2da91b59afce` (shared `*.alpha-stack.ai`, us-east-1) |
| DNS | CNAME `lab` → `d12kfqk1jvi586.cloudfront.net` (GoDaddy, manual) |

Deploy with:

```bash
npm run build && npm test
S3_BUCKET=alpha-stack-lab-website \
CLOUDFRONT_DISTRIBUTION_ID=E2GPSM6AHRJIS9 \
npm run deploy
```

## One-time setup

Region note: following existing AlphaStack convention, resources are in
`us-east-1`. ACM certificates for CloudFront **must** be in `us-east-1`.

### 1. S3 bucket (private)

```bash
aws s3api create-bucket --bucket alpha-stack-lab-website --region us-east-1
aws s3api put-public-access-block --bucket alpha-stack-lab-website \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

Do **not** enable S3 static website hosting; OAC serves the bucket directly.
Never upload anything other than the contents of `out/`.

### 2. ACM certificate

Request a public certificate in `us-east-1` for `lab.alpha-stack.ai` (or
reuse the existing `*.alpha-stack.ai` certificate if it is already issued
in `us-east-1`). Validate via DNS CNAME in GoDaddy. See the existing
`InfrastructureManagement/DNS_SETUP.md` for the GoDaddy workflow.

### 3. CloudFront Function

Create a CloudFront Function named e.g. `lab-url-rewrite` with the code in
[`../../infrastructure/cloudfront/url-rewrite-function.js`](../../infrastructure/cloudfront/url-rewrite-function.js)
(runtime `cloudfront-js-2.0`), publish it, and associate it with the
distribution's **viewer request** event on the default cache behavior.

### 4. CloudFront distribution

- **Origin**: the S3 bucket, with **Origin Access Control** (create an OAC
  with S3 signing). After attaching, update the bucket policy to allow
  `s3:GetObject` for the distribution's service principal only.
- **Alternate domain name**: `lab.alpha-stack.ai`.
- **Viewer protocol policy**: Redirect HTTP to HTTPS.
- **SSL certificate**: the ACM certificate from step 2.
- **Default root object**: `index.html`.
- **Custom error responses**: map 403 and 404 to `/404.html` (response code
  404) so unknown deep links render the site's not-found page.
- **Cache behaviors**:
  - `/_next/static/*` — long-lived caching is safe because filenames are
    content-hashed (the deploy script sets
    `Cache-Control: public, max-age=31536000, immutable`).
  - Default (`*.html` etc.) — the deploy script sets
    `Cache-Control: public, max-age=0, must-revalidate` and each deploy
    creates a `/*` invalidation, so content updates go live immediately.

### 5. DNS (GoDaddy)

Create a CNAME record:

```
Name:  lab
Value: <distribution-id>.cloudfront.net
```

### 6. Jenkins

The `Jenkinsfile` in this repository runs: checkout → `npm ci` → lint →
typecheck → build → smoke test → deploy (main branch only). It expects:

- Jenkins credential `aws-credentials` (same AWS credentials binding used
  by the other AlphaStack pipelines) with permission to `s3:PutObject` /
  `s3:DeleteObject` / `s3:ListBucket` on the bucket and
  `cloudfront:CreateInvalidation` on the distribution.
- Node.js 18.18+ available on the agent.
- `S3_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` set in the pipeline
  environment block.

## Manual deploy

```bash
npm ci
npm run build
npm test
S3_BUCKET=alpha-stack-lab-website \
CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXXXX \
npm run deploy
```

## Rollback

The deploy is a sync of `out/` plus a `/*` invalidation, so rollback is a
redeploy of a previous build:

```bash
git checkout <previous-commit>
npm ci && npm run build && npm test
S3_BUCKET=... CLOUDFRONT_DISTRIBUTION_ID=... npm run deploy
```

For a faster rollback, keep the previous build's `out/` as a build artifact
in Jenkins and sync it back without rebuilding.

## Verifying a deploy

After deploying, verify direct navigation, refresh, and deep links:

```bash
for path in / /research/ /projects/ \
  /projects/adaptive-state-memory-coordination/ /publications/ /team/ \
  /collaborate/ /sitemap.xml /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://lab.alpha-stack.ai${path}")
  echo "${code} ${path}"
done
```

All routes should return `200`. A `403` on a clean URL usually means the
CloudFront Function is not associated with the viewer-request event.
