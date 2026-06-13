"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Plus, Bot, ChevronRight, Zap, Activity, Shield,
  Key, Copy, Check, Terminal, Clock,
} from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const AGENTS = [
  { name: "support-bot", desc: "Customer support agent with RAG over docs.", model: "GPT-4o", status: "active" },
  { name: "code-reviewer", desc: "Reviews PRs for security and style issues.", model: "Claude 3.5", status: "active" },
  { name: "data-analyzer", desc: "Runs SQL queries and generates reports.", model: "GPT-4o", status: "paused" },
  { name: "onboarding", desc: "Guides new users through setup flow.", model: "Claude 3 Haiku", status: "active" },
  { name: "content-writer", desc: "Drafts blog posts and social copy.", model: "GPT-4o", status: "draft" },
];

const ACTIVITY_FEED = [
  { time: "2 min ago", text: "support-bot completed a tool call to search-docs", type: "success" },
  { time: "8 min ago", text: "Circuit breaker opened for data-analyzer (SQL timeout)", type: "alert" },
  { time: "14 min ago", text: "Prompt injection blocked on onboarding agent", type: "blocked" },
  { time: "27 min ago", text: "Duplicate request deduped — content-writer tried to create same ticket twice", type: "deduped" },
  { time: "1 hour ago", text: "API key 'Production' used 847 times today", type: "info" },
];

export default function DashboardHome() {
  const [copied, setCopied] = useState(false);
  const proxyUrl = "http://localhost:8000/v1";
  const apiKey = "tr_live_3f7a82c1b4d5e6f7a8b9c0d1e2f3a4b5";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Dashboard</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Welcome back, Raj</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Here&apos;s what&apos;s happening with your agents.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Active agents", value: "3", icon: Zap },
          { label: "Requests today", value: "1,247", icon: Activity },
          { label: "Attacks blocked", value: "23", icon: Shield },
          { label: "Avg latency", value: "42ms", icon: Zap },
        ].map((s) => (
          <div key={s.label} className="p-4 bg-white border border-gray-100 rounded-sm">
            <s.icon className="w-3.5 h-3.5 text-gray-300 mb-2" />
            <p className="text-xl font-light text-trelo-text tracking-[-0.02em]">{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-light">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-8">
        {/* Left column — API key status + Proxy health */}
        <div className="space-y-4">
          {/* API Key status */}
          <div className="p-5 bg-white border border-gray-100 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-medium text-trelo-text">API Key status</h2>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">Production key</p>
                <code className="text-sm font-mono text-trelo-text bg-gray-50 px-2 py-1 rounded-sm">
                  tr_live_3f7a...d1e2f3a4b5
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Active
                </span>
                <Link
                  href="/dashboard/keys"
                  className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                >
                  Manage keys →
                </Link>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Last used 2 minutes ago · 1,247 requests today · Created Jun 1, 2026
            </div>
          </div>

          {/* Proxy health */}
          <div className="p-5 bg-white border border-gray-100 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-medium text-trelo-text">Proxy health</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Circuit breaker", status: "operational", val: "CLOSED" },
                { label: "Loop detection", status: "operational", val: "Active" },
                { label: "Prompt injection", status: "operational", val: "Active" },
                { label: "Cost policies", status: "operational", val: "43% budget" },
                { label: "Dedup engine", status: "operational", val: "Active" },
                { label: "Audit logging", status: "operational", val: "Writing" },
                { label: "Firewall", status: "operational", val: "Active" },
                { label: "Model routing", status: "operational", val: "Auto" },
              ].map((layer) => (
                <div key={layer.label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{layer.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-600 font-medium">{layer.val}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">All 8 layers operational</span>
            </div>
          </div>

          {/* Quick-start */}
          <div className="p-5 bg-white border border-blue-100 rounded-sm bg-gradient-to-r from-blue-50/30 to-white">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-medium text-trelo-text">Quick start</h2>
            </div>
            <p className="text-xs text-gray-500 mb-3 font-light">
              Point any AI agent framework to your unique proxy endpoint. All 8 protection layers activate automatically.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-sm bg-gray-50 font-mono text-xs text-gray-700 border border-gray-200">
                  {proxyUrl}
                </code>
                <button
                  onClick={() => handleCopy(proxyUrl)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Copy endpoint"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <code className="block px-3 py-2 rounded-sm bg-gray-900 text-green-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  pip install trelo && trelo serve --port 8000
                </code>
                <code className="block px-3 py-2 rounded-sm bg-gray-900 text-green-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  agent = Agent(base_url=&quot;{proxyUrl}&quot;)
                </code>
              </div>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 hover:underline font-medium"
            >
              Full documentation →
            </Link>
          </div>
        </div>

        {/* Right column — Activity feed */}
        <div className="bg-white border border-gray-100 rounded-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-trelo-text">Recent activity</h2>
          </div>
          <div className="space-y-3">
            {ACTIVITY_FEED.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {item.type === "success" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 block" />}
                  {item.type === "alert" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />}
                  {item.type === "blocked" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block" />}
                  {item.type === "deduped" && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 block" />}
                  {item.type === "info" && <span className="w-1.5 h-1.5 rounded-full bg-gray-300 block" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/logs"
            className="inline-flex items-center gap-1 mt-4 text-xs text-blue-600 hover:underline font-medium"
          >
            View all logs →
          </Link>
        </div>
      </div>

      {/* Agent list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-trelo-text">Your agents</h2>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Create agent
          </button>
        </div>
        <div className="space-y-2">
          {AGENTS.map((agent) => (
            <Link
              key={agent.name}
              href={`/dashboard/agents/${agent.name}`}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group"
            >
              <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-trelo-text group-hover:text-blue-600 transition-colors">{agent.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{agent.desc}</p>
              </div>
              <div className="hidden sm:block text-xs text-gray-400 font-light">{agent.model}</div>
              <div className="flex items-center gap-2">
                {agent.status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                {agent.status === "paused" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                {agent.status === "draft" && <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                <span className="text-[11px] text-gray-400 capitalize">{agent.status}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
