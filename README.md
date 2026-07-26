# tinylion1024.site

Personal blog for product, growth, technology, and work-in-progress thinking.

Live site: [tinylion1024.site](https://tinylion1024.site/)

## Stack

- [Astro](https://astro.build/) static site generation
- TypeScript
- pnpm
- GitHub Pages via GitHub Actions

Chinese is the default site language. English pages live under `/en/`.

## Local development

    pnpm install
    pnpm dev

Open [http://localhost:3000](http://localhost:3000).

## Validation

    pnpm check
    pnpm build

## Content

- Chinese posts: `src/data/posts.ts`
- English post adaptations: `src/data/posts.en.ts`
- Article illustrations and avatar: `public/`

New time-sensitive articles should include a dated context and source links. English versions should be rewritten for an international reader, not translated line by line.

## Deployment

Pushing to `main` runs the GitHub Pages workflow in `.github/workflows/deploy.yml`.

The custom domain is configured as `https://tinylion1024.site`. Site paths must remain root-relative (`base: "/"` in `astro.config.mjs`).

## Contribution rules

See [AGENTS.md](./AGENTS.md) for project-specific Codex rules, including atomic commits and the explicit-confirmation requirement before pushing.
