"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { FlickeringGrid } from "@/components/FlickeringGrid";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DitherShader } from "@/components/ui/dither-shader";
import { Terminal } from "@/components/ui/terminal";
import { SmoothTransition } from "@/components/SectionTransition";
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
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

            <HeroHoverButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroHoverButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="pointer-events-auto relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ghost border 1 — wider */}
      <motion.div
        className="absolute inset-0 rounded-[3px] border-2 border-white pointer-events-none"
        animate={hovered ? { x: 12, y: -12, opacity: 0.4 } : { x: 0, y: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />
      {/* Ghost border 2 — even wider */}
      <motion.div
        className="absolute inset-0 rounded-[3px] border border-white pointer-events-none"
        animate={hovered ? { x: 20, y: -20, opacity: 0.3 } : { x: 0, y: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 12 }}
      />
      {/* Button */}
      <motion.a
        href="#features"
        animate={hovered ? { x: 8, y: -8 } : { x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative inline-flex flex-col justify-between pl-10 pr-4 md:pl-18 py-2 text-white text-sm font-semibold bg-[#0f5bff] rounded-[3px] tracking-wide gap-6"
        style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
      >
        <motion.div
          className="flex justify-end"
          animate={hovered ? { scale: 1.25, rotate: 6 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.div>
        <span className="text-right">Get started</span>
      </motion.a>
    </div>
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
                >
                  <HoverableCard card={card} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    
  );
}

function HoverableCard({ card }: { card: typeof FEATURE_CARDS[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        animate={hovered ? { y: -6, x: 2, rotateZ: -0.5 } : { y: 0, x: 0, rotateZ: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col items-center text-center bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-default"
        style={{
          boxShadow: hovered
            ? "0 8px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)"
            : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        }}
      >
        <h3 className="text-sm font-semibold text-trelo-text mb-1.5" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          {card.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          {card.desc}
        </p>
      </motion.div>
    </div>
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
        primaryColor="#0f5bff"
        secondaryColor="#000000"
        threshold={0.8}
        className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-center">
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
                    className="text-5xl md:text-6xl lg:text-7xl font-thin text-trelo-text tracking-tight"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    className="text-sm text-gray-700 font-medium mt-2"
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
          color="rgb(15, 91, 255)"
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
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <h2 className="text-3xl md:text-5xl font-thin text-trelo-text tracking-[-0.03em] leading-[1.05] mb-4">
            Two steps.
            <br />
            <span className="font-thin text-blue-600">Zero config.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="space-y-10">
            {[
              {
                label: "Install the guard",
                detail: "One command. Python, FastAPI, SQLite. No external services, no config files, no infrastructure changes.",
                code: "pip install trelo",
                badge: "Setup once",
              },
              {
                label: "Wrap your agent",
                detail: "Add one line to your agent code. Circuit breakers, dedup, firewall, and audit trail activate immediately.",
                code: 'agent = Agent(guard="trelo")',
                badge: "Runtime",
              },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                initial={reduce ? {} : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...slide, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xs bg-white ring-1 ring-inset ring-gray-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{i + 1}</span>
                  </div>
                </div>
                <div className="pt-0.5 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-trelo-text">{step.label}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{step.detail}</p>
                  <code className="inline-block px-3 py-1.5 rounded-lg bg-gray-50 font-mono text-xs text-gray-600 ring-1 ring-inset ring-gray-100">
                    {step.code}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...slide, delay: 0.15 }}
          >
            <Terminal
              commands={[
                "pip install trelo",
                "trelo serve --port 8000",
                'agent = Agent(base_url="http://localhost:8000/v1")',
              ]}
              outputs={{
                0: ["✔ Installing trelo...", "✔ 8 protection layers ready."],
                1: ["✔ Proxy running on port 8000", "✔ All layers active"],
                2: ["✔ Agent connected", "✔ 8 layers protecting your agent"],
              }}
              typingSpeed={40}
              delayBetweenCommands={800}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   PRICING
   ======================================================== *//* ========================================================
   PRICING — clean 3-column, center aligned, Enterprise below
   ======================================================== */

function PricingSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const plans = [
    { name: "Free", price: "$0", desc: "For experimenting.", cta: "Star on GitHub", icon: null, features: ["10K/mo", "3", "7 days", false, false, false, false, "Basic", "Basic"] },
    { name: "Pro", price: "$29", period: "/mo", desc: "For indie devs shipping products.", cta: "Get started", icon: MoveRight, prominent: true, features: ["100K/mo", "10", "30 days", false, true, true, false, "Advanced", "Advanced"] },
    { name: "Team", price: "$299", period: "/mo", desc: "For teams at scale.", cta: "Start trial", icon: MoveRight, features: ["500K/mo", "Unlimited", "90 days", true, true, true, false, "Team", "Advanced"] },
  ];

  const featureLabels = [
    "Requests / month",
    "Agents",
    "Log retention",
    "SSO",
    "Cost policies",
    "Testing sandbox",
    "Compliance reports",
    "Dashboard",
    "Model routing",
  ];

  return (
    <section ref={ref} id="pricing" className="relative py-20 lg:py-40 overflow-hidden bg-white">
      <div className="max-w-[1000px] mx-auto px-6 w-full">
        <div className="flex flex-col items-center gap-4 text-center mb-16" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">PRICING</span>
          <h2 className="text-3xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] leading-[1.05]">
            Start free.
            <br />
            <span className="text-blue-600 font-normal">Scale when ready.</span>
          </h2>
        </div>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden md:block border border-gray-100 rounded-xl overflow-hidden mx-auto" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] bg-gray-50">
            <div className="p-6" />
            {plans.map((plan) => (
              <div key={plan.name} className={`p-6 flex flex-col items-center text-center gap-2 ${plan.prominent ? "bg-blue-50/60" : ""}`}>
                <p className={`text-sm font-semibold tracking-wide ${plan.prominent ? "text-blue-600" : "text-gray-500"}`}>{plan.name}</p>
                <p className="flex items-baseline gap-1">
                  <span className={`text-4xl font-light tracking-[-0.02em] ${plan.prominent ? "text-blue-600" : "text-trelo-text"}`}>{plan.price}</span>
                  {plan.period && <span className="text-sm font-light text-gray-400">{plan.period}</span>}
                </p>
                <p className="text-xs font-light text-gray-400">{plan.desc}</p>
                <a href="#" className={`inline-flex items-center justify-center gap-2 mt-3 py-2.5 px-5 rounded-[3px] text-sm font-normal transition-colors ${plan.prominent ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-trelo-text"}`}>
                  {plan.cta}{plan.icon && <plan.icon className="w-3.5 h-3.5" />}
                </a>
              </div>
            ))}
          </div>
          {featureLabels.map((label, ri) => (
            <div key={label} className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] ${ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="p-3.5 text-sm font-medium text-gray-500 flex items-center">{label}</div>
              {plans.map((plan, pi) => {
                const val = plan.features[ri];
                const isCheck = typeof val === "boolean";
                return (
                  <div key={pi} className={`p-3.5 flex items-center justify-center ${plan.prominent ? "bg-blue-50/20" : ""}`}>
                    {isCheck ? (val ? <Check className="w-4 h-4 text-green-600" /> : <Minus className="w-4 h-4 text-gray-300" />) : (
                      <span className={`text-sm font-light ${plan.prominent ? "text-blue-700" : "text-gray-600"}`}>{val}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile pricing cards */}
        <div className="md:hidden space-y-4" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          {plans.map((plan) => (
            <div key={plan.name} className={`border rounded-xl p-5 ${plan.prominent ? "border-blue-200 bg-blue-50/40" : "border-gray-100"}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-sm font-semibold ${plan.prominent ? "text-blue-600" : "text-gray-500"}`}>{plan.name}</p>
                  <p className="flex items-baseline gap-1 mt-0.5">
                    <span className={`text-3xl font-light tracking-[-0.02em] ${plan.prominent ? "text-blue-600" : "text-trelo-text"}`}>{plan.price}</span>
                    {plan.period && <span className="text-sm font-light text-gray-400">{plan.period}</span>}
                  </p>
                </div>
                <a href="#" className={`inline-flex items-center gap-2 py-2 px-4 rounded-[3px] text-xs font-normal ${plan.prominent ? "bg-blue-600 text-white" : "bg-gray-100 text-trelo-text"}`}>
                  {plan.cta}{plan.icon && <plan.icon className="w-3 h-3" />}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {featureLabels.map((label, ri) => {
                  const val = plan.features[ri];
                  const isCheck = typeof val === "boolean";
                  return (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 font-light">{label}</span>
                      {isCheck ? (val ? <Check className="w-3 h-3 text-green-600 ml-auto" /> : <Minus className="w-3 h-3 text-gray-300 ml-auto" />) : (
                        <span className="text-gray-600 font-light ml-auto">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise card — below the table */}
        <div className="flex justify-center mt-6">
          <div className="border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center gap-2 bg-gray-50/50 max-w-sm w-full" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">Enterprise</span>
            <span className="text-2xl font-light text-trelo-text">Custom</span>
            <p className="text-xs font-light text-gray-400">Dedicated support, SSO, compliance reports, unlimited everything.</p>
            <a href="#" className="inline-flex items-center justify-center gap-2 mt-2 py-2.5 px-5 rounded-[3px] text-sm font-normal bg-white border border-gray-200 hover:border-gray-300 text-trelo-text transition-colors">
              Contact us <PhoneCall className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <motion.div
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slide, delay: 0.3 }}
          className="text-center mt-10"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <p className="text-sm font-light text-gray-500">
            Open source? Self-host Trelo for free. MIT licensed.{" "}
            <a href="https://github.com" target="_blank" className="text-blue-600 font-normal hover:underline underline-offset-2">GitHub →</a>
          </p>
        </motion.div>
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...slide }}
          className="text-3xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] leading-[1.05] mb-6"
        >
          One line of code.
          <br />
          <span className="text-blue-600 font-normal">Eight layers of protection.</span>
        </motion.h2>
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...slide, delay: 0.08 }}
          className="text-lg text-gray-400 font-light mb-10 max-w-lg mx-auto"
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
          <a href="https://github.com" target="_blank" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-blue-600 hover:bg-blue-500 text-white text-sm font-normal transition-colors">
            Star on GitHub
          </a>
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] border border-gray-200 hover:border-gray-300 text-trelo-text text-sm font-normal transition-colors">
            View pricing
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================
   FOOTER
   ======================================================== */

function FooterSection() {
  return (
    <footer className="py-16 bg-gray-50 border-t border-gray-100" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <a href="#" className="text-trelo-text font-medium text-xl tracking-tight">Trelo</a>
            <p className="text-sm font-light text-gray-400 mt-3 leading-relaxed">
              Trust middleware for AI agents. One line of code, eight layers of protection.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Product</p>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Pricing</a></li>
                <li><a href="/docs" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Docs</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Company</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">About</a></li>
                <li><a href="#" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-3">Legal</p>
              <ul className="space-y-2">
                <li><a href="/legal/privacy" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Privacy</a></li>
                <li><a href="/legal/terms" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Terms</a></li>
                <li><a href="/legal/security" className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-gray-400">© {new Date().getFullYear()} Trelo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-trelo-text transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
