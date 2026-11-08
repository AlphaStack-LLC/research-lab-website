import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the AlphaStack Research Lab website (lab.alpha-stack.ai).",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="November 7, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          This policy applies to lab.alpha-stack.ai, the public research
          website of AlphaStack Research Lab, an internal research division
          of AlphaStack LLC, a California limited liability company
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;). The main corporate website,{" "}
          <a href={siteConfig.corporateSite}>alpha-stack.ai</a>, is governed
          by its own privacy policy.
        </p>
      </section>

      <section>
        <h2>What this site collects</h2>
        <p>
          This is a static informational website. It has no accounts, no
          contact forms, no analytics, no advertising, and no tracking
          scripts. We do not collect personal information through this site.
        </p>
      </section>

      <section>
        <h2>Hosting logs</h2>
        <p>
          The site is served by Amazon Web Services (Amazon S3 and Amazon
          CloudFront). As with most websites, our hosting provider processes
          standard technical connection data (such as IP address, browser
          type, and requested pages) in server logs to deliver and secure
          the service. We do not use these logs to identify or profile
          individual visitors.
        </p>
      </section>

      <section>
        <h2>Email correspondence</h2>
        <p>
          If you contact us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          , we receive and retain the information you send (your email
          address, name if provided, and message content) to respond to your
          inquiry and manage the resulting business relationship. We retain
          correspondence only as long as needed for these purposes, after
          which it is deleted. We do not sell or share this information with
          third parties for marketing.
        </p>
      </section>

      <section>
        <h2>Where data is processed</h2>
        <p>
          This site is hosted on Amazon Web Services infrastructure in the
          United States. If you access the site from outside the United
          States, you understand that any information you provide (such as
          by emailing us) will be processed in the United States.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          This site is directed at business and research audiences and is
          not intended for children under 13. We do not knowingly collect
          personal information from children.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          This site does not set cookies. See our{" "}
          <a href="/cookies/">Cookie Policy</a> for details.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on your jurisdiction (including California under the
          CCPA/CPRA), you may have rights to access, correct, or delete
          personal information we hold about you. Because this site collects
          no personal information, any such request will typically concern
          email correspondence only. Contact us at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>{" "}
          to exercise these rights.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          If we add features that change how data is handled (for example,
          analytics or a contact form), we will update this policy and its
          effective date before those features launch.
        </p>
      </section>
    </LegalPage>
  );
}
