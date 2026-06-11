"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

const KEYS = [
  { name: "Production", key: "tr_live_3f7a...b2d1", created: "Jun 1, 2026", lastUsed: "2 min ago" },
  { name: "Staging", key: "tr_test_8c4b...e9f2", created: "May 18, 2026", lastUsed: "3 hours ago" },
];

export default function KeysPage() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Settings</p>
          <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">API Keys</h1>
          <p className="text-sm text-gray-400 mt-1.5 font-light">Manage keys for authenticating with the Trelo proxy.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Generate key
        </button>
      </div>

      <div className="space-y-2">
        {KEYS.map((k) => (
          <div key={k.name} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm group">
            <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Key className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-trelo-text">{k.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <code className="text-xs font-mono text-gray-500">{visible[k.name] ? k.key : k.key.replace(/[a-f0-9]/g, "•")}</code>
                <button onClick={() => setVisible((v) => ({ ...v, [k.name]: !v[k.name] }))} className="text-gray-300 hover:text-gray-500 transition-colors">
                  {visible[k.name] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
                <button className="text-gray-300 hover:text-gray-500 transition-colors" title="Copy">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
              <span>Created {k.created}</span>
              <span className="text-green-600">Last used {k.lastUsed}</span>
            </div>
            <button className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
