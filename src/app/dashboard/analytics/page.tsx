"use client";

import { motion } from "motion/react";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="mb-8">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Monitor</p>
        <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1.5 font-light">Usage, costs, and protection metrics across all agents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total cost (30d)", value: "$412", change: "+12%", up: true, icon: DollarSign },
          { label: "Requests (24h)", value: "1,247", change: "+3%", up: true, icon: Activity },
          { label: "Block rate", value: "1.8%", change: "-0.3%", up: false, icon: TrendingDown },
        ].map((m) => (
          <div key={m.label} className="p-5 bg-white border border-gray-100 rounded-sm">
            <m.icon className="w-4 h-4 text-gray-300 mb-3" />
            <p className="text-2xl font-light text-trelo-text tracking-[-0.02em]">{m.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] text-gray-500">{m.label}</span>
              <span className={`text-[11px] ${m.up ? "text-green-600" : "text-red-500"}`}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="p-5 bg-white border border-gray-100 rounded-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Requests over time</p>
          <div className="h-40 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95, 65, 80, 55, 70, 90, 60, 45, 85, 70, 50, 65, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 hover:bg-blue-200 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-gray-100 rounded-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Top agents by requests</p>
            {[
              { name: "support-bot", pct: 42 },
              { name: "code-reviewer", pct: 28 },
              { name: "data-analyzer", pct: 18 },
              { name: "onboarding", pct: 12 },
            ].map((a) => (
              <div key={a.name} className="flex items-center gap-3 mb-2 last:mb-0">
                <span className="text-xs text-gray-600 w-28 truncate">{a.name}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 w-10 text-right">{a.pct}%</span>
              </div>
            ))}
          </div>
          <div className="p-5 bg-white border border-gray-100 rounded-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Protection breakdown</p>
            {[
              { label: "Circuit breaks", value: 12 },
              { label: "Loop detections", value: 8 },
              { label: "Injections blocked", value: 3 },
              { label: "Dedup hits", value: 47 },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-gray-600">{p.label}</span>
                <span className="text-xs font-medium text-trelo-text">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
