"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, BookOpen, Users, ExternalLink, ChevronDown } from "lucide-react";

interface NavBarProps {
  scrollSwitch?: boolean;
}

interface DropdownLink {
  title: string;
  href: string;
  desc: string;
  icon?: React.ElementType;
}

const productLinks: DropdownLink[] = [
  { title: "Features", href: "/#features", desc: "Nine protection layers for your AI agents.", icon: Layers },
  { title: "How it works", href: "/#how-it-works", desc: "Two steps, zero config." },
  { title: "Pricing", href: "/#pricing", desc: "Start free, scale when ready." },
];

const resourceLinks: DropdownLink[] = [
  { title: "Documentation", href: "/docs", desc: "Integration guides, API reference." },
  { title: "Discord", href: "https://discord.gg/UTXTN5krm", desc: "Real-time community support.", icon: ExternalLink },
  { title: "GitHub", href: "https://github.com", desc: "Open source. MIT licensed.", icon: ExternalLink },
];

const companyLinks: DropdownLink[] = [
  { title: "Contact", href: "/contact", desc: "hello@trelo.cc" },
  { title: "Privacy", href: "/legal/privacy", desc: "How we handle data." },
  { title: "Terms", href: "/legal/terms", desc: "Rules for using Trelo." },
  { title: "Security", href: "/legal/security", desc: "Encryption & compliance." },
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
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
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
