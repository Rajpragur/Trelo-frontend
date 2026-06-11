"use client";

import { motion } from "motion/react";
import { Plus, BookOpen, FileText } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const BASES = [
  { name: "Product docs", desc: "Markdown files synced from GitHub. 247 documents indexed.", type: "files", size: "12MB" },
  { name: "API reference", desc: "OpenAPI spec auto-imported. 43 endpoints documented.", type: "api", size: "3MB" },
  { name: "Support history", desc: "Zendesk export. 1,842 resolved tickets.", type: "csv", size: "28MB" },
  { name: "Company wiki", desc: "Notion export. Policies, onboarding, runbooks.", type: "wiki", size: "8MB" },
];

export default function KnowledgePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Build</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Knowledge</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Documents, APIs, and data sources your agents can reference.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add source
        </button>
      </div>

      <div className="space-y-2">
        {BASES.map((kb) => (
          <div key={kb.name} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group cursor-pointer">
            <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-trelo-text group-hover:text-blue-600 transition-colors">{kb.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kb.desc}</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider bg-gray-50 px-1.5 py-0.5 rounded-sm">{kb.type}</span>
              <span className="text-xs text-gray-400 font-light">{kb.size}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
