"use client";
import { useEffect, useState } from "react";

export default function Output() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("acs_history") || "[]");
    setHistory(h);
  }, []);

  async function generate(payload: any) {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setText(data.text);
      const next = [data.text, ...history].slice(0, 20);
      setHistory(next);
      localStorage.setItem("acs_history", JSON.stringify(next));
    } catch (e: any) {
      setText(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(text);
  }

  return {
  View: (
    <div className="grid gap-6">
      {/* Output Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Output</h2>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="px-3 py-1.5 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
            >
              Copy
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap text-sm leading-6 min-h-[160px] text-gray-700 bg-gray-50 rounded-xl p-4 border">
          {loading ? "Generating… ⏳" : text || "Your content will appear here."}
        </pre>
      </div>

      {/* History Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">History</h3>
        {history.length > 0 ? (
          <ul className="space-y-3">
            {history.map((h, i) => (
              <li
                key={i}
                className="p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer line-clamp-4"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No history yet. Generated content will be saved here.</p>
        )}
      </div>
    </div>
  ),
  generate,
};

}