"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Plus, Bot, ChevronRight, Zap, Activity, Shield, ArrowRight } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const AGENTS = [
  { name: "support-bot", desc: "Customer support agent with RAG over docs.", model: "GPT-4o", status: "active" },
  { name: "code-reviewer", desc: "Reviews PRs for security and style issues.", model: "Claude 3.5", status: "active" },
  { name: "data-analyzer", desc: "Runs SQL queries and generates reports.", model: "GPT-4o", status: "paused" },
  { name: "onboarding", desc: "Guides new users through setup flow.", model: "Claude 3 Haiku", status: "active" },
  { name: "content-writer", desc: "Drafts blog posts and social copy.", model: "GPT-4o", status: "draft" },
];

export default function AgentsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Build</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Agents</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Manage AI agents for your platform.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Create agent
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Active agents", value: "3", icon: Zap },
          { label: "Requests today", value: "1,247", icon: Activity },
          { label: "Attacks blocked", value: "23", icon: Shield },
          { label: "Avg latency", value: "42ms", icon: ArrowRight },
        ].map((s) => (
          <div key={s.label} className="p-4 bg-white border border-gray-100 rounded-sm">
            <s.icon className="w-3.5 h-3.5 text-gray-300 mb-2" />
            <p className="text-xl font-light text-trelo-text tracking-[-0.02em]">{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-light">{s.label}</p>
          </div>
        ))}
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

      <div className="mt-8 p-6 bg-white border border-gray-100 rounded-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-trelo-text">All systems operational</span>
        </div>
        <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
          8 protection layers active. Circuit breakers, loop detection, prompt injection prevention, and
          cost policies monitoring your agents in real time.
        </p>
        <code className="inline-block px-3 py-1.5 rounded-sm bg-gray-50 font-mono text-xs text-gray-600">
          pip install trelo && trelo serve --port 8000
        </code>
      </div>
    </motion.div>
  );
}
