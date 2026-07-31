import type { Post } from "../posts";

type Locale = "zh-CN" | "en";

type SeriesVisual = {
  src: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

const seriesVisuals: Record<string, SeriesVisual> = {
  "models-and-reasoning": {
    src: "/articles/editorial/series-models-and-reasoning.webp",
    alt: {
      "zh-CN": "模型计算经过多条推理路径后收敛为可验证结果的抽象插画",
      en: "Abstract editorial illustration of model computation branching into reasoning paths and converging on a verifiable result",
    },
    caption: {
      "zh-CN": "模型能力不只来自参数规模，也来自推理时如何分配计算、搜索路径并验证答案。",
      en: "Model capability increasingly depends on how inference allocates compute, explores alternatives, and verifies an answer.",
    },
  },
  "agent-products-ux": {
    src: "/articles/editorial/series-agent-products-ux.webp",
    alt: {
      "zh-CN": "用户意图依次经过计划、权限、执行、观察和交付的抽象插画",
      en: "Abstract editorial illustration of user intent moving through planning, permission, action, observation, and delivery",
    },
    caption: {
      "zh-CN": "Agent 产品的核心不是更像人，而是把意图、权限、过程和结果组成一份可信的委派契约。",
      en: "The core of an agent product is not anthropomorphism, but a trustworthy delegation contract across intent, permission, process, and outcome.",
    },
  },
  "ai-software-engineering": {
    src: "/articles/editorial/series-ai-software-engineering.webp",
    alt: {
      "zh-CN": "多个 AI 执行分支经过仓库上下文、沙箱、测试和评审后形成稳定交付物的抽象插画",
      en: "Abstract editorial illustration of AI execution branches passing through repository context, sandboxes, tests, and review into a stable release",
    },
    caption: {
      "zh-CN": "当生成代码变便宜，工程价值会向上下文、环境、验证、评审和可逆交付迁移。",
      en: "As code generation gets cheaper, engineering value moves toward context, environments, verification, review, and reversible delivery.",
    },
  },
  "ai-business-growth": {
    src: "/articles/editorial/series-ai-business-growth.webp",
    alt: {
      "zh-CN": "多个漏斗经过产品价值循环后形成可持续增长飞轮的抽象插画",
      en: "Abstract editorial illustration of leaky funnels becoming a sustainable product-value flywheel",
    },
    caption: {
      "zh-CN": "模型能力带来注意力，产品机制把一次惊喜变成留存、收入和可持续毛利。",
      en: "Model capability earns attention; product mechanics convert a moment of surprise into retention, revenue, and sustainable margin.",
    },
  },
  "ai-and-society": {
    src: "/articles/editorial/series-ai-and-society.webp",
    alt: {
      "zh-CN": "AI 与教育、工作、法律、科学、媒体、基础设施和公共生活相互连接的抽象插画",
      en: "Abstract editorial illustration connecting AI with education, work, law, science, media, infrastructure, and civic life",
    },
    caption: {
      "zh-CN": "AI 的社会影响不是一条单线预测，而是技术能力与制度、组织和个人选择之间的联动。",
      en: "AI's social impact is not a single forecast, but an interaction among technical capability, institutions, organizations, and individual choice.",
    },
  },
};

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
  if (!post.seriesSlug) return post;
  const seriesVisual = seriesVisuals[post.seriesSlug];
  if (!seriesVisual) return post;

  return {
    ...post,
    highlights: resolveHighlights(post, locale),
    visuals: [
      {
        src: seriesVisual.src,
        alt: seriesVisual.alt[locale],
        afterParagraph: 1,
        caption: seriesVisual.caption[locale],
      },
      ...(post.visuals ?? []),
    ],
  };
}
