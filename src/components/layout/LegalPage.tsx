import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-16">
      <article className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          {title}
        </h1>
        <p className="mt-2 text-sm text-paper-400">
          Last updated: {lastUpdated}
        </p>
        <div className="mt-8 space-y-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper-50 [&_p]:mt-2 [&_p]:leading-relaxed [&_p]:text-paper-200 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-paper-200 [&_a]:text-accent-300 [&_a]:underline [&_a]:decoration-accent-500/50 [&_a]:underline-offset-4">
          {children}
        </div>
      </article>
    </Container>
  );
}
