import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
        variant === "primary" &&
          "bg-accent-500 text-ink-950 hover:bg-accent-400",
        variant === "secondary" &&
          "border border-paper-400/40 text-paper-100 hover:border-accent-400 hover:text-accent-300",
        className,
      )}
    >
      {children}
    </Link>
  );
}
