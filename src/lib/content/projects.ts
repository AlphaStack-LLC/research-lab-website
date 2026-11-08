import { readMarkdownCollection } from "./markdown";
import {
  PROJECT_STATUSES,
  RESEARCH_AREA_SLUGS,
  type Project,
  type ProjectStatus,
  type ResearchAreaSlug,
} from "./types";

interface ProjectFrontmatter {
  slug: string;
  title: string;
  summary: string;
  researchArea: ResearchAreaSlug;
  status: ProjectStatus;
  startDate?: string;
  technicalObjectives: string[];
  methodology: string;
  evaluationMetrics: string[];
  results?: string;
  relatedPublications?: string[];
  repositoryUrl?: string;
  ipDisclosureStatus: string;
}

function validateProject(frontmatter: ProjectFrontmatter): void {
  if (!PROJECT_STATUSES.includes(frontmatter.status)) {
    throw new Error(
      `Project "${frontmatter.slug}" has invalid status "${frontmatter.status}". ` +
        `Expected one of: ${PROJECT_STATUSES.join(", ")}.`,
    );
  }
  if (!RESEARCH_AREA_SLUGS.includes(frontmatter.researchArea)) {
    throw new Error(
      `Project "${frontmatter.slug}" references unknown research area ` +
        `"${frontmatter.researchArea}".`,
    );
  }
}

export function getProjects(): Project[] {
  return readMarkdownCollection<ProjectFrontmatter>("projects").map(
    ({ data, body }) => {
      validateProject(data);
      return {
        ...data,
        relatedPublications: data.relatedPublications ?? [],
        body,
      };
    },
  );
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getProjects().map((project) => project.slug);
}
