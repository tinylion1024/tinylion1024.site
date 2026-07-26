import type { APIRoute } from "astro";
import { posts } from "../data/posts";
import { postsEn } from "../data/posts.en";

const staticPages = ["", "about/", "now/", "posts/", "projects/", "uses/"];
const englishStaticPages = staticPages.map((path) => `en/${path}`);

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://tinylion1024.site");
  const urls = [
    ...staticPages,
    ...englishStaticPages,
    ...posts.map((post) => `posts/${post.slug}/`),
    ...postsEn.map((post) => `en/posts/${post.slug}/`),
  ];

  const entries = urls.map((path) => {
    const post = posts.find((candidate) => path === `posts/${candidate.slug}/`)
      ?? postsEn.find((candidate) => path === `en/posts/${candidate.slug}/`);
    const lastModified = post ? `<lastmod>${post.date.replaceAll(".", "-")}</lastmod>` : "";
    return `<url><loc>${new URL(`/${path}`, origin).href}</loc>${lastModified}</url>`;
  }).join("\n  ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
