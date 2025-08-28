import { ContentType, Tone, Length, Lang, mapLength, formatTask } from "./templates";

export function buildSystemPrompt(type: ContentType) {
  return [
    "You are an elite marketing copywriter and editor.",
    `Task: ${formatTask(type)} with crystal clarity, concrete value props, and clean structure.`,
    "Avoid hallucinations. Never invent facts.",
    "Use clear subheads for blogs; bullet points for ads; 1-3 variants for captions.",
  ].join("\n");
}

export type BuildUserPromptArgs = {
  topic: string;
  type: ContentType;
  tone: Tone;
  length: Length;
  language: Lang;
  extras?: string;
};

export function buildUserPrompt(a: BuildUserPromptArgs) {
  const len = mapLength(a.length);
  const guard = "If you’re unsure, ask for specifics via a clarifying line at the end.";

  return [
    `Language: ${a.language}.`,
    `Content Type: ${a.type}.`,
    `Tone: ${a.tone}.`,
    `Target Length: ${len}.`,
    `Topic / Brief: ${a.topic}`,
    a.extras ? `Extra Constraints: ${a.extras}` : "",
    guard,
    "Formatting:",
    a.type === "blog"
      ? "- Start with a hook intro. Use H2/H3 subheads. Add a concise conclusion."
      : a.type === "ad"
      ? "- Provide 3 variants: (1) Direct response (2) Benefit-led (3) Social proof. Include CTA."
      : "- Provide 3 caption options. Suggest 3 relevant hashtags for each.",
  ]
    .filter(Boolean)
    .join("\n");
}