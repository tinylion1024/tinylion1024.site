import type { APIRoute } from "astro";
import { posts } from "../data/posts";

const escapeXml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const publishedAt = (date: string) =>
  new Date(`${date.replaceAll(".", "-")}T00:00:00+08:00`).toUTCString();

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://tinylion1024.site");
  const feedUrl = new URL("/rss.xml", origin);
  const items = posts.map((post) => {
    const url = new URL(`/posts/${post.slug}/`, origin);
    return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url.href}</link>
      <guid isPermaLink="true">${url.href}</guid>
      <pubDate>${publishedAt(post.date)}</pubDate>
      <category>${escapeXml(post.topic)}</category>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>tinylion1024</title>
    <link>${origin.href}</link>
    <description>AI 时代的极简产品实践：用 AI 构建产品，用真实增长验证判断。</description>
    <language>zh-CN</language>
    <atom:link href="${feedUrl.href}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
