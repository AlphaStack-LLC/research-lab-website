import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getPublications } from "@/lib/content/publications";

export const metadata: Metadata = {
  title: "Publications & Technical Reports",
  description:
    "Research papers, technical reports, preprints, benchmark reports, and engineering notes from AlphaStack Research Lab.",
  alternates: { canonical: "/publications/" },
  openGraph: {
    title: "Publications & Technical Reports — AlphaStack Research Lab",
    description:
      "Research papers, technical reports, preprints, benchmark reports, and engineering notes from AlphaStack Research Lab.",
    url: "/publications/",
  },
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <Container className="py-16">
      <header className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          Publications &amp; Technical Reports
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          Research papers, technical reports, preprints, benchmark reports,
          and engineering notes. Entries appear here only after they are
          finalized.
        </p>
      </header>

      {publications.length > 0 ? (
        <ul className="mt-12 space-y-6">
          {publications.map((publication) => (
            <li key={publication.slug}>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  {publication.type} &middot; {publication.date}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-paper-50">
                  {publication.externalUrl ? (
                    <a
                      href={publication.externalUrl}
                      className="hover:text-accent-300"
                    >
                      {publication.title}
                    </a>
                  ) : (
                    publication.title
                  )}
                </h2>
                <p className="mt-1 text-sm text-paper-400">
                  {publication.authors.join(", ")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper-300">
                  {publication.abstract}
                </p>
                {publication.pdfUrl ? (
                  <p className="mt-3 text-sm">
                    <a
                      href={publication.pdfUrl}
                      className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
                    >
                      Download PDF
                    </a>
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-lg border border-ink-700/60 bg-ink-900/60 p-6 text-paper-300">
          Research publications and technical reports will be listed here as
          they become available.
        </p>
      )}
    </Container>
  );
}
