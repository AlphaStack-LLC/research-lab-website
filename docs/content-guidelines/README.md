# Content Guidelines

These rules protect the Lab's scientific credibility. The build enforces
schemas; editors enforce the claims policy.

## Content locations

| Collection      | Directory               | Rendered at                   |
| --------------- | ----------------------- | ----------------------------- |
| Research areas  | `content/research/`     | `/research/`                  |
| Projects        | `content/projects/`     | `/projects/`, `/projects/[slug]/` |
| Publications    | `content/publications/` | `/publications/`              |
| Team            | `content/team/`         | `/team/`                      |

Empty collections render an honest "nothing published yet" state.

## Project frontmatter schema

```yaml
---
slug: my-project                      # required, unique, kebab-case
title: Project Title                  # required
summary: One-paragraph summary.       # required
researchArea: persistent-context-and-memory  # required, must be one of the
                                      # four research-area slugs
status: Proposed                      # required; one of:
                                      #   Proposed | Planning | In Progress
                                      #   | Validated | Completed
startDate: "2026-11"                  # optional
technicalObjectives:                  # required, list
  - Objective one
methodology: How the work will be done.       # required
evaluationMetrics:                    # required, list
  - Metric one
results: Only present when verified.  # optional — see claims policy
relatedPublications: []               # optional, publication slugs
repositoryUrl: https://github.com/... # optional, public repos only
ipDisclosureStatus: Statement of IP status.   # required
---
```

An unknown `status` or `researchArea` fails the build.

## Claims policy

1. **Never fabricate.** No invented publications, results, funding,
   patents, affiliations, collaborators, or testimonials. If it did not
   happen, it does not go on the site.
2. **Label the stage of everything.** Distinguish research hypothesis,
   planned experiment, experiment in progress, verified result, and
   commercially available technology. Project `status` must reflect
   reality; `results` may only be added when verified.
3. **No confidential material.** No unpublished patent-sensitive content,
   proprietary algorithms, private datasets, credentials, or internal
   proposals. Those live in separate private repositories.
4. **Team page lists verified personnel only** — real names, roles, and
   links the person has confirmed.
5. **The Lab is not a separate legal entity** and has no independent
   funding. Refer to it as an internal research division of AlphaStack LLC.

## Style

- English first, concise, technically specific. Avoid generic AI marketing
  language.
- Prefer "we propose / we are investigating / we measured" over
  "revolutionary / cutting-edge / seamless".
