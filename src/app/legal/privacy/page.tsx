"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-trelo-text" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link href="/legal" className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-8 inline-block">← Back to Legal</Link>
        <h1 className="text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 font-light mb-16">Effective date: June 1, 2026</p>

        <div className="space-y-14">
          <Section title="1. Information We Collect">
            <p><strong className="text-trelo-text">Account Information.</strong> When you sign up, we collect your name, email address, and organization name. This is required to create and maintain your account.</p>
            <p><strong className="text-trelo-text">Usage Data.</strong> We collect agent traces, tool call logs, request/response metadata, and performance metrics. This data is essential for operating the proxy — it powers circuit breaking, loop detection, and cost optimization.</p>
            <p><strong className="text-trelo-text">API Keys.</strong> Your API keys are encrypted at rest (AES-256) and never logged or stored in plaintext. Keys are automatically rotated and managed through a key management service.</p>
            <p><strong className="text-trelo-text">Cookies.</strong> We use only essential functional cookies necessary for session management. No tracking cookies, no analytics cookies, no fingerprinting.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p><strong className="text-trelo-text">To operate the proxy.</strong> Agent traces and tool call logs are processed in real-time to detect infinite loops, prevent prompt injection, enforce rate limits, and apply cost controls. This processing is core to the service.</p>
            <p><strong className="text-trelo-text">To improve detection.</strong> Anonymized, aggregated patterns from usage data help us improve our security signatures and anomaly detection models.</p>
            <p><strong className="text-trelo-text">To bill accurately.</strong> Usage metrics (request count, token volume) are used solely for billing purposes. No per-message content is stored for billing.</p>
          </Section>

          <Section title="3. Data Retention">
            <p>Standard log retention is <strong className="text-trelo-text">30 days</strong>. Enterprise customers can configure custom retention periods (up to 1 year) via their dashboard.</p>
            <p>Account data is retained until you request deletion. Upon account termination, all associated logs and traces are purged within 14 days.</p>
          </Section>

          <Section title="4. Sharing & Disclosure">
            <p>We <strong className="text-trelo-text">do not sell</strong> your data. Period.</p>
            <p>We share data only with the following subprocessors, all of whom have signed data processing agreements:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>AWS (us-east-1) — cloud infrastructure</li>
              <li>Vercel — application hosting</li>
              <li>Sentry — error monitoring (no PII, no agent content)</li>
            </ul>
            <p>We may disclose data if required by law, following a valid legal process and with notice to you where permitted.</p>
          </Section>

          <Section title="5. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong className="text-trelo-text">Access</strong> — request a copy of your personal data</li>
              <li><strong className="text-trelo-text">Correction</strong> — update inaccurate information</li>
              <li><strong className="text-trelo-text">Deletion</strong> — request account and data deletion</li>
              <li><strong className="text-trelo-text">Portability</strong> — export your data in a machine-readable format</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:privacy@trelo.cc" className="text-blue-600 hover:underline">privacy@trelo.cc</a>. We respond within 30 days.</p>
          </Section>

          <Section title="6. Security">
            <p>All data is encrypted in transit (TLS 1.3) and at rest (AES-256). API keys are managed through a dedicated key management service. For full details, see our <Link href="/legal/security" className="text-blue-600 hover:underline">Security Overview</Link>.</p>
          </Section>

          <Section title="7. Contact">
            <p>For privacy-related inquiries: <a href="mailto:privacy@trelo.cc" className="text-blue-600 hover:underline">privacy@trelo.cc</a></p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-trelo-text mb-4">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-500 font-light">{children}</div>
    </div>
  );
}
