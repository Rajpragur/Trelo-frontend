"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuth } from "@/lib/auth";
import { Shield, BarChart3, Activity, Key, LogOut, ArrowRight } from "lucide-react";

const slide = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const;

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-6 md:px-8">
          <Link href="/" className="font-light text-xl tracking-tight text-trelo-text">
            Trelo
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-light">{user.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slide}
        >
          <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-3">
            Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-trelo-text tracking-[-0.03em] mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-sm text-gray-400 font-light mb-12">
            Your agents are protected. Here's what's happening.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Requests today", value: "1,247", icon: Activity, color: "text-blue-600" },
            { label: "Attacks blocked", value: "23", icon: Shield, color: "text-green-600" },
            { label: "Active agents", value: "4", icon: BarChart3, color: "text-purple-600" },
            { label: "API keys", value: "2", icon: Key, color: "text-amber-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slide, delay: 0.05 * i }}
              className="p-5 border border-gray-100 rounded-sm bg-gray-50/50"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} mb-3`} />
              <p className="text-2xl font-light text-trelo-text tracking-[-0.02em]">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1 font-light">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...slide, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-trelo-text mb-4">Quick setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="/docs"
              className="flex items-center justify-between p-4 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-trelo-text">View documentation</p>
                <p className="text-xs text-gray-400 mt-0.5">API reference, guides, and examples.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="https://discord.gg/UTXTN5krm"
              target="_blank"
              className="flex items-center justify-between p-4 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-trelo-text">Join Discord</p>
                <p className="text-xs text-gray-400 mt-0.5">Community support and updates.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Agent status placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...slide, delay: 0.3 }}
          className="mt-12 p-6 border border-gray-100 rounded-sm bg-gray-50/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-trelo-text">All systems operational</span>
          </div>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Your Trelo proxy is running with all 8 protection layers active. Circuit breakers, loop detection,
            prompt injection prevention, and cost policies are monitoring your agents in real time.
          </p>
          <code className="inline-block mt-4 px-3 py-1.5 rounded-sm bg-gray-100 font-mono text-xs text-gray-600">
            pip install trelo && trelo serve --port 8000
          </code>
        </motion.div>
      </div>
    </div>
  );
}
