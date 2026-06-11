"use client";

import NavBar from "@/components/NavBar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-trelo-text" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] mb-4">Contact us</h1>
        <p className="text-gray-400 font-light mb-16 leading-relaxed max-w-md">
          Questions about Trelo? Want to discuss enterprise plans? We're here to help.
        </p>

        <div className="space-y-8 mb-20">
          <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-medium text-trelo-text mb-2">Email</h2>
            <a href="mailto:hello@trelo.cc" className="text-blue-600 text-sm font-medium hover:underline">hello@trelo.cc</a>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-medium text-trelo-text mb-2">Founder</h2>
            <p className="text-sm text-gray-400 mb-2">Raj Pratap Singh — questions, partnerships, press.</p>
            <a href="mailto:raj@trelo.cc" className="text-blue-600 text-sm font-medium hover:underline">raj@trelo.cc</a>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-medium text-trelo-text mb-2">Discord</h2>
            <p className="text-sm text-gray-400 mb-2">Join our community for real-time support and discussions.</p>
            <a
              href="https://discord.gg/UTXTN5krm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              discord.gg/UTXTN5krm
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-medium text-trelo-text mb-2">LinkedIn</h2>
            <p className="text-sm text-gray-400 mb-2">Follow us for product updates and announcements.</p>
            <a
              href="https://www.linkedin.com/company/trelo-proxy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              linkedin.com/company/trelo-proxy
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-medium text-trelo-text mb-2">Legal & Privacy</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:legal@trelo.cc" className="text-blue-600 hover:underline">legal@trelo.cc</a> <span className="text-gray-400">— legal inquiries</span></li>
              <li><a href="mailto:privacy@trelo.cc" className="text-blue-600 hover:underline">privacy@trelo.cc</a> <span className="text-gray-400">— privacy requests</span></li>
              <li><a href="mailto:security@trelo.cc" className="text-blue-600 hover:underline">security@trelo.cc</a> <span className="text-gray-400">— vulnerability reports</span></li>
              <li><a href="mailto:support@trelo.cc" className="text-blue-600 hover:underline">support@trelo.cc</a> <span className="text-gray-400">— help & support</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10">
          <p className="text-sm text-gray-400 font-light">
            We typically respond within 24 hours on weekdays.
          </p>
        </div>
      </div>
    </div>
  );
}
