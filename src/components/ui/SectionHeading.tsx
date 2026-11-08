import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 max-w-prose">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold text-paper-50 sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-relaxed text-paper-300">
          {children}
        </div>
      ) : null}
    </div>
  );
}
