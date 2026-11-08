import { readMarkdownCollection } from "./markdown";
import type { ResearchArea, ResearchAreaSlug } from "./types";

interface ResearchAreaFrontmatter {
  slug: ResearchAreaSlug;
  title: string;
  summary: string;
}

export function getResearchAreas(): ResearchArea[] {
  return readMarkdownCollection<ResearchAreaFrontmatter>("research").map(
    ({ data, body }) => ({ ...data, body }),
  );
}

export function getResearchAreaTitle(slug: ResearchAreaSlug): string {
  return getResearchAreas().find((area) => area.slug === slug)?.title ?? slug;
}
