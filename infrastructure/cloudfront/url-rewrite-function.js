// CloudFront Function (viewer-request) for lab.alpha-stack.ai.
//
// The site is a Next.js static export with `trailingSlash: true`, so every
// route is stored in S3 as `<path>/index.html`. S3 origins behind OAC do
// not resolve index documents for subdirectories, so this function rewrites
// clean URLs to their index.html equivalents. This makes direct navigation,
// refresh, and deep links work for every route.
//
// Runtime: cloudfront-js-2.0 (or later)
function handler(event) {
  var uri = event.request.uri;

  // Requests with a file extension (e.g. /favicon.ico, /sitemap.xml,
  // hashed assets under /_next/static/) map directly to S3 objects.
  if (uri.includes(".")) {
    return event.request;
  }

  if (uri.endsWith("/")) {
    event.request.uri = uri + "index.html";
  } else {
    event.request.uri = uri + "/index.html";
  }
  return event.request;
}
