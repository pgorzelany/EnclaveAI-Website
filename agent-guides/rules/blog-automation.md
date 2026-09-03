# Autonomous Blog Publishing Policy

This policy defines the bounded standing authorization for the scheduled Enclave AI blog automation. It supplements `blog-posts.md`; all rules in both files apply.

## Authorization and Scope

- The user authorizes the scheduled automation to research, write, validate, commit, and push at most one new Enclave AI blog post per eligible run without per-post approval.
- Work only in the `EnclaveAI-Website` repository, only on the `main` branch, and only add one new `_posts/YYYY-MM-DD-slug.md` file.
- Never modify existing posts, layouts, configuration, dependencies, assets, automation policies, or any other repository file.
- Never force-push, rewrite history, create or delete branches or tags, open pull requests, deploy through another service, or publish to social media.
- Never include secrets, personal data, private customer information, unpublished product plans, or confidential workspace material.

## Eligibility Gates

Publish no more than one post in any 13-day period. Skip the run if a newer post already satisfies that cadence.

Before researching or writing:

1. Confirm the repository has no uncommitted changes.
2. Confirm the current branch is `main`.
3. Fetch `origin` and update with a fast-forward-only pull. If the branch has diverged, authentication fails, or a merge would be required, stop without changing files.
4. Read the root and website `AGENTS.md` files, `blog-posts.md`, this policy, and the existing `_posts/` catalog.

## Research Standard

- Select a topic that is useful to Enclave AI's audience and does not duplicate an existing post or primary keyword.
- Maintain the intended mix of roughly 70% local/private AI and 30% broader AI with a natural privacy or on-device angle.
- Open and read the sources themselves. Search snippets and secondary summaries are not evidence.
- Use at least three credible sources, including at least two primary sources such as official documentation, release notes, model cards, repositories, research papers, standards bodies, regulators, or vendor announcements.
- Cross-check every material claim about dates, availability, capabilities, limitations, privacy, benchmarks, pricing, hardware, or regulation. Attribute single-source claims explicitly.
- Do not publish rumors, inferred release dates, fabricated quotations, unsupported statistics, or benchmark comparisons that were not run or documented by the cited source.
- Never claim hands-on testing unless the automation actually performed and recorded that testing during the run.
- Verify any statement about Enclave AI against current source code or official product documentation. If it cannot be verified, omit it.
- Link readers to the primary evidence with descriptive inline links and finish with a concise `## Sources` section.

## Editorial Quality Gate

The post must:

- Follow every requirement in `blog-posts.md`, including frontmatter, title, description, structure, keyword placement, internal linking, and topic diversity.
- Answer a real reader question, add original synthesis or practical guidance, and provide more value than a rewritten announcement.
- Clearly distinguish verified facts, source claims, and the author's analysis.
- Use natural English without keyword stuffing, hype, filler, fake urgency, or unsupported superlatives.
- Include accurate publication dates and never change a date merely to create artificial freshness.
- Receive a final adversarial fact-check in which each material claim is matched to supporting evidence.

If any research or editorial gate is uncertain, do not publish. A clean skip is a successful run.

## Technical Validation and Publishing

Before committing:

1. Confirm exactly one new Markdown file under `_posts/` is the only repository change.
2. Run `git diff --check` and the complete Jekyll production build.
3. Inspect the rendered post for valid frontmatter, working internal and external links, correct headings, and no broken markup.
4. Recheck that the title is under 60 characters and the description is 140-155 characters.

If every gate passes, commit only the new post with `Publish blog post: <title>` and push `main` to `origin` using a normal non-force push. If the push is rejected or authentication fails, stop and report it; never work around repository protection.

If validation fails before committing, delete only the draft file created during that run and leave the repository clean. Report the topic considered, sources checked, validation outcome, commit hash if published, and the exact reason for any skip or failure.
