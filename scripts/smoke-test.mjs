#!/usr/bin/env node
/**
 * Smoke test for the static export in out/.
 *
 * Checks:
 *   1. Every expected top-level route produced an index.html.
 *   2. Every HTML file has a non-empty <title> and <meta name="description">.
 *   3. Every internal href/src in every HTML file resolves to a file in out/
 *      (clean URLs resolve via the trailing-slash -> index.html rule that
 *      the CloudFront Function applies in production).
 *
 * Exits non-zero and prints all failures if anything is missing.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out",
);

const REQUIRED_ROUTES = [
  "index.html",
  "research/index.html",
  "projects/index.html",
  "projects/adaptive-state-memory-coordination/index.html",
  "publications/index.html",
  "team/index.html",
  "collaborate/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function listHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function resolveInternalLink(link) {
  // Asset URLs may contain URL-encoded characters (e.g. %5Bslug%5D for
  // dynamic-route chunks); decode before resolving against the filesystem.
  const clean = decodeURIComponent(link.split("#")[0].split("?")[0]);
  // Skip empty, external, and protocol-relative links.
  if (!clean || !clean.startsWith("/") || clean.startsWith("//")) {
    return null;
  }
  const candidates = clean.endsWith("/")
    ? [path.join(clean, "index.html")]
    : [clean, path.join(clean, "index.html")];
  return candidates.some((candidate) =>
    fs.existsSync(path.join(outDir, candidate)),
  )
    ? true
    : candidates[0];
}

if (!fs.existsSync(outDir)) {
  console.error("out/ not found. Run 'npm run build' first.");
  process.exit(1);
}

for (const route of REQUIRED_ROUTES) {
  if (!fs.existsSync(path.join(outDir, route))) {
    fail(`missing expected route: out/${route}`);
  }
}

const linkPattern = /(?:href|src)="([^"]+)"/g;
const htmlFiles = listHtmlFiles(outDir);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(outDir, file);

  if (!/<title>[^<]+<\/title>/.test(html)) {
    fail(`${rel}: missing or empty <title>`);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    fail(`${rel}: missing meta description`);
  }

  for (const match of html.matchAll(linkPattern)) {
    const link = match[1];
    if (
      link.startsWith("http://") ||
      link.startsWith("https://") ||
      link.startsWith("mailto:") ||
      link.startsWith("data:")
    ) {
      continue;
    }
    const resolved = resolveInternalLink(link);
    if (resolved !== null && resolved !== true) {
      fail(`${rel}: broken internal link "${link}" (expected ${resolved})`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Smoke test FAILED with ${failures.length} problem(s):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Smoke test passed: ${REQUIRED_ROUTES.length} required routes present, ` +
    `${htmlFiles.length} HTML files checked for metadata and broken links.`,
);
