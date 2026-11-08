import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industry Collaboration",
  description:
    "Engagement models for working with AlphaStack Research Lab: joint research exploration, technology licensing, enterprise API/SDK partnerships, and contract R&D.",
  alternates: { canonical: "/collaborate/" },
  openGraph: {
    title: "Industry Collaboration — AlphaStack Research Lab",
    description:
      "Engagement models for working with AlphaStack Research Lab.",
    url: "/collaborate/",
  },
};

const ENGAGEMENT_MODELS = [
  {
    title: "Joint Research Exploration",
    status: "Open for discussion",
    available: true,
    description:
      "Collaborative scoping of research questions aligned with your engineering challenges. Suitable for teams evaluating multi-agent architectures who want early visibility into our work.",
  },
  {
    title: "Technology Licensing",
    status: "Planned — not yet available",
    available: false,
    description:
      "Licensing of validated research outputs once results are verified and intellectual property positions are clarified. No licensable technology is offered at this time.",
  },
  {
    title: "Enterprise API / SDK Partnerships",
    status: "Planned — not yet available",
    available: false,
    description:
      "Hosted APIs and SDKs built on validated research. These are future capabilities under consideration, not existing products, and no availability date has been committed.",
  },
  {
    title: "Contract Research & Development",
    status: "Open for discussion",
    available: true,
    description:
      "Scoped applied R&D engagements with AlphaStack LLC on problems within our research areas, subject to mutual fit and standard commercial terms.",
  },
] as const;

export default function CollaboratePage() {
  return (
    <Container className="py-16">
      <header className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          Industry Collaboration
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          We engage with industry partners in the models below. Each model is
          labeled to distinguish capabilities that are open for discussion
          today from those that are planned but not yet available.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {ENGAGEMENT_MODELS.map((model) => (
          <li key={model.title}>
            <Card className="h-full">
              <p
                className={
                  model.available
                    ? "text-xs font-semibold uppercase tracking-widest text-emerald-300"
                    : "text-xs font-semibold uppercase tracking-widest text-paper-400"
                }
              >
                {model.status}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-paper-50">
                {model.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-paper-300">
                {model.description}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <section className="mt-16 max-w-prose border-t border-ink-700/50 pt-12">
        <h2 className="font-serif text-2xl font-semibold text-paper-50">
          Start a conversation
        </h2>
        <p className="mt-4 leading-relaxed text-paper-300">
          Email us with a short description of your organization, the problem
          you are working on, and the engagement model you have in mind. We
          respond to serious inquiries from research-oriented teams.
        </p>
        <div className="mt-6">
          <ButtonLink href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
