"use client";

import { motion } from "motion/react";
import { Terminal, ArrowRight } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const LOGS = [
  { time: "14:32:01", agent: "support-bot", action: "tool_call", target: "search-docs", status: "ok", cost: "$0.03" },
  { time: "14:31:45", agent: "code-reviewer", action: "loop_detected", target: "—", status: "blocked", cost: "$0.00" },
  { time: "14:31:22", agent: "data-analyzer", action: "tool_call", target: "run-sql", status: "ok", cost: "$0.07" },
  { time: "14:30:58", agent: "support-bot", action: "prompt_injection", target: "—", status: "blocked", cost: "$0.00" },
  { time: "14:30:33", agent: "onboarding", action: "tool_call", target: "send-email", status: "ok", cost: "$0.01" },
  { time: "14:30:10", agent: "content-writer", action: "duplicate", target: "create-ticket", status: "deduped", cost: "$0.00" },
  { time: "14:29:47", agent: "code-reviewer", action: "tool_call", target: "github-api", status: "ok", cost: "$0.04" },
  { time: "14:29:15", agent: "data-analyzer", action: "circuit_open", target: "run-sql", status: "blocked", cost: "$0.00" },
];

export default function LogsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="mb-8">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Monitor</p>
        <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Logs</h1>
        <p className="text-sm text-gray-400 mt-1.5 font-light">Real-time audit trail of every agent action and proxy decision.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_1.2fr_1fr_1fr_0.8fr_0.6fr] gap-2 px-4 py-2.5 bg-gray-50 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          <span>Time</span><span>Agent</span><span>Action</span><span>Target</span><span>Status</span><span>Cost</span>
        </div>
        {LOGS.map((log, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1.2fr_1fr_1fr_0.8fr_0.6fr] gap-2 px-4 py-2.5 border-t border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group items-center"
          >
            <span className="text-xs font-mono text-gray-500">{log.time}</span>
            <span className="text-xs text-gray-700 font-medium">{log.agent}</span>
            <span className="text-xs text-gray-500">
              {log.action === "loop_detected" && "Loop detected"}
              {log.action === "prompt_injection" && "Injection blocked"}
              {log.action === "duplicate" && "Duplicate dropped"}
              {log.action === "circuit_open" && "Circuit open"}
              {log.action === "tool_call" && "Tool call"}
            </span>
            <span className="text-xs font-mono text-gray-400">{log.target}</span>
            <span>
              {log.status === "ok" && <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm font-medium">OK</span>}
              {log.status === "blocked" && <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm font-medium">Blocked</span>}
              {log.status === "deduped" && <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-sm font-medium">Deduped</span>}
            </span>
            <span className="text-xs font-mono text-gray-400">{log.cost}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
