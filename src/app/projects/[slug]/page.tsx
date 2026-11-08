import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/research/StatusBadge";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { getProject, getProjectSlugs } from "@/lib/content/projects";
import { getResearchAreaTitle } from "@/lib/content/research-areas";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} — AlphaStack Research Lab`,
      description: project.summary,
      url: `/projects/${project.slug}/`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16">
      <article className="max-w-prose">
        <p className="text-sm">
          <Link href="/projects/" className="text-accent-400 hover:text-accent-300">
            <span aria-hidden="true">&larr; </span>All projects
          </Link>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="text-sm text-paper-400">
            {getResearchAreaTitle(project.researchArea)}
          </span>
          {project.startDate ? (
            <span className="text-sm text-paper-400">
              Started {project.startDate}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-paper-50">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          {project.summary}
        </p>

        <section aria-labelledby="objectives-heading" className="mt-10">
          <h2
            id="objectives-heading"
            className="font-serif text-2xl font-semibold text-paper-50"
          >
            Technical objectives
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-paper-200">
            {project.technicalObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="methodology-heading" className="mt-10">
          <h2
            id="methodology-heading"
            className="font-serif text-2xl font-semibold text-paper-50"
          >
            Methodology
          </h2>
          <p className="mt-4 leading-relaxed text-paper-200">
            {project.methodology}
          </p>
        </section>

        <section aria-labelledby="metrics-heading" className="mt-10">
          <h2
            id="metrics-heading"
            className="font-serif text-2xl font-semibold text-paper-50"
          >
            Evaluation metrics
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-paper-200">
            {project.evaluationMetrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </section>

        {project.results ? (
          <section aria-labelledby="results-heading" className="mt-10">
            <h2
              id="results-heading"
              className="font-serif text-2xl font-semibold text-paper-50"
            >
              Results
            </h2>
            <p className="mt-4 leading-relaxed text-paper-200">
              {project.results}
            </p>
          </section>
        ) : (
          <p className="mt-10 rounded-lg border border-ink-700/60 bg-ink-900/60 p-4 text-sm text-paper-300">
            No verified results have been published for this project yet.
          </p>
        )}

        {project.body ? <Prose className="mt-10">{project.body}</Prose> : null}

        <dl className="mt-12 space-y-4 border-t border-ink-700/50 pt-8 text-sm">
          <div>
            <dt className="font-semibold text-paper-100">
              IP disclosure status
            </dt>
            <dd className="mt-1 text-paper-300">{project.ipDisclosureStatus}</dd>
          </div>
          {project.repositoryUrl ? (
            <div>
              <dt className="font-semibold text-paper-100">Repository</dt>
              <dd className="mt-1">
                <a
                  href={project.repositoryUrl}
                  className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
                >
                  {project.repositoryUrl}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </article>
    </Container>
  );
}
