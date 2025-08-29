"use client";
import { useState } from "react";
import Controls from "../components/Controls";
import Output from "../components/Output";

export default function Page() {
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate(payload: any) {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed");

      setOutput(data.text || "⚠️ No response text");
      const next = [data.text, ...history].slice(0, 20);
      setHistory(next);
      localStorage.setItem("acs_history", JSON.stringify(next));
    } catch (e: any) {
      setOutput(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          AI Content Studio
        </h1>
      </header>

      {/* Controls Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <Controls onGenerate={handleGenerate} />
      </section>

      {/* Output Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <Output content={output} history={history} loading={loading} />
      </section>
    </main>
  );
}
