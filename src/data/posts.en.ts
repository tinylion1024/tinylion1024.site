import type { Post } from "./posts";

export const postsEn: Post[] = [
  {
    slug: "goodbye-superpowers-selective-ai-coding-workflows",
    translationOf: "goodbye-superpowers-selective-ai-coding-workflows",
    title: "Goodbye, Superpowers: I Removed the Always-on Ceremony, Not Skills",
    summary: "Superpowers is not obsolete. But treating heavyweight process as the default for every task is becoming a bottleneck. The better model is Selective Powers: choose process by risk.",
    date: "2026.07.25",
    readTime: "8 min",
    topic: "Technology",
    visuals: [{ src: "/articles/selective-powers-workflow.png", alt: "A contrast between a dense always-on workflow and a modular risk-based workflow", afterParagraph: 5, caption: "The goal is not less process. It is process whose weight matches the risk." }],
    body: [
      "I recently removed Superpowers from my default workflow. Not because it is bad—quite the opposite. It made a powerful point early in the AI coding era: agents are capable, but they are also impulsive. Without guardrails, they start before understanding the task and declare success before running anything.",
      "Its answer is a full engineering loop: clarify, plan, isolate work, test, review, and verify. For an earlier generation of agents, that was an excellent safety rail. It helped move AI-assisted coding from “it can produce code” to “it can participate in delivery.”",
      "What I no longer believe is that every task should pay the same process tax. Renaming a variable, adjusting an eight-pixel gap, or removing an unused import has a better path: locate the change, make the smallest edit, run the relevant check, inspect the diff, finish.",
      "When such work has to pass through brainstorming, a spec, a plan, TDD, and a review, rigor becomes theatre. The process is not wrong; the fit is wrong. Ten seconds of change can become five minutes spent demonstrating that we are being careful.",
      "The hidden cost is context. Every permanent instruction, plan template, and subagent briefing competes with the code, error message, and user request that matter now. More rules do not automatically produce more judgment. Sometimes they make the agent optimize for compliance instead of the actual problem.",
      "That is why I am not saying goodbye to Superpowers. I am saying goodbye to the idea of an always-on, one-size-fits-all ceremony. Skills should be a toolbox, not an operating system.",
      "My replacement is simple: low-risk, reversible work gets a direct change and verification. Clear but cross-module work gets a short plan. Security, payments, permissions, migrations, and architectural changes earn the full treatment—research, isolated work, tests, review, and explicit acceptance criteria.",
      "I call this Selective Powers. Keep a small project contract always available: how to run the project, what must not change, and how to validate. Then load the heavy skill only when the task’s blast radius demands it. Stronger models do not mean we should run without process; they mean process itself must become selective."
    ],
    highlights: ["every task should pay the same process tax", "rigor becomes theatre", "Skills should be a toolbox, not an operating system", "Selective Powers"],
  },
  {
    slug: "what-i-learned-from-pete-ai-coding-workflow",
    translationOf: "what-i-learned-from-pete-ai-coding-workflow",
    title: "What Pete's AI Coding Workflow Taught Me: It Is Not About More Agents",
    summary: "The leverage is not prompt length or agent count. It is designing tasks, context, verification, and commits as one delivery system that keeps converging.",
    date: "2026.07.25",
    readTime: "9 min",
    topic: "Technology",
    visuals: [
      { src: "/articles/ai-coding-blast-radius.png", alt: "A comparison between small local changes and large cross-module changes", afterParagraph: 3, caption: "The clearer the blast radius, the easier it is to choose a safe execution mode." },
      { src: "/articles/ai-coding-context-interface.png", alt: "Documentation, source code, and verification acting as an interface for an agent", afterParagraph: 5, caption: "Project documentation is a reusable context interface, not an afterthought." },
      { src: "/articles/ai-coding-delivery-loop.png", alt: "A delivery loop of task, change, verification, commit, and human intervention", afterParagraph: 7, caption: "Automation is not absence of control; it is timely human control." },
    ],
    body: [
      "AI coding is often framed as faster typing: write a detailed prompt, let the model finish, and add more agents when the backlog grows. Pete’s workflow points somewhere more useful. The real advantage is not making a model do more at once; it is turning development into a system that can be observed, interrupted, and verified.",
      "The first move is to turn a request into a testable hypothesis. “Improve onboarding” is vague. A useful task says which user behavior should change, which surfaces can move, which data is off limits, and what evidence will count as done. This is not bureaucracy. It is a way to prevent an agent from being highly productive in the wrong direction.",
      "I now estimate a task’s blast radius before deciding how to run it. A small, local, reversible change can go straight to one agent. A change that touches several states, user paths, or unknown dependencies starts with read-only exploration and options. Parallelism is valuable when it advances independent bets, not when it multiplies uncertainty.",
      "This also makes multi-agent work less mysterious. The thing to manage is not agent count but write conflicts. One agent can improve tests while another documents a module; two agents rewriting the same data flow merely outsource merge and review cost back to you. Split work by module, files, and user paths before you parallelize.",
      "The second move is to treat context as an interface, not a chat transcript. A durable repository records its constraints, decisions, run commands, and acceptance checks where the next task can find them. When the project has this shape, prompts can be shorter because they only need to describe what is unique about this change.",
      "The third move is to verify after generation instead of trusting confidence during generation. Build output, type checks, tests, and a real UI screenshot are stronger evidence than a fluent explanation. The loop is straightforward: state the task, inspect the diff, run the smallest meaningful check, read the failure, and ask the agent to correct it.",
      "Atomic commits make this speed controllable. Each commit should represent one intention and only the files that served it. That makes experiments safer, reviews clearer, and rollbacks cheap. AI increases write speed; version control is what limits the blast radius.",
      "The durable lesson is not a particular CLI or a terminal layout. It is to design AI coding as a production system: tasks and context are inputs, bounded parallelism is the process, runtime evidence is the output, and version control preserves the right to change your mind. Models will improve. This discipline will still decide whether improvement becomes reliable delivery."
    ],
    highlights: ["a testable hypothesis", "blast radius", "context as an interface", "verify after generation", "Atomic commits"],
  },
];
