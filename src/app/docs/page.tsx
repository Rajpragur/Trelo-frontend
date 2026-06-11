"use client";

import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-xs text-gray-500 hover:text-blue-400 transition-colors mb-8 inline-block">← Back to Trelo</Link>
        <h1 className="text-4xl font-light text-white tracking-[-0.03em] mb-4">Documentation</h1>
        <p className="text-gray-400 mb-16 leading-relaxed">Everything you need to integrate, configure, and operate Trelo.</p>

        <div className="space-y-6 mb-20">
          {[
            { title: "Quickstart", desc: "Get Trelo running in under 3 minutes. Installation, first proxy, basic configuration." },
            { title: "API Reference", desc: "Complete REST API documentation. Endpoints, request/response schemas, error codes." },
            { title: "SDK Guides", desc: "Integration guides for LangChain, CrewAI, OpenAI SDK, and custom frameworks." },
            { title: "Configuration", desc: "Environment variables, config files, and per-layer settings for all 8 protection layers." },
            { title: "Deployment", desc: "Deploy to production: Docker, Kubernetes, AWS, and self-hosted options." },
            { title: "Monitoring", desc: "Dashboard, metrics, alerts, and log export. How to understand what Trelo is doing." },
          ].map((doc) => (
            <div key={doc.title} className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group cursor-pointer">
              <h2 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors mb-1">{doc.title}</h2>
              <p className="text-sm text-gray-500">{doc.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-10">
          <h2 className="text-xl font-light text-white mb-3">Need help?</h2>
          <p className="text-sm text-gray-400 mb-2">
            Join our{" "}
            <a href="#" className="text-blue-400 hover:underline">Discord community</a> for real-time support.
          </p>
          <p className="text-sm text-gray-400">
            Or email{" "}
            <a href="mailto:support@trelo.com" className="text-blue-400 hover:underline">support@trelo.com</a> for priority assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
