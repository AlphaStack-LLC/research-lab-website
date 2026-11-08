import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { Container } from "@/components/ui/Container";
import { getResearchAreas } from "@/lib/content/research-areas";

export const metadata: Metadata = {
  title: "Research Areas",
  description:
    "Problem statements, open challenges, research questions, approaches, and evaluation methodology for AlphaStack Research Lab's four research areas.",
  alternates: { canonical: "/research/" },
  openGraph: {
    title: "Research Areas — AlphaStack Research Lab",
    description:
      "Distributed multi-agent systems, persistent context and memory, fault-tolerant agent coordination, and verifiable agent execution.",
    url: "/research/",
  },
};

export default function ResearchPage() {
  const areas = getResearchAreas();

  return (
    <Container className="py-16">
      <header className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          Research Areas
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          Our research is organized into four areas. Each statement below
          describes the problem, the technical challenges that remain open,
          the questions we are investigating, our proposed approaches, and how
          we intend to evaluate results.
        </p>
      </header>

      <div className="mt-16 space-y-20">
        {areas.map((area) => (
          <article
            key={area.slug}
            id={area.slug}
            aria-labelledby={`${area.slug}-heading`}
            className="border-t border-ink-700/50 pt-12"
          >
            <h2
              id={`${area.slug}-heading`}
              className="font-serif text-3xl font-semibold text-paper-50"
            >
              {area.title}
            </h2>
            <p className="mt-3 max-w-prose text-paper-300">{area.summary}</p>
            <Prose className="mt-6">{area.body}</Prose>
          </article>
        ))}
      </div>
    </Container>
  );
}
