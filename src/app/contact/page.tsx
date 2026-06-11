"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-trelo-text" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] mb-4">Contact us</h1>
        <p className="text-gray-400 font-light mb-16 leading-relaxed max-w-md">
          Questions about Trelo? Want to discuss enterprise plans? We&apos;re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div>
            <h2 className="text-lg font-medium text-trelo-text mb-6">Send a message</h2>
            {sent ? (
              <div className="p-6 border border-green-200 rounded-sm bg-green-50/50">
                <p className="text-sm font-medium text-green-700 mb-1">Message sent</p>
                <p className="text-xs text-green-600">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    required
                    rows={4}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  Send message <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-sm bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-medium text-trelo-text">Email</h3>
              </div>
              <a href="mailto:hello@trelo.cc" className="text-sm text-blue-600 hover:underline">hello@trelo.cc</a>
            </div>

            <div className="p-4 border border-gray-100 rounded-sm bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-medium text-trelo-text">Discord</h3>
              </div>
              <a href="https://discord.gg/UTXTN5krm" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                discord.gg/UTXTN5krm
              </a>
            </div>

            <div className="p-4 border border-gray-100 rounded-sm bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <h3 className="text-sm font-medium text-trelo-text">LinkedIn</h3>
              </div>
              <a href="https://www.linkedin.com/company/trelo-proxy/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                linkedin.com/company/trelo-proxy
              </a>
            </div>

            <div className="p-4 border border-gray-100 rounded-sm bg-gray-50/50">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Legal & Security</h3>
              <ul className="space-y-1.5">
                <li><a href="mailto:legal@trelo.com" className="text-sm text-blue-600 hover:underline">legal@trelo.com</a> <span className="text-xs text-gray-400">— legal inquiries</span></li>
                <li><a href="mailto:privacy@trelo.com" className="text-sm text-blue-600 hover:underline">privacy@trelo.com</a> <span className="text-xs text-gray-400">— privacy requests</span></li>
                <li><a href="mailto:security@trelo.com" className="text-sm text-blue-600 hover:underline">security@trelo.com</a> <span className="text-xs text-gray-400">— vuln reports</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 font-light">We typically respond within 24 hours on weekdays.</p>
        </div>
      </div>
    </div>
  );
}
