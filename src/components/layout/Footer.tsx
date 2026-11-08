import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-ink-700/50 bg-ink-900/40">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-paper-50">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-300">
              {siteConfig.footerStatement}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold text-paper-50">Site</p>
            <ul className="mt-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper-300 hover:text-accent-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-paper-50">Contact</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-sm text-paper-300 hover:text-accent-300"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              {siteConfig.legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper-300 hover:text-accent-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-ink-700/50 pt-6 text-xs text-paper-400">
          &copy; {new Date().getFullYear()} AlphaStack LLC. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
