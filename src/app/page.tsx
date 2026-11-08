import Link from "next/link";
import { AgentNetwork } from "@/components/visualization/AgentNetwork";
import { ProjectCard } from "@/components/research/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/content/projects";
import { getResearchAreas } from "@/lib/content/research-areas";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const researchAreas = getResearchAreas();
  const projects = getProjects();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-700/50 bg-gradient-to-b from-ink-900 to-ink-950">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
              {siteConfig.name}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-paper-50 sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-paper-300">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/research/">Explore Research</ButtonLink>
              <ButtonLink href="/collaborate/" variant="secondary">
                Collaborate With Us
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden="false" className="rounded-xl border border-ink-700/50 bg-ink-900/40 p-6">
            <AgentNetwork />
          </div>
        </Container>
      </section>

      {/* Research mission */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Mission" title="Research mission">
            <p>
              AlphaStack Research Lab conducts applied research on the
              engineering foundations of autonomous AI systems. Our work
              targets problems that remain unresolved in production
              environments: how distributed agents maintain consistent state,
              how long-running systems preserve and govern memory, how
              coordination protocols survive partial failure, and how agent
              behavior can be independently verified.
            </p>
            <p className="mt-4">
              We treat these as open scientific and engineering challenges,
              not solved problems. Our publications and project pages
              distinguish clearly between hypotheses, planned experiments,
              work in progress, and verified results.
            </p>
          </SectionHeading>
        </Container>
      </section>

      {/* Research areas */}
      <section className="border-t border-ink-700/50 bg-ink-900/30 py-20">
        <Container>
          <SectionHeading eyebrow="Research areas" title="What we study" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <li key={area.slug}>
                <Card className="h-full">
                  <h3 className="text-lg font-semibold text-paper-50">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-300">
                    {area.summary}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm font-medium">
            <Link href="/research/" className="text-accent-400 hover:text-accent-300">
              Read the full research area statements
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </Container>
      </section>

      {/* Featured research */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Featured research"
            title="Active and proposed projects"
          >
            <p>
              Each project is labeled with its current status. Unless marked
              otherwise, projects are early-stage proposals under evaluation.
            </p>
          </SectionHeading>
          {projects.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-paper-300">
              Research projects will be listed here as they are approved.
            </p>
          )}
        </Container>
      </section>

      {/* Technology transfer */}
      <section className="border-t border-ink-700/50 bg-ink-900/30 py-20">
        <Container>
          <SectionHeading eyebrow="Technology transfer" title="From research to practice">
            <p>
              Our longer-term objective is to make validated research
              available to industry partners through licensing arrangements,
              hosted APIs, software development kits, and joint R&amp;D
              programs.
            </p>
            <p className="mt-4">
              These offerings are <strong className="text-paper-100">not
              currently commercially available</strong>. They represent
              planned pathways that will follow verified research outcomes.
              Organizations interested in shaping this work early are
              welcome to get in touch.
            </p>
          </SectionHeading>
          <ButtonLink href="/collaborate/" variant="secondary">
            Discuss collaboration
          </ButtonLink>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <Container className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-paper-50">
            Interested in our research?
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-paper-300">
            We welcome inquiries from research-oriented engineering teams and
            potential industry partners.
          </p>
          <div className="mt-8">
            <ButtonLink href={`mailto:${siteConfig.contactEmail}`}>
              Contact us at {siteConfig.contactEmail}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
