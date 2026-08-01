import type { Post } from "../posts";

type Locale = "zh-CN" | "en";

const fallbackParagraphs = [2, 4, 7, 1, 5, 6, 0, 3];

function conciseExcerpt(paragraph: string, locale: Locale) {
  const separators = locale === "zh-CN" ? /[，。；：！？]/ : /[.!?;:]/;
  const minimumLength = locale === "zh-CN" ? 8 : 24;
  const clauses = paragraph
    .split(separators)
    .map((clause) => clause.trim())
    .filter(Boolean);
  const clause = clauses.find((candidate) => candidate.length >= minimumLength) ?? clauses[0] ?? paragraph;

  if (locale === "zh-CN") return clause.slice(0, 34);
  return clause.split(/\s+/).slice(0, 14).join(" ");
}

function resolveHighlights(post: Post, locale: Locale) {
  const requested = post.highlights?.slice(0, 3) ?? [];
  const usedParagraphs = new Set<number>();

  return requested.map((highlight, position) => {
    const exactParagraph = post.body.findIndex(
      (paragraph, index) => !usedParagraphs.has(index) && paragraph.includes(highlight),
    );

    if (exactParagraph >= 0) {
      usedParagraphs.add(exactParagraph);
      return highlight;
    }

    const fallbackParagraph = [fallbackParagraphs[position], ...fallbackParagraphs].find(
      (index) => index < post.body.length && !usedParagraphs.has(index),
    );
    if (fallbackParagraph === undefined) return highlight;

    usedParagraphs.add(fallbackParagraph);
    return conciseExcerpt(post.body[fallbackParagraph], locale);
  });
}

export function addSeriesVisual(post: Post, locale: Locale): Post {
  return {
    ...post,
    highlights: resolveHighlights(post, locale),
  };
}
