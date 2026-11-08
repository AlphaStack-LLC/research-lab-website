import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/research/StatusBadge";
import { getResearchAreaTitle } from "@/lib/content/research-areas";
import type { Project } from "@/lib/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="text-xs text-paper-400">
          {getResearchAreaTitle(project.researchArea)}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-paper-50">
        <Link
          href={`/projects/${project.slug}/`}
          className="hover:text-accent-300"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-300">
        {project.summary}
      </p>
      <p className="mt-4 text-sm font-medium text-accent-400">
        <Link href={`/projects/${project.slug}/`}>
          View project<span aria-hidden="true"> &rarr;</span>
        </Link>
      </p>
    </Card>
  );
}
