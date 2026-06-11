"use client";

import { motion } from "motion/react";
import { Users, Plus } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const MEMBERS = [
  { name: "Raj Pratap Singh", email: "raj@trelo.cc", role: "Owner", initials: "RS" },
  { name: "Alex Chen", email: "alex@trelo.cc", role: "Admin", initials: "AC" },
  { name: "Sarah Kim", email: "sarah@trelo.cc", role: "Member", initials: "SK" },
];

export default function TeamPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Settings</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Team</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Manage members and roles for your workspace.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Invite member
        </button>
      </div>

      <div className="space-y-1 bg-white border border-gray-100 rounded-sm overflow-hidden">
        {MEMBERS.map((m) => (
          <div key={m.email} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <div className="w-8 h-8 rounded-sm bg-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">{m.initials}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-trelo-text">{m.name}</p>
              <p className="text-xs text-gray-400">{m.email}</p>
            </div>
            <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm font-medium">{m.role}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
