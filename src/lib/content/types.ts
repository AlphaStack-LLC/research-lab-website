export const PROJECT_STATUSES = [
  "Proposed",
  "Planning",
  "In Progress",
  "Validated",
  "Completed",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const RESEARCH_AREA_SLUGS = [
  "distributed-multi-agent-systems",
  "persistent-context-and-memory",
  "fault-tolerant-agent-coordination",
  "verifiable-agent-execution",
] as const;

export type ResearchAreaSlug = (typeof RESEARCH_AREA_SLUGS)[number];

export interface ResearchArea {
  slug: ResearchAreaSlug;
  title: string;
  summary: string;
  /** Markdown body: problem statement, challenges, questions, approaches, evaluation, applications. */
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  researchArea: ResearchAreaSlug;
  status: ProjectStatus;
  startDate?: string;
  technicalObjectives: string[];
  methodology: string;
  evaluationMetrics: string[];
  /** Present only when verified results exist. */
  results?: string;
  relatedPublications: string[];
  repositoryUrl?: string;
  ipDisclosureStatus: string;
  /** Markdown body with the full project narrative. */
  body: string;
}

export const PUBLICATION_TYPES = [
  "Research Paper",
  "Technical Report",
  "Preprint",
  "Benchmark Report",
  "Engineering Note",
] as const;

export type PublicationType = (typeof PUBLICATION_TYPES)[number];

export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  type: PublicationType;
  abstract: string;
  externalUrl?: string;
  pdfUrl?: string;
  projectSlug?: string;
  body: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  background: string;
  researchInterests: string[];
  profiles: { label: string; url: string }[];
  body: string;
}
