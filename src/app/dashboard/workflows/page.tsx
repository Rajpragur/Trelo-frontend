"use client";

import { motion } from "motion/react";
import { Plus, Workflow, Circle } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const WORKFLOWS = [
  { name: "customer-onboarding", desc: "Triggers on signup → verifies email → creates account → sends welcome.", nodes: 4, status: "active" },
  { name: "support-triage", desc: "Classifies ticket → routes to agent → drafts response → queues review.", nodes: 5, status: "active" },
  { name: "daily-report", desc: "Aggregates metrics → runs analysis → formats markdown → sends Slack.", nodes: 4, status: "paused" },
];

export default function WorkflowsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Build</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Workflows</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Chain agents, tools, and conditions into automated flows.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New workflow
        </button>
      </div>

      <div className="space-y-2">
        {WORKFLOWS.map((w) => (
          <div key={w.name} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group cursor-pointer">
            <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Workflow className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-trelo-text group-hover:text-blue-600 transition-colors">{w.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{w.desc}</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-400 font-light">
                <Circle className="w-2 h-2 inline mr-1" />{w.nodes} nodes
              </span>
              {w.status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
              {w.status === "paused" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              <span className="text-[11px] text-gray-400 capitalize">{w.status}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
