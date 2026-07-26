import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const failures = [];

const fail = (message) => failures.push(message);
const directories = (path) => readdirSync(path)
  .filter((name) => statSync(join(path, name)).isDirectory())
  .sort();

const filesUnder = (path) => readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
  const fullPath = join(path, entry.name);
  return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
});

const routeTarget = (urlPath) => {
  const cleanPath = decodeURI(urlPath.split(/[?#]/, 1)[0]).replace(/^\/+/, "");
  if (!cleanPath) return join(dist, "index.html");
  if (extname(cleanPath)) return join(dist, cleanPath);
  return join(dist, cleanPath, "index.html");
};

if (!existsSync(dist)) {
  fail("dist/ is missing; run the build before validation.");
} else {
  const chinesePosts = directories(join(dist, "posts"));
  const englishPosts = directories(join(dist, "en", "posts"));
  const missingEnglish = chinesePosts.filter((slug) => !englishPosts.includes(slug));
  const missingChinese = englishPosts.filter((slug) => !chinesePosts.includes(slug));

  if (missingEnglish.length) fail(`Missing English posts: ${missingEnglish.join(", ")}`);
  if (missingChinese.length) fail(`Missing Chinese posts: ${missingChinese.join(", ")}`);

  const htmlFiles = filesUnder(dist).filter((path) => path.endsWith(".html"));
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const relative = file.slice(dist.length + 1);

    if (/fonts\.(googleapis|gstatic)\.com/.test(html)) {
      fail(`${relative}: remote Google font request found.`);
    }

    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      const target = routeTarget(url);
      if (!existsSync(target)) fail(`${relative}: broken internal path ${url}`);
    }

    const segments = relative.split("/");
    const postsIndex = segments.lastIndexOf("posts");
    const isArticlePage = postsIndex >= 0
      && segments.length === postsIndex + 3
      && segments.at(-1) === "index.html";

    if (isArticlePage) {
      const requiredMetadata = [
        'rel="canonical"',
        'property="og:image"',
        'property="article:published_time"',
        'type="application/ld+json"',
      ];
      for (const marker of requiredMetadata) {
        if (!html.includes(marker)) fail(`${relative}: missing ${marker}`);
      }
    }
  }

  for (const requiredFile of ["rss.xml", "en/rss.xml", "sitemap.xml", "robots.txt", "og/default.png"]) {
    if (!existsSync(join(dist, requiredFile))) fail(`Missing generated file: ${requiredFile}`);
  }
}

if (failures.length) {
  console.error(`Build validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Build validation passed:");
console.log("- Chinese and English post routes are paired");
console.log("- Internal assets and routes resolve");
console.log("- Article discovery metadata is present");
console.log("- RSS, sitemap, robots, and social card are generated");
console.log("- No remote Google font requests remain");
