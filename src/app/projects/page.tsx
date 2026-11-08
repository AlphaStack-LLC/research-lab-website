import type { Metadata } from "next";
import { ProjectCard } from "@/components/research/ProjectCard";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Research Projects",
  description:
    "Research projects at AlphaStack Research Lab with explicit status labels: Proposed, Planning, In Progress, Validated, and Completed.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Research Projects — AlphaStack Research Lab",
    description:
      "Research projects at AlphaStack Research Lab with explicit status labels.",
    url: "/projects/",
  },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Container className="py-16">
      <header className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          Research Projects
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          Every project carries an explicit status:{" "}
          <strong className="text-paper-100">Proposed</strong>,{" "}
          <strong className="text-paper-100">Planning</strong>,{" "}
          <strong className="text-paper-100">In Progress</strong>,{" "}
          <strong className="text-paper-100">Validated</strong>, or{" "}
          <strong className="text-paper-100">Completed</strong>. Results are
          published only after they have been verified.
        </p>
      </header>

      {projects.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-paper-300">
          Research projects will be listed here as they are approved.
        </p>
      )}
    </Container>
  );
}
