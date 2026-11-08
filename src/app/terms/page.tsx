import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the AlphaStack Research Lab website (lab.alpha-stack.ai).",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="November 7, 2026">
      <section>
        <h2>Acceptance</h2>
        <p>
          By accessing lab.alpha-stack.ai (the &ldquo;Site&rdquo;), you
          agree to these terms. The Site is operated by AlphaStack LLC, a
          California limited liability company, for its internal research
          division AlphaStack Research Lab.
        </p>
      </section>

      <section>
        <h2>Nature of the content</h2>
        <p>
          The Site describes ongoing and proposed research. Research
          content is provided for general information only:
        </p>
        <ul>
          <li>
            Project status labels (Proposed, Planning, In Progress,
            Validated, Completed) reflect the state of the work at the time
            of publication and may change without notice.
          </li>
          <li>
            Descriptions of planned capabilities are not commitments to
            deliver products or services, and nothing on the Site
            constitutes an offer, warranty, or representation of commercial
            availability.
          </li>
          <li>
            Nothing on the Site constitutes professional, legal, or
            investment advice.
          </li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          All content on the Site, including text, design, and graphics, is
          owned by AlphaStack LLC unless otherwise noted. You may view and
          share links to the Site; any other reproduction or redistribution
          requires our prior written permission.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the Site, including by attempting to
          disrupt its operation, accessing it through automated means that
          impose an unreasonable load, or misrepresenting its content.
        </p>
      </section>

      <section>
        <h2>Third-party links</h2>
        <p>
          The Site may link to third-party websites (including the
          AlphaStack LLC corporate website). We are not responsible for
          their content or policies.
        </p>
      </section>

      <section>
        <h2>Disclaimers and liability</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; without warranties of any
          kind. To the maximum extent permitted by law, AlphaStack LLC
          disclaims liability for any damages arising from use of or
          reliance on the Site.
        </p>
      </section>

      <section>
        <h2>Governing law and contact</h2>
        <p>
          These terms are governed by the laws of the State of California,
          without regard to conflict-of-law rules. Questions:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
