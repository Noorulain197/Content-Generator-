"use client";
import { useEffect, useMemo, useState } from "react";
import { contentExamples } from "../lib/templates";


export type FormState = {
  type: "blog" | "ad" | "caption";
  tone: "Neutral" | "Friendly" | "Professional" | "Bold" | "Playful";
  length: "Short" | "Medium" | "Long";
  language: "English" | "Urdu" | "Hindi";
  topic: string;
  extras?: string;
};

interface ControlsProps {
  onGenerate: (f: FormState) => Promise<void>;
}

export default function Controls({ onGenerate }: ControlsProps) {
  const [form, setForm] = useState<FormState>({
    type: "blog",
    tone: "Friendly",
    length: "Medium",
    language: "English",
    topic: "The ultimate guide to web performance in 2025",
    extras: "Add a short CTA at the end.",
  });

  // Agar type change ho to naya placeholder set ho
  const placeholders = useMemo(() => contentExamples[form.type], [form.type]);

  useEffect(() => {
    if (!form.topic) {
      setForm((f) => ({ ...f, topic: placeholders[0] }));
    }
  }, [form.type, placeholders]);

  return (
  <div className="grid gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
  {/* Form Controls */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Type */}
    <select
      className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.type}
      onChange={(e) => setForm({ ...form, type: e.target.value as FormState["type"] })}
    >
      <option value="blog">Blog</option>
      <option value="ad">Ad Copy</option>
      <option value="caption">Social Caption</option>
    </select>

    {/* Tone */}
    <select
      className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.tone}
      onChange={(e) => setForm({ ...form, tone: e.target.value as FormState["tone"] })}
    >
      {(["Neutral", "Friendly", "Professional", "Bold", "Playful"] as const).map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>

    {/* Length */}
    <select
      className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.length}
      onChange={(e) => setForm({ ...form, length: e.target.value as FormState["length"] })}
    >
      {(["Short", "Medium", "Long"] as const).map((l) => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>

    {/* Language */}
    <select
      className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.language}
      onChange={(e) => setForm({ ...form, language: e.target.value as FormState["language"] })}
    >
      {(["English", "Urdu", "Hindi"] as const).map((l) => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>
  </div>

  {/* Topic */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-800 ">Topic / Brief</label>
    <input
      type="text"
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.topic}
      placeholder={placeholders[0]}
      onChange={(e) => setForm({ ...form, topic: e.target.value })}
    />
  </div>

  {/* Extras */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-800">Extras (optional)</label>
    <input
      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
      value={form.extras || ""}
      placeholder="Audience, product, CTA, keywords…"
      onChange={(e) => setForm({ ...form, extras: e.target.value })}
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 pt-3">
    <button
      onClick={() => onGenerate(form)}
      className="px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-md hover:bg-indigo-700 transition"
    >
      Generate ✨
    </button>
    <button
      onClick={() =>
        setForm((f) => ({
          ...f,
          topic: placeholders[Math.floor(Math.random() * placeholders.length)],
        }))
      }
      className="px-6 py-3 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
    >
      Shuffle Example 🔀
    </button>
  </div>
</div>

  );
}
