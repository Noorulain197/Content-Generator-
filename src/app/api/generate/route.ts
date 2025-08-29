import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { buildSystemPrompt, buildUserPrompt } from "../../../lib/prompts";
import { limit } from "../../../lib/rateLimit";

// ✅ Zod validation schema
const Body = z.object({
  type: z.enum(["blog", "ad", "caption"]),
  tone: z.enum(["Neutral", "Friendly", "Professional", "Bold", "Playful"]),
  length: z.enum(["Short", "Medium", "Long"]),
  language: z.enum(["English", "Urdu", "Hindi"]).default("English"),
  topic: z.string().min(3).max(500),
  extras: z.string().max(500).optional(),
});

// ✅ Initialize OpenAI client (only API key, no mixing with other env vars)


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // yahi pe rakho
});


export async function POST(req: NextRequest) {
  try {
    // ✅ Rate limiting by IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const allowed = await limit(ip);
    if (!allowed.ok) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again soon." },
        { status: 429 }
      );
    }

    // ✅ Validate body with Zod
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { type, tone, length, language, topic, extras } = parsed.data;

    // ✅ Build prompts
    const system = buildSystemPrompt(type);
    const user = buildUserPrompt({ type, tone, length, language, topic, extras });

    // ✅ Call OpenAI safely
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = resp.choices?.[0]?.message?.content?.trim();
    if (!text) {
      throw new Error("No content returned from OpenAI");
    }

    return NextResponse.json({ ok: true, text });
  } catch (err: any) {
    console.error("❌ API Error:", err);
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unknown server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
