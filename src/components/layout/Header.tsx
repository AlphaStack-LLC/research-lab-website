"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, siteConfig } from "@/lib/site";

function isActive(pathname: string, href: string): boolean {
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/50 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-paper-50"
          onClick={() => setMenuOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves assets unoptimized */}
          <img
            src="/images/alphastack_logo.png"
            alt=""
            width={382}
            height={288}
            className="h-8 w-auto"
          />
          <span className="text-sm font-semibold tracking-wide">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={clsx(
                    "text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "text-accent-300"
                      : "text-paper-300 hover:text-paper-50",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-paper-200 hover:bg-ink-800 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-ink-700/50 md:hidden"
        >
          <ul className="space-y-1 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    isActive(pathname, item.href)
                      ? "bg-ink-800 text-accent-300"
                      : "text-paper-200 hover:bg-ink-800 hover:text-paper-50",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
