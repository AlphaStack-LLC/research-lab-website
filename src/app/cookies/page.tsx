import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie policy for the AlphaStack Research Lab website (lab.alpha-stack.ai).",
  alternates: { canonical: "/cookies/" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="November 7, 2026">
      <section>
        <h2>Summary</h2>
        <p>
          lab.alpha-stack.ai does not set cookies. The Site is a static
          website with no accounts, analytics, advertising, or tracking
          technologies, and it stores nothing in your browser beyond what
          your browser caches automatically for performance.
        </p>
      </section>

      <section>
        <h2>What we do not use</h2>
        <ul>
          <li>No first-party or third-party tracking cookies</li>
          <li>No analytics or fingerprinting scripts</li>
          <li>No advertising or retargeting pixels</li>
          <li>No localStorage/sessionStorage tracking identifiers</li>
        </ul>
      </section>

      <section>
        <h2>Hosting infrastructure</h2>
        <p>
          The Site is delivered through Amazon CloudFront and Amazon S3.
          These services process standard connection data in server logs
          (such as IP address and requested pages) to operate and secure
          content delivery; they do not set tracking cookies on our behalf.
          See our <a href="/privacy/">Privacy Policy</a> for details.
        </p>
      </section>

      <section>
        <h2>Managing cookies in your browser</h2>
        <p>
          Since we set no cookies, no action is required. If you wish to
          control cookies generally, every modern browser allows you to
          block or delete them in its privacy settings; doing so will not
          affect your ability to use this Site.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we ever introduce cookies or similar technologies (for
          example, privacy-respecting analytics), we will update this
          policy and its effective date before doing so. Questions:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
