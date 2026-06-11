"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";

const docsSections = [
  { title: "Quickstart", href: "/docs", desc: "Get Trelo running in under 3 minutes. Install, proxy, basic config." },
  { title: "API Reference", href: "/docs", desc: "Complete REST API docs. Endpoints, schemas, error codes." },
  { title: "SDK Guides", href: "/docs", desc: "LangChain, CrewAI, OpenAI SDK, and custom framework integrations." },
  { title: "Configuration", href: "/docs", desc: "Env vars, config files, per-layer settings for all 8 protection layers." },
  { title: "Deployment", href: "/docs", desc: "Docker, Kubernetes, AWS, and self-hosted options." },
  { title: "Monitoring", href: "/docs", desc: "Dashboard, metrics, alerts, log export. Understand what Trelo is doing." },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-trelo-text" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-8 inline-block">← Back to Trelo</Link>
        <h1 className="text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] mb-4">Documentation</h1>
        <p className="text-gray-400 font-light mb-16 leading-relaxed">Everything you need to integrate, configure, and operate Trelo.</p>

        <div className="space-y-4 mb-20">
          {docsSections.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              className="block p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-trelo-text group-hover:text-blue-600 transition-colors mb-1">{doc.title}</h2>
                  <p className="text-sm text-gray-400 font-light">{doc.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-light text-trelo-text mb-3">Need help?</h2>
          <p className="text-sm text-gray-400 font-light mb-2">
            Join our{" "}
            <a href="https://discord.gg/UTXTN5krm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Discord community
            </a>{" "}
            for real-time support.
          </p>
          <p className="text-sm text-gray-400 font-light">
            Or email{" "}
            <a href="mailto:hello@trelo.cc" className="text-blue-600 hover:underline">hello@trelo.cc</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
