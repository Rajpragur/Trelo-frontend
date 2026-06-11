"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "@/lib/auth";
import {
  Bot, Workflow, BookOpen, Wrench, Activity, BarChart3,
  Users, Key, CreditCard, Search, Bell, LogOut, Terminal, X,
} from "lucide-react";

const SIDEBAR_SECTIONS = [
  {
    label: "Build",
    items: [
      { label: "Agents", href: "/dashboard", icon: Bot },
      { label: "Workflows", href: "/dashboard/workflows", icon: Workflow },
      { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
      { label: "Tools", href: "/dashboard/tools", icon: Wrench },
    ],
  },
  {
    label: "Monitor",
    items: [
      { label: "Logs", href: "/dashboard/logs", icon: Terminal },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Team", href: "/dashboard/team", icon: Users },
      { label: "API Keys", href: "/dashboard/keys", icon: Key },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
];

const SEARCH_ITEMS = [
  { label: "Agents", href: "/dashboard", desc: "Manage your AI agents" },
  { label: "Workflows", href: "/dashboard/workflows", desc: "Build automation flows" },
  { label: "Logs", href: "/dashboard/logs", desc: "Audit trail and traces" },
  { label: "API Keys", href: "/dashboard/keys", desc: "Manage authentication keys" },
  { label: "Billing", href: "/dashboard/billing", desc: "Plan and invoices" },
  { label: "Documentation", href: "/docs", desc: "Integration guides" },
];

const NOTIFICATIONS = [
  { text: "Circuit breaker opened for data-analyzer", time: "2 min ago", type: "alert" },
  { text: "New agent 'content-writer' created", time: "1 hour ago", type: "info" },
  { text: "API key 'Staging' expiring in 7 days", time: "3 hours ago", type: "warn" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  const filtered = SEARCH_ITEMS.filter((i) =>
    i.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex bg-gray-50/30"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 transition-all duration-200 ${
          sidebarCollapsed ? "w-[60px]" : "w-[220px]"
        }`}
      >
        <div className="h-14 flex items-center px-4 border-b border-gray-50">
          <Link href="/" className="font-light text-lg tracking-tight text-trelo-text">
            {sidebarCollapsed ? "T" : "Trelo"}
          </Link>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-5 overflow-y-auto">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.label}>
              {!sidebarCollapsed && (
                <p className="px-3 mb-1 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm transition-colors ${
                        isActive
                          ? "bg-gray-100 text-trelo-text font-medium"
                          : "text-gray-500 hover:text-trelo-text hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {user.name[0]}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-trelo-text truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarCollapsed ? "ml-[60px]" : "ml-[220px]"}`}>
        {/* Top bar */}
        <header className="h-14 border-b border-gray-100 bg-white flex items-center justify-between px-6 sticky top-0 z-30 flex-shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {/* Search dropdown */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false); }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5"
              >
                <Search className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.98 }}
                    transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full mt-1 w-72 bg-white rounded-lg border border-gray-100 shadow-lg overflow-hidden z-50"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                      <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search pages..."
                        className="flex-1 text-sm bg-transparent outline-none text-trelo-text placeholder-gray-300"
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="text-gray-300 hover:text-gray-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filtered.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <p className="text-sm text-trelo-text">{item.label}</p>
                            <p className="text-[11px] text-gray-400">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                      {filtered.length === 0 && (
                        <div className="px-3 py-4 text-center text-xs text-gray-400">No results</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications dropdown */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setSearchOpen(false); }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.98 }}
                    transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg border border-gray-100 shadow-lg overflow-hidden z-50"
                  >
                    <div className="px-3 py-2.5 border-b border-gray-100">
                      <p className="text-xs font-medium text-trelo-text">Notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {NOTIFICATIONS.map((n, i) => (
                        <div key={i} className="px-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-start gap-2">
                            {n.type === "alert" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />}
                            {n.type === "info" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                            {n.type === "warn" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />}
                            <div>
                              <p className="text-sm text-trelo-text leading-snug">{n.text}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={signOut} className="text-gray-400 hover:text-gray-600 transition-colors p-1.5" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8 max-w-[1200px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
