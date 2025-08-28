export type ContentType = "blog" | "ad" | "caption";
export type Tone = "Neutral" | "Friendly" | "Professional" | "Bold" | "Playful";
export type Length = "Short" | "Medium" | "Long";
export type Lang = "English" | "Urdu" | "Hindi";

export const contentExamples: Record<ContentType, string[]> = {
  blog: [
    "How to start a side hustle as a student",
    "The ultimate guide to web performance in 2025",
    "Top 7 mistakes new freelancers make",
  ],
  ad: [
    "Promote a Figma UI kit for designers",
    "Launch sale for a minimalist backpack brand",
    "Growth service for indie SaaS founders",
  ],
  caption: [
    "Sunset beach vlog teaser",
    "New cafe opening in Karachi",
    "Before/after fitness transformation",
  ],
};

export function mapLength(length: Length) {
  switch (length) {
    case "Short":
      return "~60–90 words (or < 200 chars for captions)";
    case "Medium":
      return "~150–250 words";
    case "Long":
      return "~600–900 words";
  }
}

export function formatTask(type: ContentType) {
  if (type === "blog") return "Write a blog section or full draft";
  if (type === "ad") return "Write compelling ad copy variants";
  return "Write punchy social media captions";
}