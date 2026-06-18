"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, BookOpen, ChevronDown, Zap, DollarSign, Mail, Shield, FileText, ShieldCheck } from "lucide-react";

interface NavBarProps {
  scrollSwitch?: boolean;
}

interface DropdownLink {
  title: string;
  href: string;
  desc: string;
  icon?: React.ElementType;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const productLinks: DropdownLink[] = [
  { title: "Features", href: "/#features", desc: "Nine protection layers for your AI agents.", icon: Layers },
  { title: "How it works", href: "/#how-it-works", desc: "Two steps, zero config.", icon: Zap },
  { title: "Pricing", href: "/#pricing", desc: "Start free, scale when ready.", icon: DollarSign },
];

const resourceLinks: DropdownLink[] = [
  { title: "Documentation", href: "/docs", desc: "Integration guides, API reference.", icon: BookOpen },
  { title: "Discord", href: "https://discord.gg/UTXTN5krm", desc: "Real-time community support.", icon: DiscordIcon },
  { title: "GitHub", href: "https://github.com", desc: "Open source. MIT licensed.", icon: GitHubIcon },
];

const companyLinks: DropdownLink[] = [
  { title: "Contact", href: "/contact", desc: "hello@trelo.cc", icon: Mail },
  { title: "Privacy", href: "/legal/privacy", desc: "How we handle data.", icon: Shield },
  { title: "Terms", href: "/legal/terms", desc: "Rules for using Trelo.", icon: FileText },
  { title: "Security", href: "/legal/security", desc: "Encryption & compliance.", icon: ShieldCheck },
];

function NavDropdown({
  label,
  links,
  isTransparent,
}: {
  label: string;
  links: DropdownLink[];
  isTransparent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const onLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const baseColor = isTransparent ? "text-white/90" : "text-gray-600";
  const hoverColor = isTransparent ? "hover:text-white" : "hover:text-gray-900";

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`flex items-center gap-1 py-2 text-[13px] font-light tracking-wide transition-colors cursor-pointer bg-transparent border-none outline-none ${baseColor} ${hoverColor} ${
          open ? (isTransparent ? "text-white" : "text-blue-600") : ""
        }`}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown className={`w-3 h-3 ${isTransparent ? "text-white/40" : "text-gray-300"}`} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
          >
            <div className="bg-white rounded-lg border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] py-2 min-w-[260px] overflow-hidden">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50/80 transition-colors group"
                >
                  {link.icon && (
                    <link.icon className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-0.5 flex-shrink-0 transition-colors" />
                  )}
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NavBar({ scrollSwitch = false }: NavBarProps) {
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    if (!scrollSwitch) return;
    const onScroll = () => {
      setSwitched(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollSwitch]);

  const isTransparent = scrollSwitch && !switched;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      {scrollSwitch && (
        <div className="bg-[#0f5bff]">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center py-1.5 px-8">
            <p className="text-white text-[11px] font-light tracking-wide text-center">
              Trelo is in beta — early access members get priority onboarding and bonus credits.{" "}
              <a href="/#waitlist" className="underline underline-offset-2 font-medium hover:text-white/80 transition-colors">
                Join early access
              </a>
            </p>
          </div>
        </div>
      )}

      <nav
        className={`transition-all duration-400 ${
          isTransparent
            ? "bg-transparent backdrop-blur-[2px]"
            : "bg-white/70 backdrop-blur-2xl border-b border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            className={`font-semibold text-xl tracking-tight transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-trelo-text"
            }`}
          >
            Trelo
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavDropdown label="Product" links={productLinks} isTransparent={isTransparent} />
            <NavDropdown label="Resources" links={resourceLinks} isTransparent={isTransparent} />
            <NavDropdown label="Company" links={companyLinks} isTransparent={isTransparent} />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/#waitlist"
              className={`hidden sm:inline-flex text-[13px] font-medium transition-colors ${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Join waitlist
            </a>
            <Link
              href="/login"
              className={`text-[13px] font-medium rounded-[3px] px-4 py-1.5 transition-all duration-300 ${
                isTransparent
                  ? "text-white bg-white/15 hover:bg-white/25"
                  : "text-trelo-text bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
