"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { FlickeringGrid } from "@/components/FlickeringGrid";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SmoothTransition } from "@/components/SectionTransition";
import { DitherShader } from "@/components/ui/dither-shader";

const slide = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

export default function Home() {
  return (
    <main>
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
    <div className="bg-[#0f5bff]" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-center py-1.5 px-8">
        <p className="text-white text-xs font-light tracking-wide text-center">
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
      const heroHeight = window.innerHeight * 1.8;
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
    <div className="fixed top-0 left-0 right-0 z-50" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <BetaBanner />
      <nav
        className={`transition-all duration-300 ${bgColor}`}
      >
        <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-8">
          <a href="#" className={`font-light text-2xl tracking-tight transition-colors ${textColor}`}>
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
    </div>
  );
}

/* ========================================================
   HERO — Michelangelo bg, bottom-left headline, top-right subtitle
   ======================================================== */

const MICHELANGELO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Creaci%C3%B3n_de_Ad%C3%A1n.jpg";
const SCHOOL_OF_ATHENS_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg";

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
          <div className="absolute top-30 right-6 md:right-16 text-right max-w-sm">
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
   FEATURES — angled cards, eight layers orbiting the heading
   ======================================================== */

const FEATURE_CARDS = [
  { label: "L1", title: "Infinite Loops", desc: "Agents hammer the same broken tool call hundreds of times while you watch the meter run.", color: "bg-blue-500" },
  { label: "L2", title: "Prompt Injection", desc: "Malicious user input tricks your agent into deleting data or calling unauthorized APIs.", color: "bg-red-500" },
  { label: "L3", title: "Runaway Spend", desc: "You discover the $4,000 API bill on Monday morning with zero idea which agent caused it.", color: "bg-amber-500" },
  { label: "L4", title: "Duplicate Actions", desc: "The same agent charges a customer twice because it lost track of what it just did.", color: "bg-green-500" },
  { label: "L5", title: "No Side effects safety", desc: "Emails send twice. Orders place twice. Database writes happen twice. Every retry is a disaster.", color: "bg-purple-500" },
  { label: "L6", title: "Black Box Audits", desc: "An agent makes a bad decision at 3 AM and you have zero logs to explain why.", color: "bg-pink-500" },
  { label: "L7", title: "Silent Failures", desc: "The agent stops responding mid-task. No error. No timeout. Just silence and a stuck customer.", color: "bg-indigo-500" },
  { label: "L8", title: "Retry Storms", desc: "One failing API triggers a cascade of retries that burns your monthly budget in 20 minutes.", color: "bg-teal-500" },
];

function FeaturesSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const [offsets, setOffsets] = useState<{ tx: number; ty: number }[]>([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current || !gridRef.current) return;
    hasMounted.current = true;
    const grid = gridRef.current;
    const gridRect = grid.getBoundingClientRect();
    const originX = gridRect.left + gridRect.width / 2;
    const originY = gridRect.bottom + 40;
    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");
    const offs: { tx: number; ty: number }[] = [];
    cards.forEach((el) => {
      const r = el.getBoundingClientRect();
      offs.push({
        tx: originX - (r.left + r.width / 2),
        ty: originY - (r.top + r.height / 2),
      });
    });
    setOffsets(offs);
  }, []);

  return (
    <section ref={ref} id="features" className="relative min-h-[140dvh] flex flex-col justify-center overflow-hidden bg-white">
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full pb-30 sm:pb-16">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...slide }}
            className="relative z-20 text-center mb-8 sm:mb-12"
            style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light text-trelo-text tracking-[-0.03em] leading-[1.05]">
              Eight problems.
              <br />
              <span className="text-blue-600">One proxy.</span>
            </h2>
          </motion.div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-[920px] mx-auto">
            {FEATURE_CARDS.map((card, i) => {
              const start = 0.2 + i * 0.02;
              const end = start + 0.1;
              const tx = useTransform(scrollYProgress, reduce || offsets.length === 0 ? [0, 1] : [start, end], reduce || offsets.length === 0 ? [0, 0] : [offsets[i]?.tx ?? 0, 0]);
              const ty = useTransform(scrollYProgress, reduce || offsets.length === 0 ? [0, 1] : [start, end], reduce || offsets.length === 0 ? [0, 0] : [offsets[i]?.ty ?? 0, 0]);
              const opacity = useTransform(scrollYProgress, [start, start + 0.06], [0, 1]);
              const scale = useTransform(scrollYProgress, [start, start + 0.15], [0.2, 1]);

              return (
                <motion.div
                  key={card.label}
                  data-card
                  style={reduce ? { fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" } : { x: tx, y: ty, opacity, scale, fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                  className="flex flex-col items-center text-center bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5"
                >
                  <h3 className="text-sm font-semibold text-trelo-text mb-1.5">{card.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    
  );
}

/* ========================================================
   STATS — big numbers, editorial spacing
   ======================================================== */

function StatsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden bg-white">
      <DitherShader
        src={SCHOOL_OF_ATHENS_IMAGE}
        gridSize={2}
        ditherMode="bayer"
        colorMode="grayscale"
        invert={true}
        animated={false}
        primaryColor="#000000"
        secondaryColor="#ffffff"
        threshold={0.5}
        className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-center">
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...slide }}
            style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
          >
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...slide, delay: 0.05 }}
              className="text-xs font-semibold text-blue-600 tracking-widest mb-4"
            >
              BY THE NUMBERS
            </motion.p>
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...slide, delay: 0.12 }}
              className="text-2xl md:text-3xl font-semibold text-trelo-text leading-snug"
            >
              What we're seeing in private beta.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-14">
            {[
              { value: 70, suffix: "%", label: "Token waste reduction", gradient: "from-blue-500 to-blue-600" },
              { value: 90, suffix: "%", label: "Failure cost reduction", gradient: "from-green-500 to-teal-500" },
              { value: 150, suffix: "+", label: "Security signatures", gradient: "from-red-500 to-pink-500" },
              { value: 4, suffix: "", label: "Protection layers deployed", gradient: "from-purple-500 to-indigo-500" },
            ].map((s, i) => {
              const cardStart = 0.02 + i * 0.07;
              const cardOpacity = useTransform(scrollYProgress, [cardStart, cardStart + 0.25], [0, 1]);
              const cardY = useTransform(scrollYProgress, [cardStart, cardStart + 0.25], [40, 0]);
              const cardScale = useTransform(scrollYProgress, [cardStart, cardStart + 0.25], [0.85, 1]);

              return (
                <motion.div
                  key={s.label}
                  style={reduce ? {} : { opacity: cardOpacity, y: cardY, scale: cardScale }}
                  className="relative"
                >
                  <div className={`absolute -top-3 left-0 w-12 h-1 rounded-full bg-[#0f5bff] opacity-60`} />
                  <div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-trelo-text tracking-tight"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    className="text-sm text-gray-400 font-medium mt-2"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
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
    <section className="relative py-32 overflow-hidden section-fade-to-blue">
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

      <SmoothTransition from="blue" to="white" />
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
