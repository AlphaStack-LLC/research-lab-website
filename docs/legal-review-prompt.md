# AI Legal Review Prompt

Paste the prompt below into Gemini (or another model), followed by the full
text of `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, and
`src/app/cookies/page.tsx` (rendered text is fine).

---

You are a legal-compliance reviewer for a US (California LLC) public
research website. Context:

- The site is a fully static informational site: no accounts, no contact
  forms, no analytics, no advertising, no cookies, no tracking.
- Hosting: AWS S3 + CloudFront (us-east-1) with standard server logs only.
- The only personal data channel is a published contact email address.
- The operator is AlphaStack LLC, a California limited liability company;
  "AlphaStack Research Lab" is an internal division, not a legal entity.
- The site describes proposed/ongoing research and must not imply
  commercial availability of unbuilt offerings.

Review the attached Privacy Policy, Terms of Use, and Cookie Policy for:

1. Accuracy — any claim that does not match the context above.
2. Missing clauses a US informational website should have (CCPA/CPRA,
   COPPA, data retention, dispute resolution, changes-to-terms).
3. Overreach — any clause that creates obligations the operator cannot
   meet.
4. Internal consistency across the three documents.

For each finding, cite the exact sentence, rate severity (blocker /
recommended / optional), and propose replacement wording. Do not invent
facts about the business.
---

Last reviewed in-repo: November 7, 2026 (AI review; not a substitute for
licensed legal counsel).
