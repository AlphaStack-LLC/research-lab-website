import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { getTeamMembers } from "@/lib/content/team";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind AlphaStack Research Lab, an internal research division of AlphaStack LLC.",
  alternates: { canonical: "/team/" },
  openGraph: {
    title: "Team — AlphaStack Research Lab",
    description:
      "The people behind AlphaStack Research Lab, an internal research division of AlphaStack LLC.",
    url: "/team/",
  },
};

export default function TeamPage() {
  const members = getTeamMembers();

  return (
    <Container className="py-16">
      <header className="max-w-prose">
        <h1 className="font-serif text-4xl font-semibold text-paper-50">
          Team
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-paper-300">
          AlphaStack Research Lab operates as a founder-led research group
          within AlphaStack LLC. Only verified personnel are listed here;
          profiles are added as team members join and confirm their public
          information.
        </p>
      </header>

      {members.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {members.map((member) => (
            <li key={member.slug}>
              <Card className="h-full">
                <h2 className="text-xl font-semibold text-paper-50">
                  {member.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-accent-400">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper-300">
                  {member.background}
                </p>
                {member.researchInterests.length > 0 ? (
                  <p className="mt-3 text-sm text-paper-300">
                    <span className="font-semibold text-paper-100">
                      Research interests:{" "}
                    </span>
                    {member.researchInterests.join(", ")}
                  </p>
                ) : null}
                {member.profiles.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-4 text-sm">
                    {member.profiles.map((profile) => (
                      <li key={profile.url}>
                        <a
                          href={profile.url}
                          className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
                        >
                          {profile.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {member.body ? <Prose className="mt-4">{member.body}</Prose> : null}
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 rounded-lg border border-ink-700/60 bg-ink-900/60 p-6">
          <p className="text-paper-300">
            Public team profiles have not been published yet. For inquiries
            about the research team, contact{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      )}
    </Container>
  );
}
