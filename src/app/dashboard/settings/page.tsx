"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "@/lib/auth";
import { User, Bell, Mail, Trash2, ArrowRight } from "lucide-react";

const slide = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const;

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [budgetWarnings, setBudgetWarnings] = useState(true);
  const [circuitAlerts, setCircuitAlerts] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    signOut();
    router.push("/");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={slide}>
      <div className="mb-8">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Settings</p>
        <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">Settings</h1>
        <p className="text-sm text-gray-400 mt-1.5 font-light">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Account details */}
        <div className="bg-white border border-gray-100 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-trelo-text">Account details</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors"
            >
              {saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        {/* Notification preferences */}
        <div className="bg-white border border-gray-100 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-trelo-text">Notification preferences</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded-sm border-gray-300 text-[#0f5bff] focus:ring-[#0f5bff]"
              />
              <div>
                <p className="text-sm text-trelo-text font-medium">Email alerts</p>
                <p className="text-xs text-gray-400">Receive alerts about critical events and system status.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={budgetWarnings}
                onChange={(e) => setBudgetWarnings(e.target.checked)}
                className="w-4 h-4 rounded-sm border-gray-300 text-[#0f5bff] focus:ring-[#0f5bff]"
              />
              <div>
                <p className="text-sm text-trelo-text font-medium">Budget warnings</p>
                <p className="text-xs text-gray-400">Get notified when your API spend reaches 80% and 95% of your monthly budget.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={circuitAlerts}
                onChange={(e) => setCircuitAlerts(e.target.checked)}
                className="w-4 h-4 rounded-sm border-gray-300 text-[#0f5bff] focus:ring-[#0f5bff]"
              />
              <div>
                <p className="text-sm text-trelo-text font-medium">Circuit breaker alerts</p>
                <p className="text-xs text-gray-400">Get notified when a circuit breaker opens for any of your agents.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white border border-red-100 rounded-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trash2 className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-medium text-red-600">Delete account</h2>
          </div>
          <p className="text-sm text-gray-500 font-light mb-4">
            Permanently delete your account and all associated data — agents, logs, API keys, and team memberships. This action cannot be undone.
          </p>
          {!deleteConfirm ? (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="px-5 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-sm hover:bg-red-50 transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Confirm deletion
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-5 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
