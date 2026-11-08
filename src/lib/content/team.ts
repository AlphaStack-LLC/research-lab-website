import { readMarkdownCollection } from "./markdown";
import type { TeamMember } from "./types";

interface TeamMemberFrontmatter {
  slug: string;
  name: string;
  role: string;
  background: string;
  researchInterests?: string[];
  profiles?: { label: string; url: string }[];
}

export function getTeamMembers(): TeamMember[] {
  return readMarkdownCollection<TeamMemberFrontmatter>("team").map(
    ({ data, body }) => ({
      ...data,
      researchInterests: data.researchInterests ?? [],
      profiles: data.profiles ?? [],
      body,
    }),
  );
}
