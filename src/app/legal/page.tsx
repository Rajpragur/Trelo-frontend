"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white text-trelo-text" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-8 inline-block">← Back to Trelo</Link>
        <h1 className="text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] mb-4">Legal</h1>
        <p className="text-gray-400 font-light mb-16 leading-relaxed">Everything you need to know about how we handle your data, your rights, and our commitments.</p>

        <div className="space-y-6 mb-20">
          {[
            { href: "/legal/privacy", title: "Privacy Policy", desc: "What we collect, how we use it, and your rights." },
            { href: "/legal/terms", title: "Terms of Service", desc: "The rules for using Trelo. Acceptance, obligations, liability." },
            { href: "/legal/security", title: "Security Overview", desc: "Encryption, compliance, vulnerability reporting. How we protect your data." },
          ].map((doc) => (
            <Link key={doc.href} href={doc.href} className="block p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-colors group">
              <h2 className="text-lg font-medium text-trelo-text group-hover:text-blue-600 transition-colors mb-1">{doc.title}</h2>
              <p className="text-sm text-gray-400 font-light">{doc.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-light text-trelo-text mb-6">Other Legal Documents</h2>
        <div className="space-y-4 mb-20">
          {[
            { title: "DMCA Notice", desc: "Procedures for reporting copyright infringement under the Digital Millennium Copyright Act." },
            { title: "GDPR Representation", desc: "Our GDPR Article 27 representative and data subject request procedures." },
            { title: "Data Processing Agreement (DPA)", desc: "Standard DPA for enterprise customers. Covers subprocessors, security measures, and data handling." },
          ].map((doc) => (
            <div key={doc.title} className="p-5 rounded-lg border border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-medium text-trelo-text mb-1">{doc.title}</h3>
              <p className="text-xs text-gray-400 font-light">{doc.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-xl font-light text-trelo-text mb-3">Contact</h2>
          <p className="text-sm text-gray-400 font-light mb-2">
            For legal inquiries:{" "}
            <a href="mailto:legal@trelo.cc" className="text-blue-600 hover:underline">legal@trelo.cc</a>
          </p>
          <p className="text-sm text-gray-400 font-light">
            For privacy requests:{" "}
            <a href="mailto:privacy@trelo.cc" className="text-blue-600 hover:underline">privacy@trelo.cc</a>
          </p>
        </div>
      </div>
    </div>
  );
}
