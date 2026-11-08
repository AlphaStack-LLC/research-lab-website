#!/usr/bin/env bash
# Deploy the static export (out/) to S3 and invalidate CloudFront.
#
# Required environment variables:
#   S3_BUCKET                    - private S3 bucket name (OAC origin)
#   CLOUDFRONT_DISTRIBUTION_ID   - CloudFront distribution ID
# Optional:
#   AWS_REGION                   - defaults to us-east-1
#
# Only the contents of out/ are uploaded. Source code, .next/, and
# node_modules/ are never synced.
set -euo pipefail

: "${S3_BUCKET:?S3_BUCKET is required}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?CLOUDFRONT_DISTRIBUTION_ID is required}"
AWS_REGION="${AWS_REGION:-us-east-1}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/out"

if [[ ! -f "${OUT_DIR}/index.html" ]]; then
  echo "error: ${OUT_DIR}/index.html not found. Run 'npm run build' first." >&2
  exit 1
fi

echo "==> Syncing immutable hashed assets (_next/static)..."
aws s3 sync "${OUT_DIR}/_next/static" "s3://${S3_BUCKET}/_next/static" \
  --region "${AWS_REGION}" \
  --cache-control "public, max-age=31536000, immutable"

echo "==> Syncing remaining content (HTML and other files)..."
# HTML must be revalidated every load so content updates go live
# immediately after an invalidation; --delete removes stale objects.
aws s3 sync "${OUT_DIR}/" "s3://${S3_BUCKET}/" \
  --region "${AWS_REGION}" \
  --exclude "_next/static/*" \
  --cache-control "public, max-age=0, must-revalidate" \
  --delete

echo "==> Invalidating CloudFront distribution ${CLOUDFRONT_DISTRIBUTION_ID}..."
aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths "/*"

echo "==> Deploy complete."
