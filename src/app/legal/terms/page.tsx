"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/legal" className="text-xs text-gray-500 hover:text-blue-400 transition-colors mb-8 inline-block">← Back to Legal</Link>
        <h1 className="text-4xl font-light text-white tracking-[-0.03em] mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-16">Effective date: June 1, 2026</p>

        <div className="space-y-14">
          <Section title="1. Acceptance of Terms">
            <p>By accessing or using Trelo (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these terms.</p>
            <p>If you do not agree to these terms, do not use the Service.</p>
          </Section>

          <Section title="2. Description of Service">
            <p>Trelo provides a proxy middleware layer for AI agents. The Service sits between your agent framework and the APIs/tools your agents call, adding safety, security, cost controls, and observability — including but not limited to: circuit breaking, loop detection, prompt injection prevention, semantic deduplication, idempotency enforcement, audit logging, and cost management.</p>
          </Section>

          <Section title="3. User Accounts & Responsibilities">
            <p>You are responsible for maintaining the security of your account credentials and API keys. You are responsible for all activity that occurs under your account, including the behavior and outputs of your AI agents.</p>
            <p>You agree to provide accurate, current, and complete account information and to update it as necessary.</p>
          </Section>

          <Section title="4. Prohibited Use">
            <p>You may not use the Service to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Transmit malware, spam, or engage in denial-of-service attacks</li>
              <li>Reverse engineer, decompile, or disassemble the Service</li>
              <li>Attempt to bypass or disable any safety, security, or cost-control features</li>
              <li>Use the Service to build a competing product</li>
            </ul>
          </Section>

          <Section title="5. Fees & Payment">
            <p>The Service is offered under subscription plans with usage-based overage charges. You agree to pay all fees associated with your selected plan, including any overage charges incurred beyond your plan&apos;s included limits.</p>
            <p>Fees are billed in advance on a monthly or annual basis, depending on your plan. Overage charges are billed at the end of each billing period. All fees are non-refundable except as required by law.</p>
          </Section>

          <Section title="6. Cancellation & Termination">
            <p><strong className="text-white">By You.</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds are provided for partial months.</p>
            <p><strong className="text-white">By Us.</strong> We may suspend or terminate your access to the Service if you violate these Terms. We will make reasonable efforts to notify you prior to termination and provide an opportunity to cure the violation where appropriate.</p>
            <p>Upon termination, your data will be retained for 14 days to allow you to export it, after which it will be permanently deleted.</p>
          </Section>

          <Section title="7. Warranty Disclaimer">
            <p>THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p>We do not warrant that the Service will be uninterrupted, error-free, or completely secure. You acknowledge that AI agent behavior is inherently probabilistic and that no safety system can guarantee complete protection against all possible failure modes.</p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE IS LIMITED TO THE FEES YOU PAID IN THE SIX (6) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
            <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, or lost data.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts located in Delaware.</p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. We will provide at least 30 days&apos; notice via email before any material changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the modified Terms.</p>
          </Section>

          <Section title="11. Contact">
            <p>For questions about these Terms, contact <a href="mailto:legal@trelo.com" className="text-blue-400 hover:underline">legal@trelo.com</a>.</p>
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
