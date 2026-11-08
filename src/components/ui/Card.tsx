import clsx from "clsx";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-ink-700/60 bg-ink-900/60 p-6 transition-colors hover:border-accent-500/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
