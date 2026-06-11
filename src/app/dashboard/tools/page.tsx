"use client";

import { motion } from "motion/react";
import { Plus, Wrench, ExternalLink } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const TOOLS = [
  { name: "send-email", desc: "Sends transactional emails via Resend API.", endpoint: "POST /tools/email", status: "active" },
  { name: "search-docs", desc: "Semantic search over knowledge bases.", endpoint: "POST /tools/search", status: "active" },
  { name: "run-sql", desc: "Executes read-only SQL against production replica.", endpoint: "POST /tools/sql", status: "active" },
  { name: "create-ticket", desc: "Opens a Linear ticket from agent output.", endpoint: "POST /tools/ticket", status: "draft" },
  { name: "slack-notify", desc: "Posts messages to designated Slack channels.", endpoint: "POST /tools/slack", status: "paused" },
];

export default function ToolsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Build</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Tools</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">External actions your agents can invoke at runtime.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add tool
        </button>
      </div>

      <div className="space-y-2">
        {TOOLS.map((tool) => (
          <div key={tool.name} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group cursor-pointer">
            <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-trelo-text group-hover:text-blue-600 transition-colors">{tool.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{tool.desc}</p>
            </div>
            <div className="hidden sm:block text-xs font-mono text-gray-400">{tool.endpoint}</div>
            <div className="flex items-center gap-2 ml-3">
              {tool.status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
              {tool.status === "paused" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              {tool.status === "draft" && <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
              <span className="text-[11px] text-gray-400 capitalize">{tool.status}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
