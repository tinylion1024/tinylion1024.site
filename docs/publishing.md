# Publishing workflow

The website is the canonical source. Platform posts are adaptations that point back to it.

## 1. Develop the Chinese source essay

Start with a small brief:

- Working claim
- Intended reader
- Reader decision or behavior that should change
- First-hand evidence, data, or source material
- Counterargument or boundary
- One visual worth creating

Write the title, summary, body, highlights, sources, series, and one of the four editorial tracks in `src/data/posts.ts`.

The first version should be opinionated enough to disagree with and concrete enough to use.

## 2. Add visual evidence

Use a diagram, screenshot, comparison, or artifact only when it explains a relationship faster than prose.

- Store article assets under `public/articles/`.
- Use root-relative paths such as `/articles/example.png`.
- Provide a descriptive `alt`, placement paragraph, and caption.
- Check the real rendered page; a valid file path in source is not sufficient evidence.

## 3. Adapt the English edition

Add the matching entry in `src/data/posts.en.ts` in the same commit.

Keep the claim, evidence, and conclusion aligned, but rewrite:

- Cultural references that assume a Chinese platform context
- Long sentences and rhetorical repetition
- Product names or terminology that need an international explanation
- Titles that work in Chinese but become vague in English

Use the same slug when practical and set `translationOf`. Sources and visuals should remain equivalent unless the English reader needs a different reference.

## 4. Validate the site

Run:

    pnpm validate

Then inspect at least:

- Chinese and English homepages
- Both language versions of the new article
- Mobile width
- Dark mode
- Article images
- Language switch
- Series and previous/next navigation
- Open Graph title, description, image, and article date

Commit the Chinese article, English adaptation, and their assets as one atomic content change.

## 5. Adapt for distribution

Publish the website first. Then adapt from the canonical essay.

### WeChat

- Open with the tension, personal decision, or surprising conclusion.
- Keep section headings scannable.
- Retain one or two high-information visuals.
- End with one question or invitation to reply.
- Avoid copying the website navigation or metadata into the article.

### Juejin

- Lead with the engineering or workflow problem.
- Include implementation details, commands, diagrams, and failure cases.
- Add a short “when not to use this” section.
- Keep direct sources and link to the canonical site edition.

### LinkedIn

- One strong claim in the first two lines.
- Three supporting observations at most.
- One concrete practice the reader can try.
- Link to the English canonical article.

### X

- Use the claim as the first post.
- Turn the argument into five to eight self-contained steps.
- Prefer one diagram over repeated promotional copy.
- Close with the canonical English link.

Do not post identical copy everywhere. Preserve the idea, then fit the reading behavior of each platform.

## 6. Review after distribution

Record useful feedback, disagreement, and questions. Update the canonical essay only when the change improves accuracy or adds durable evidence; do not rewrite it to chase short-term platform engagement.

Update `/now` when the writing changes the active direction. Add a project entry only when there is a real artifact or measurable experiment to show.
