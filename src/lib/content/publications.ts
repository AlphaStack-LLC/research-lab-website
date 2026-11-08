import { readMarkdownCollection } from "./markdown";
import { PUBLICATION_TYPES, type Publication, type PublicationType } from "./types";

interface PublicationFrontmatter {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  type: PublicationType;
  abstract: string;
  externalUrl?: string;
  pdfUrl?: string;
  projectSlug?: string;
}

function validatePublication(frontmatter: PublicationFrontmatter): void {
  if (!PUBLICATION_TYPES.includes(frontmatter.type)) {
    throw new Error(
      `Publication "${frontmatter.slug}" has invalid type "${frontmatter.type}". ` +
        `Expected one of: ${PUBLICATION_TYPES.join(", ")}.`,
    );
  }
}

export function getPublications(): Publication[] {
  return readMarkdownCollection<PublicationFrontmatter>("publications")
    .map(({ data, body }) => {
      validatePublication(data);
      return { ...data, body };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
