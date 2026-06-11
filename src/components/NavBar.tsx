"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavBarProps {
  scrollSwitch?: boolean;
}

interface DropdownLink {
  title: string;
  href: string;
  desc: string;
}

const productLinks: DropdownLink[] = [
  { title: "Features", href: "/#features", desc: "Eight protection layers for your AI agents." },
  { title: "How it works", href: "/#how-it-works", desc: "Two steps, zero config." },
  { title: "Pricing", href: "/#pricing", desc: "Start free, scale when ready." },
];

const resourceLinks: DropdownLink[] = [
  { title: "Documentation", href: "/docs", desc: "Integration guides, API reference, deployment." },
  { title: "Discord", href: "https://discord.gg/UTXTN5krm", desc: "Real-time community support." },
  { title: "GitHub", href: "https://github.com", desc: "Open source. MIT licensed." },
];

const companyLinks: DropdownLink[] = [
  { title: "Contact", href: "/contact", desc: "Email us at hello@trelo.cc" },
  { title: "Privacy", href: "/legal/privacy", desc: "How we handle your data." },
  { title: "Terms", href: "/legal/terms", desc: "Rules for using Trelo." },
  { title: "Security", href: "/legal/security", desc: "Encryption, compliance, vuln reporting." },
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
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  };

  const baseColor = isTransparent ? "text-white" : "text-gray-700";
  const hoverColor = isTransparent ? "hover:text-white/90" : "hover:text-gray-900";

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`flex items-center gap-1 py-2 text-[13px] font-light tracking-wide transition-colors cursor-pointer bg-transparent border-none outline-none ${baseColor} ${hoverColor} ${
          open ? (isTransparent ? "text-white" : "text-blue-600") : ""
        }`}
      >
        {label}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`w-2.5 h-2.5 ${isTransparent ? "text-white/50" : "text-gray-300"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5"
          >
            <div className="bg-white rounded-lg border border-gray-100/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] py-1.5 min-w-[240px]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-left hover:bg-gray-50 transition-colors group"
                >
                  <p className="text-[13px] font-normal text-gray-800 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{link.desc}</p>
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
      setSwitched(window.scrollY > window.innerHeight * 0.36);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollSwitch]);

  const isTransparent = scrollSwitch && !switched;
  const bgColor = isTransparent ? "bg-transparent" : "bg-white/90 backdrop-blur-md border-b border-gray-100/50";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      {scrollSwitch && (
        <div className="bg-[#0f5bff]">
          <div className="max-w-[1400px] mx-auto flex items-center justify-center py-1.5 px-8">
            <p className="text-white text-[11px] font-light tracking-wide text-center">
              Trelo is in BETA — one line of code to stop agent loops, duplicates, and attacks.{" "}
              <a href="#" className="underline underline-offset-2 font-medium hover:text-white/80 transition-colors">
                Join early access
              </a>
            </p>
          </div>
        </div>
      )}

      <nav className={`transition-all duration-300 ${bgColor}`}>
        <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            className={`font-semibold text-xl tracking-tight transition-colors ${
              isTransparent ? "text-white" : "text-trelo-text"
            }`}
          >
            Trelo
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <NavDropdown label="Product" links={productLinks} isTransparent={isTransparent} />
            <NavDropdown label="Resources" links={resourceLinks} isTransparent={isTransparent} />
            <NavDropdown label="Company" links={companyLinks} isTransparent={isTransparent} />
          </div>

          <Link
            href="/login"
            className={`text-[13px] font-medium tracking-wide transition-colors ${
              isTransparent
                ? "text-white hover:text-white/80"
                : "text-trelo-text hover:text-gray-500"
            }`}
          >
            Sign in →
          </Link>
        </div>
      </nav>
    </div>
  );
}
