"use client";

import { motion } from "motion/react";
import { CreditCard, Check, ArrowRight } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

export default function BillingPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="mb-8">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Settings</p>
        <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Billing</h1>
        <p className="text-sm text-gray-400 mt-1.5 font-light">Manage your plan, payment method, and invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 bg-white border border-gray-100 rounded-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Current plan</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xl font-light text-trelo-text">Pro</p>
              <p className="text-sm text-gray-400 mt-0.5">$29/month</p>
            </div>
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium rounded-sm">Active</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
            {["100K requests/month", "10 agents", "30 day log retention", "Advanced dashboard"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                <Check className="w-3 h-3 text-green-500" />{f}
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-200 text-sm text-gray-600 rounded-sm hover:border-gray-300 transition-colors">Upgrade plan</button>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Payment method</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-6 rounded-sm bg-gray-200" />
            <div>
              <p className="text-sm text-trelo-text font-medium">•••• 4242</p>
              <p className="text-xs text-gray-400">Expires 12/28</p>
            </div>
          </div>
          <button className="text-xs text-blue-600 hover:underline">Update payment method</button>

          <div className="mt-6 pt-4 border-t border-gray-50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Usage this month</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Requests</span>
                <span className="text-trelo-text font-medium">42,847 / 100,000</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "43%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Invoice history</div>
        {[
          { date: "Jun 1, 2026", amount: "$29.00", status: "Paid" },
          { date: "May 1, 2026", amount: "$29.00", status: "Paid" },
          { date: "Apr 1, 2026", amount: "$29.00", status: "Paid" },
        ].map((inv) => (
          <div key={inv.date} className="flex items-center justify-between px-4 py-2.5 border-t border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group">
            <div>
              <p className="text-sm text-trelo-text">{inv.date}</p>
              <p className="text-[11px] text-gray-400">{inv.amount} — {inv.status}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
