# tinylion1024.site

A bilingual personal site about product judgment, AI delivery, and growth validation.

Live site: [tinylion1024.site](https://tinylion1024.site/)

## Site map

- `/` and `/en/`: introduction, Start Here, and the four latest essays
- `/posts` and `/en/posts`: complete writing archive
- `/now` and `/en/now`: current focus
- `/projects` and `/en/projects`: public work and experiments
- `/uses` and `/en/uses`: the deliberately small toolset
- `/about` and `/en/about`: positioning, principles, and representative beliefs
- `/rss.xml` and `/en/rss.xml`: language-specific feeds

## Technology

- [Astro](https://astro.build/) static site generation
- TypeScript
- pnpm
- GitHub Pages via GitHub Actions
- System-local typography with no remote font request
- Static Open Graph image, article JSON-LD, RSS, sitemap, and robots

Chinese is the default site language. English pages live under `/en/`.

## Local development

    pnpm install
    pnpm dev

Open [http://localhost:3000](http://localhost:3000).

## Validation

    pnpm validate

The validation command runs Astro diagnostics and a production build, then checks bilingual post parity, internal links and assets, article metadata, discovery files, and remote font usage.

## Content

- Chinese posts: `src/data/posts.ts`
- English post adaptations: `src/data/posts.en.ts`
- Article illustrations and avatar: `public/`
- Content strategy: `docs/content-strategy.md`
- Publishing workflow: `docs/publishing.md`

Every new article ships in Chinese and English in the same atomic commit. Time-sensitive articles include a dated context and source links. English versions are rewritten for an international reader rather than translated line by line.

The four editorial tracks are AI Product, AI Building, Growth Validation, and Personal Thinking. Search stays intentionally absent until the archive reaches roughly 24 substantial posts.

## Deployment

Pushing to `main` runs the GitHub Pages workflow in `.github/workflows/deploy.yml`.

The custom domain is configured as `https://tinylion1024.site`. Site paths must remain root-relative (`base: "/"` in `astro.config.mjs`).

## Optional analytics

The production site makes no analytics request by default. To enable a self-hosted or privacy-friendly Umami instance, copy `.env.example` to `.env` and provide both public values.

## Change discipline

- Keep commits atomic and stage explicit files.
- Run `pnpm validate` before committing.
- Keep local agent configuration and Codex environment files out of Git.
- Push only as a deliberate release action so a batch of local commits triggers one GitHub Pages deployment.
