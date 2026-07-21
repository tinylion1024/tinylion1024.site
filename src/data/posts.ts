export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  topic: "产品" | "增长" | "技术" | "思考";
  featured?: boolean;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "product-is-a-series-of-bets",
    title: "产品不是功能列表，而是一连串下注",
    summary: "每个优先级背后，都是一个关于用户、时机与资源的假设。关键是让它们可被验证。",
    date: "2026.07.12",
    readTime: "4 min",
    topic: "产品",
    featured: true,
    body: [
      "我们总能为一个功能列出很多理由，但真正需要被写下的，是它要改变哪个用户行为，以及失败时我们会从哪里知道。",
      "产品决策不是判断题。它更接近一组有限筹码下的下注：假设要够具体，投入要足够小，反馈要尽可能快。",
      "这会让路线图变得不那么漂亮，却让团队更接近真实世界。",
    ],
  },
  {
    slug: "growth-is-a-product-loop",
    title: "增长不是渠道清单，是产品回路",
    summary: "当获客、激活与留存彼此断开，投放只会放大漏斗里的裂缝。",
    date: "2026.06.26",
    readTime: "6 min",
    topic: "增长",
    body: [
      "增长最有意思的时刻，不是某个渠道的数字突然上涨，而是用户第一次自然地把产品带给下一个人。",
      "把注意力从流量转向行为，才有机会找到真正可复利的回路。",
    ],
  },
  {
    slug: "build-the-thinnest-useful-thing",
    title: "只构建最薄、但真正有用的那一层",
    summary: "技术上的克制不是少写代码，而是把复杂性留在确实需要它的地方。",
    date: "2026.06.05",
    readTime: "3 min",
    topic: "技术",
    body: [
      "一个系统的第一版应该回答一个完整的问题，而不是预支未来三年的可能性。",
    ],
  },
  {
    slug: "thinking-in-public-with-boundaries",
    title: "公开思考，但给结论留下边界",
    summary: "观点应该足够锋利，但也要承认它来自有限的样本和特定的时间。",
    date: "2026.05.18",
    readTime: "5 min",
    topic: "思考",
    body: [
      "写下尚未完成的想法，会迫使我区分事实、判断和愿望。这种区分比结论本身更有价值。",
    ],
  },
];

export const topicAccent: Record<Post["topic"], string> = {
  产品: "#0b63ce",
  增长: "#087f5b",
  技术: "#5b5bd6",
  思考: "#a64515",
};
