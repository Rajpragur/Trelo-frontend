"use client";

import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/legal" className="text-xs text-gray-500 hover:text-blue-400 transition-colors mb-8 inline-block">← Back to Legal</Link>
        <h1 className="text-4xl font-light text-white tracking-[-0.03em] mb-2">Security Overview</h1>
        <p className="text-sm text-gray-500 mb-16">How we protect your data and your agents.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {[
            { label: "SOC2 Type I", status: "In Progress", icon: "🛡️" },
            { label: "GDPR", status: "Compliant", icon: "🇪🇺" },
            { label: "ISO 27001", status: "In Progress", icon: "🔐" },
          ].map((badge) => (
            <div key={badge.label} className="p-4 rounded-lg bg-gray-900 border border-gray-800 text-center">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="text-xs font-medium text-white mb-0.5">{badge.label}</div>
              <div className="text-[10px] text-gray-500">{badge.status}</div>
            </div>
          ))}
        </div>

        <div className="space-y-14">
          <Section title="Encryption">
            <ul className="space-y-2 text-sm">
              <li><strong className="text-white">In Transit:</strong> All traffic is encrypted using TLS 1.3. We enforce HTTPS for all API endpoints and dashboard access.</li>
              <li><strong className="text-white">At Rest:</strong> All stored data is encrypted using AES-256. Database volumes, backups, and logs are encrypted by default.</li>
              <li><strong className="text-white">API Keys:</strong> Never stored in plaintext. Never logged. Managed through a dedicated key management service (KMS) with automatic rotation.</li>
            </ul>
          </Section>

          <Section title="API Key Security">
            <p>Your API keys are the most sensitive piece of data in the system. We handle them with extreme care:</p>
            <ul className="space-y-2 text-sm">
              <li>Keys are encrypted with AWS KMS before storage</li>
              <li>Keys are never written to logs, traces, or error reports</li>
              <li>Keys are never returned in API responses after initial creation</li>
              <li>Automatic key rotation is available for enterprise customers</li>
              <li>Rate limiting and anomaly detection protect against key exfiltration</li>
            </ul>
          </Section>

          <Section title="Compliance">
            <ul className="space-y-3 text-sm">
              <li><strong className="text-white">SOC2 Type I</strong> — In progress. Audit by independent third-party firm. Expected completion Q3 2026.</li>
              <li><strong className="text-white">GDPR</strong> — Compliant. Data processing agreements available. EU-based customers can request data residency in AWS eu-west-1.</li>
              <li><strong className="text-white">CCPA</strong> — Ready. California residents may request data access and deletion via privacy@trelo.com.</li>
            </ul>
          </Section>

          <Section title="Vulnerability Management">
            <p>We take security reports seriously. If you discover a vulnerability, please report it to us immediately.</p>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-white">Report to:</strong> <a href="mailto:security@trelo.com" className="text-blue-400 hover:underline">security@trelo.com</a></li>
              <li><strong className="text-white">Response time:</strong> We acknowledge reports within 24 hours</li>
              <li><strong className="text-white">Resolution:</strong> Critical vulnerabilities are patched within 72 hours</li>
              <li><strong className="text-white">PGP Key:</strong> Available upon request</li>
            </ul>
            <a
              href="mailto:security@trelo.com"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-[3px] bg-red-600/20 border border-red-600/30 text-red-400 text-sm font-medium hover:bg-red-600/30 transition-colors"
            >
              Report a vulnerability
            </a>
          </Section>

          <Section title="Uptime & Reliability">
            <ul className="space-y-2 text-sm">
              <li><strong className="text-white">Enterprise SLA:</strong> 99.9% uptime guarantee with service credits for downtime</li>
              <li><strong className="text-white">Pro SLA:</strong> 99.0% uptime target</li>
              <li><strong className="text-white">Status page:</strong> Real-time service status available at status.trelo.com</li>
            </ul>
          </Section>

          <Section title="Infrastructure">
            <ul className="space-y-2 text-sm">
              <li><strong className="text-white">Hosting:</strong> AWS us-east-1 region</li>
              <li><strong className="text-white">Network:</strong> Private VPC with isolated subnets for each tenant</li>
              <li><strong className="text-white">Backups:</strong> Hourly encrypted database snapshots retained for 30 days</li>
              <li><strong className="text-white">Monitoring:</strong> 24/7 automated monitoring with on-call engineer rotation</li>
            </ul>
          </Section>

          <Section title="Third-Party Audits">
            <p>We undergo annual third-party penetration testing by an independent security firm. The most recent test was completed in Q1 2026. A summary report is available to enterprise customers upon request.</p>
            <p>In addition to annual pentests, we run continuous vulnerability scanning on all production infrastructure and dependencies.</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-white mb-4">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-400">{children}</div>
    </div>
  );
}
