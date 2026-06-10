"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { FlickeringGrid } from "@/components/FlickeringGrid";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SmoothTransition } from "@/components/SectionTransition";

const slide = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

export default function Home() {
  return (
    <main>
      <BetaBanner />
      <Nav />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}

/* ========================================================
   BETA BANNER — full-width blue bar above navbar
   ======================================================== */

function BetaBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0f5bff]" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-center h-9 px-8">
        <p className="text-white text-sm font-light tracking-wide text-center">
          Trelo is in BETA. One line of code to stop agent loops, duplicates, and attacks.{" "}
          <a href="#" className="underline underline-offset-2 font-semibold hover:text-white/80 transition-colors">Join early access</a>
        </p>
      </div>
    </div>
  );
}

/* ========================================================
   NAV — transparent, all white, navbar style
   ======================================================== */

function Nav() {
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 1.8; // h-[180vh]
      setSwitched(window.scrollY > heroHeight * 0.2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = switched ? "text-black" : "text-white";
  const hoverColor = switched ? "hover:text-gray-500" : "hover:text-white/70";
  const bgColor = switched ? "bg-white/95 backdrop-blur-xl shadow-sm" : "bg-transparent";
  const strokeColor = switched ? "black" : "white";

  return (
    <nav
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-8">
        <a href="#" className={`font-bold text-xl tracking-tight transition-colors ${textColor}`}>
          Trelo
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a href="#features" className={`transition-colors ${textColor} ${hoverColor}`}>Features</a>
          <a href="#how-it-works" className={`transition-colors ${textColor} ${hoverColor}`}>How it works</a>
          <a href="#pricing" className={`transition-colors ${textColor} ${hoverColor}`}>Pricing</a>
        </div>
        <a
          href="#features"
          className={`inline-flex px-4 py-2 text-sm font-semibold transition-colors rounded-[3px] tracking-wide gap-3 ${textColor} ${hoverColor}`}
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <span className="text-left">Get started</span>
          <div className="flex justify-end">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </a>
      </div>
    </nav>
  );
}

/* ========================================================
   HERO — Michelangelo bg, bottom-left headline, top-right subtitle
   ======================================================== */

const MICHELANGELO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Creaci%C3%B3n_de_Ad%C3%A1n.jpg";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 22, mass: 1 });

  const clipPath = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [
    "inset(0% 0% 0% 0% round 0px)",
    "inset(0% 0% 0% 0% round 0px)",
    "inset(10% 18% 10% 18% round 24px)",
    "inset(26% 30% 26% 30% round 18px)",
  ]);
  const cardScale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1, 1, 0.93, 0.8]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.45, 0.8, 1], [1, 1, 0.2, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.55, 0.55, 0.3, 0.1]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={reduce ? {} : { clipPath, scale: cardScale }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            style={reduce ? { backgroundImage: `url(${MICHELANGELO_IMAGE})` } : { scale: bgScale, backgroundImage: `url(${MICHELANGELO_IMAGE})` }}
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          />
          <motion.div
            style={reduce ? {} : { opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950/80"
          />
        </motion.div>

        <motion.div
          style={reduce ? {} : { opacity: contentOpacity }}
          className="relative z-10 h-full pointer-events-none"
        >
          {/* Top right — tagline */}
          <div className="absolute top-16 md:top-30 right-6 md:right-16 text-right max-w-sm">
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-white font-medium text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              Stop infinite loops, prevent attacks, and cut token waste by 40-70%. One line of code.
            </motion.p>
          </div>

          {/* Bottom left — headline + button */}
          <div className="absolute bottom-16 md:bottom-24 left-6 md:left-16 max-w-2xl">
            <motion.h1
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-[3rem] md:text-6xl lg:text-[5rem] font-light tracking-[-0.03em] leading-[1.02] text-white mb-10"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              Trust middleware
              <br />
              for{" "}
              <span className="text-blue-600">AI agents</span>
            </motion.h1>

            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="pointer-events-auto"
            >
              <a
                href="#features"
                className="inline-flex flex-col justify-between pl-10 pr-4 md:pl-18 py-2 text-white text-sm font-semibold bg-[#0f5bff] hover:bg-[#0f5bff]/95 transition-colors rounded-[3px] tracking-wide gap-6"
                style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
              >
                <div className="flex justify-end">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <span className="text-right">Get started</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================
   FEATURES — asymmetric bento, varied shapes & prominence
   ======================================================== */

function FeaturesSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={ref} id="features" className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <SmoothTransition from="white" to="lavender" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...slide }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-trelo-text tracking-tight mb-4">
            Eight layers, one proxy
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            A thin middleware that sits between your agent framework and the world. Transparent, fast, comprehensive.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-4">
          {/* Large hero card — spans full width */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...slide }}
            className="lg:col-span-3 relative rounded-2xl bg-white border border-gray-100 p-8 md:p-10 overflow-hidden group"
          >
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
              <div>
                <div className="w-10 h-10 rounded-lg bg-trelo-accent/8 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-trelo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-trelo-text mb-3">Model-aware circuit breaking</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  When a tool fails, Trelo escalates to a stronger model with full failure context. Once the smart model fixes the issue, Trelo probes with the cheap one and resets the circuit. Result: 90% cost reduction on failures.
                </p>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { state: "CLOSED", color: "bg-green-50 text-green-700 ring-green-100/60", m: "Cheap model" },
                    { state: "OPEN", color: "bg-amber-50 text-amber-700 ring-amber-100/60", m: "Smart model" },
                    { state: "HALF_OPEN", color: "bg-blue-50 text-blue-700 ring-blue-100/60", m: "Probe" },
                  ].map((s) => (
                    <div key={s.state} className={`p-3 rounded-lg ring-1 ring-inset ${s.color}`}>
                      <div className="text-xs font-bold mb-0.5">{s.state}</div>
                      <div className="text-[10px] opacity-70">{s.m}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono flex-wrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />CLOSED
                  <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />OPEN
                  <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />HALF_OPEN
                </div>
              </div>
            </div>
          </motion.div>

          {/* Row: 3 varied cards */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...slide, delay: 0.06 }}
            className="relative rounded-2xl bg-white border border-gray-100 p-7 group hover:border-red-200/40 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-4.5 h-4.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-trelo-text mb-1.5">Agent firewall</h3>
            <p className="text-sm text-gray-500 leading-relaxed">SSRF prevention, PII redaction, 150+ prompt injection signatures.</p>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...slide, delay: 0.1 }}
            className="relative rounded-2xl bg-trelo-text text-white p-7 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-trelo-accent/20 blur-2xl -mr-8 -mt-8" />
            <div className="relative z-10">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25"/>
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-1.5">Cost optimization</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">Auto-downgrade at 80% budget. Hard stop at 100%.</p>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={67} suffix="%" />
              </div>
              <div className="text-xs text-gray-400 mt-0.5">avg. token savings</div>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...slide, delay: 0.14 }}
            className="relative rounded-2xl bg-white border border-gray-100 p-7 group hover:border-amber-200/40 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
              <svg className="w-4.5 h-4.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold text-trelo-text mb-1.5">Semantic deduplication</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Detects duplicate intent across rephrased tool calls. Prevents double charges, double sends.
            </p>
          </motion.div>
        </div>

        {/* Additional layer chips — below bento */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: "Trajectory recovery", desc: "Auto-inject hints on stagnation" },
            { name: "Idempotency", desc: "Exactly-once side-effect enforcement" },
            { name: "Audit trail", desc: "JSONL log, SOC2/ISO ready" },
            { name: "Deterministic testing", desc: "Replay traces, inject failures" },
            { name: "Cost policies", desc: "Per-agent budget enforcement" },
          ].map((l, i) => (
            <motion.div
              key={l.name}
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...slide, delay: 0.18 + i * 0.04 }}
              className="p-3 rounded-lg bg-white/60 ring-1 ring-inset ring-gray-900/5 hover:ring-trelo-accent/15 transition-all"
            >
              <div className="text-xs font-semibold text-trelo-text mb-0.5">{l.name}</div>
              <div className="text-[11px] text-gray-400 leading-snug">{l.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <SmoothTransition from="lavender" to="white" />
    </section>
  );
}

/* ========================================================
   STATS — big numbers, editorial spacing
   ======================================================== */

function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[80vh] flex items-center py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-center">
          {/* Left: label */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...slide }}
          >
            <p className="text-sm font-medium text-gray-400 font-mono tracking-wider mb-3">BY THE NUMBERS</p>
            <p className="text-2xl md:text-3xl font-semibold text-trelo-text leading-snug">
              Real results from production deployments.
            </p>
          </motion.div>

          {/* Right: big stats */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-14">
            {[
              { value: 70, suffix: "%", label: "token waste reduction" },
              { value: 90, suffix: "%", label: "cost reduction on failures" },
              { value: 150, suffix: "+", label: "security signatures" },
              { value: 8, suffix: "", label: "protection layers active" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...slide, delay: i * 0.08 }}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-trelo-text tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-medium mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   HOW IT WORKS — staggered cards + terminal on side
   ======================================================== */

function HowItWorksSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} id="how-it-works" className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0 pointer-events-none">
        <FlickeringGrid
          squareSize={4}
          gridGap={7}
          color="rgb(139, 92, 246)"
          maxOpacity={0.06}
          flickerChance={0.08}
          className="absolute inset-0"
          maskImage="radial-gradient(ellipse 50% 40% at 50% 50%, black 8%, transparent 75%)"
        />
      </motion.div>

      <SmoothTransition from="white" to="lavender" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...slide }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-trelo-text tracking-tight mb-4">
            Three lines to production
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            No config files. No infrastructure changes. Works with any agent framework.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left: staggered steps */}
          <div className="space-y-5">
            {[
              {
                label: "Install",
                detail: "One command. Python, FastAPI, SQLite. No external services needed.",
                code: "pip install trelo",
              },
              {
                label: "Start the proxy",
                detail: "Lightweight proxy server. All 8 layers active immediately.",
                code: "trelo serve --port 8000",
              },
              {
                label: "Point your agent",
                detail: "Change one line in your agent config. Everything else stays the same.",
                code: 'agent = Agent(base_url="http://localhost:8000/v1")',
              },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={reduce ? {} : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...slide, delay: i * 0.08 }}
                className={`flex gap-5 ${i !== 0 ? "ml-6 md:ml-10" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-white ring-1 ring-inset ring-gray-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-500">{i + 1}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-semibold text-trelo-text mb-1">{step.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">{step.detail}</p>
                  <code className="inline-block px-2.5 py-1 rounded bg-gray-50 font-mono text-xs text-gray-600">
                    {step.code}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: terminal */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...slide, delay: 0.15 }}
          >
            <div className="rounded-xl bg-gray-900 shadow-2xl overflow-hidden border border-gray-800">
              <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-800/80 border-b border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-gray-500 font-mono ml-3">shell</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed space-y-3.5">
                <div>
                  <div className="text-gray-500 text-[11px] mb-0.5"># Install</div>
                  <div className="text-green-400"><span className="text-gray-600">$</span> pip install trelo</div>
                </div>
                <div>
                  <div className="text-gray-500 text-[11px] mb-0.5"># Start the proxy</div>
                  <div className="text-green-400"><span className="text-gray-600">$</span> trelo serve --port 8000</div>
                </div>
                <div>
                  <div className="text-gray-500 text-[11px] mb-0.5"># Point your agent</div>
                  <div className="text-blue-400">
                    agent = Agent(<br/>
                    {"  "}base_url=<span className="text-amber-400">"http://localhost:8000/v1"</span><br/>
                    )
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-800 flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">8 protection layers active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SmoothTransition from="lavender" to="white" />
    </section>
  );
}

/* ========================================================
   PRICING — asymmetric stack
   ======================================================== */

function PricingSection() {
  const reduce = useReducedMotion();

  const plans = [
    {
      name: "Open source",
      price: "Free",
      period: " — forever",
      features: ["Core proxy", "Circuit breaker", "Loop detection", "Audit logging"],
      cta: "Star on GitHub",
      prominent: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: ["Everything in Open Source", "Semantic dedup", "Trajectory recovery", "Model-aware routing", "Dashboard"],
      cta: "Get started",
      prominent: true,
    },
    {
      name: "Team",
      price: "$299",
      period: "/month",
      features: ["Everything in Pro", "Agent firewall", "Cost policies", "A/B testing", "Team dashboard"],
      cta: "Start free trial",
      prominent: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Everything in Team", "SOC2/ISO compliance", "SSO/SAML", "Dedicated tenant", "SLA & support"],
      cta: "Contact sales",
      prominent: false,
    },
  ];

  return (
    <section id="pricing" className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 w-full">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...slide }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-trelo-text tracking-tight mb-4">
            Start free, scale when ready
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Open source core. Upgrade for advanced protection layers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={reduce ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...slide, delay: i * 0.06 }}
              className={`relative rounded-xl p-6 transition-all ${
                plan.prominent
                  ? "bg-trelo-text text-white shadow-xl lg:scale-[1.03] lg:-mt-2 lg:-mb-2"
                  : "bg-white border border-gray-100 hover:border-trelo-accent/20"
              }`}
            >
              <p className={`text-sm font-semibold mb-2 ${plan.prominent ? "text-white" : "text-trelo-text"}`}>
                {plan.name}
              </p>
              <div className="mb-5">
                <span className={`text-2xl font-bold ${plan.prominent ? "text-white" : "text-trelo-text"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.prominent ? "text-gray-400" : "text-gray-400"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-trelo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.prominent ? "text-gray-200" : "text-gray-500"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block w-full text-center py-2.5 rounded-md text-sm font-medium transition-all active:scale-[0.98] ${
                  plan.prominent
                    ? "bg-white text-trelo-text hover:bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-100 text-trelo-text"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   CTA — centered typography moment
   ======================================================== */

function CTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-32 overflow-hidden section-fade-to-lavender">
      <FlickeringGrid
        squareSize={4}
        gridGap={6}
        color="rgb(139, 92, 246)"
        maxOpacity={0.08}
        flickerChance={0.1}
        className="absolute inset-0"
        maskImage="radial-gradient(ellipse 50% 50% at 50% 50%, black 8%, transparent 75%)"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...slide }}
          className="text-3xl md:text-5xl font-bold text-trelo-text tracking-tight mb-6"
        >
          One line of code.
          <br />
          <span className="text-accent">Eight layers of protection.</span>
        </motion.h2>
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...slide, delay: 0.08 }}
          className="text-lg text-gray-500 mb-10 max-w-lg mx-auto"
        >
          Your agents should ship fast, not burn your API budget at 3 AM.
        </motion.p>
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...slide, delay: 0.16 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href="https://github.com" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-trelo-text hover:bg-trelo-text/90 text-white text-sm font-medium transition-colors active:scale-[0.98]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Star on GitHub
          </a>
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-200 hover:border-gray-300 text-trelo-text text-sm font-medium transition-colors active:scale-[0.98]">View pricing</a>
        </motion.div>
      </div>

      <SmoothTransition from="lavender" to="white" />
    </section>
  );
}

/* ========================================================
   FOOTER
   ======================================================== */

function FooterSection() {
  return (
    <footer className="py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-trelo-text flex items-center justify-center text-white text-xs font-bold">T</span>
            <div>
              <p className="text-sm font-semibold text-trelo-text">Trelo</p>
              <p className="text-xs text-gray-400">Trust middleware for AI agents</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-12 text-sm">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Product</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Docs</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Company</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Legal</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-trelo-text transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
