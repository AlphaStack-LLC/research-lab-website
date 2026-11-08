import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MarkdownDocument<T> {
  data: T;
  body: string;
}

/**
 * Reads every `.md` file in a content subdirectory and parses frontmatter.
 * Missing or empty directories yield an empty list so sections can render
 * honest empty states instead of failing the build.
 */
export function readMarkdownCollection<T>(
  collection: string,
): MarkdownDocument<T>[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = matter(raw);
      return { data: parsed.data as T, body: parsed.content.trim() };
    });
}
