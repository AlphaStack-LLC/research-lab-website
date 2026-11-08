export const siteConfig = {
  name: "AlphaStack Research Lab",
  shortName: "AlphaStack Lab",
  url: "https://lab.alpha-stack.ai",
  description:
    "Applied research in distributed AI agents, persistent memory, reliable coordination, and trustworthy autonomous systems.",
  tagline: "Reliable. Verifiable. Autonomous.",
  contactEmail: "info@alpha-stack.ai",
  corporateSite: "https://alpha-stack.ai",
  legalLinks: [
    { label: "Privacy Policy", href: "https://alpha-stack.ai/privacy/" },
    { label: "Terms", href: "https://alpha-stack.ai/legal/" },
  ],
  footerStatement:
    "AlphaStack Research Lab is an internal research division of AlphaStack LLC, a California limited liability company.",
} as const;

export const navItems = [
  { label: "Research", href: "/research/" },
  { label: "Projects", href: "/projects/" },
  { label: "Publications", href: "/publications/" },
  { label: "Team", href: "/team/" },
  { label: "Collaborate", href: "/collaborate/" },
] as const;
