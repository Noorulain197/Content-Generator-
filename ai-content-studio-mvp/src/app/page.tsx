"use client";
import Controls from "../components/Controls";
import Output from "../components/Output";

export default function Page() {
  const out = Output();
  return (
  <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
    {/* Header */}
    <header className="flex items-center justify-between border-b border-gray-200 pb-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        AI Content Studio
      </h1>
      {/* Optional Docs link */}
      {/* <a
        className="text-sm font-medium text-gray-500 hover:text-black transition"
        href="https://platform.openai.com/"
        target="_blank"
      >
        Docs
      </a> */}
    </header>

    {/* Controls Section */}
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <Controls onGenerate={out.generate} />
    </section>

    {/* Output Section */}
    {out.View && (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {out.View}
      </section>
    )}

    {/* Footer */}
    <footer className="text-xs text-gray-500 border-t border-gray-200 pt-6 text-center">
      Built with <span className="font-semibold">Next.js</span> +{" "}
      <span className="font-semibold">OpenAI</span>. Don’t paste secrets — content may
      need a human touch ✍️
    </footer>
  </main>
);

}