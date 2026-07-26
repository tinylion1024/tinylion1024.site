# Project rules

## Git and deployment

- Keep commits atomic: one independently reviewable change per commit.
- Run the relevant checks before every commit. For site changes, run \`pnpm check\` and \`pnpm build\`.
- Never push or trigger GitHub Pages deployment unless the user explicitly confirms the push.
- Stage explicit file paths. Do not commit generated or local-only files such as \`dist/\`, \`node_modules/\`, or \`.codebase-memory/\`.

## Content

- Write in a direct, evidence-led voice about product, growth, technology, and personal thinking.
- For time-sensitive or externally sourced claims, include dated context and source links in the article.
- Keep article emphasis restrained: highlight only a small number of conclusion-bearing phrases, with at most one highlight per paragraph.
- When adding an English version, rewrite for an international reader instead of translating line by line.

## Site conventions

- Chinese is the default locale; English lives under \`/en/\`.
- Maintain canonical and \`hreflang\` metadata for pages that have matching translations.
- Build asset and internal URLs from Astro's \`BASE_URL\`; avoid hard-coded project-page prefixes.
- Reuse the existing pixel-lion avatar for the site icon unless the user requests a different brand asset.
