import type { APIRoute, GetStaticPaths } from "astro";

import { allPosts } from "../../../data/posts";

const WIDTH = 1672;
const HEIGHT = 941;

const palettes: Record<string, [string, string, string]> = {
  "models-and-reasoning": ["#7aa2ff", "#70d7c7", "#f2b84b"],
  "agent-products-ux": ["#8ab4ff", "#c58cff", "#70d7c7"],
  "ai-software-engineering": ["#70d7c7", "#7aa2ff", "#f2b84b"],
  "ai-business-growth": ["#f2b84b", "#ff8e72", "#7aa2ff"],
  "ai-and-society": ["#c58cff", "#f2b84b", "#70d7c7"],
};

function hash(value: string) {
  return [...value].reduce((total, character) => (total * 33 + character.charCodeAt(0)) >>> 0, 5381);
}

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}

function createDiagram(slug: string, title: string, seriesSlug = "models-and-reasoning") {
  const seed = hash(slug);
  const colors = palettes[seriesSlug] ?? palettes["models-and-reasoning"];
  const nodes = Array.from({ length: 8 }, (_, index) => {
    const angle = ((seed % 180) + index * 47) * (Math.PI / 180);
    const radiusX = 250 + ((seed >> (index % 8)) % 170);
    const radiusY = 155 + ((seed >> ((index + 3) % 8)) % 130);
    const x = Math.round(WIDTH / 2 + Math.cos(angle) * radiusX);
    const y = Math.round(HEIGHT / 2 + Math.sin(angle) * radiusY);
    const radius = 18 + ((seed >> ((index + 5) % 12)) % 24);
    return { x, y, radius, color: colors[index % colors.length] };
  });
  const connections = nodes.map((node, index) => {
    const next = nodes[(index + 1 + (seed % 3)) % nodes.length];
    return `<path d="M ${node.x} ${node.y} Q ${WIDTH / 2} ${HEIGHT / 2} ${next.x} ${next.y}" />`;
  }).join("");
  const circles = nodes.map((node) => `<circle cx="${node.x}" cy="${node.y}" r="${node.radius}" fill="${node.color}" />`).join("");
  const bars = Array.from({ length: 5 }, (_, index) => {
    const barWidth = 110 + ((seed >> (index * 2)) % 240);
    return `<rect x="${132 + index * 286}" y="${760 - index * 18}" width="${barWidth}" height="8" rx="4" fill="${colors[index % colors.length]}" opacity="${0.38 + index * 0.1}" />`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(title)}</title>
  <desc id="description">Editorial argument map</desc>
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="78%">
      <stop offset="0%" stop-color="#1b2b48" />
      <stop offset="62%" stop-color="#111d31" />
      <stop offset="100%" stop-color="#0a1220" />
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="18" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <g fill="none" stroke="#91a4c5" stroke-width="2" stroke-opacity="0.25">${connections}</g>
  <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="118" fill="#162744" stroke="${colors[0]}" stroke-width="3" stroke-opacity="0.85" />
  <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="57" fill="${colors[1]}" opacity="0.9" filter="url(#glow)" />
  <g opacity="0.9">${circles}</g>
  <g>${bars}</g>
  <rect x="42" y="42" width="${WIDTH - 84}" height="${HEIGHT - 84}" rx="30" fill="none" stroke="#91a4c5" stroke-opacity="0.18" />
</svg>`;
}

export const getStaticPaths: GetStaticPaths = () => allPosts
  .filter((post) => post.visuals?.some((visual) => visual.src === `/articles/editorial/${post.slug}.svg`))
  .map((post) => ({ params: { slug: post.slug }, props: { post } }));

export const GET: APIRoute = ({ props }) => {
  const post = props.post as (typeof allPosts)[number];
  return new Response(createDiagram(post.slug, post.title, post.seriesSlug), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
