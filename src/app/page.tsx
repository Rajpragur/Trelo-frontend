"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import NavBar from "@/components/NavBar";
import { FlickeringGrid } from "@/components/FlickeringGrid";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DitherShader } from "@/components/ui/dither-shader";
import { Terminal } from "@/components/ui/terminal";
import { WaitlistCounter } from "@/components/WaitlistCounter";
import { WaitlistSection } from "@/components/WaitlistSection";
import { GitHubStars } from "@/components/GitHubStars";
import { WaitlistCountProvider, useWaitlistCount } from "@/lib/waitlist-count";
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
const MICHELANGELO_SRC = "/michelangelo_image.jpg";
const SCHOOL_OF_ATHENS_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg";

const slide = { duration: 0.7, ease: [0.22, 1, 0.36, 1] } as const;

export default function Home() {
  useEffect(() => {
    const onPageshow = () => {
      window.dispatchEvent(new Event("scroll"));
    };
    window.addEventListener("pageshow", onPageshow);
    return () => window.removeEventListener("pageshow", onPageshow);
  }, []);

  return (
    <WaitlistCountProvider>
      <main>
        <NavBar scrollSwitch />
        <Hero />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <WaitlistSection />
        <PricingSection />
        <CTASection />
        <FooterSection />
      </main>
    </WaitlistCountProvider>
  );
}

/* ========================================================
   HERO
   ======================================================== */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 18,
    mass: 0.8,
  });

  const clipPath = useTransform(
    smoothProgress,
    [0, 0.08, 0.35, 0.6, 1],
    [
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(8% 14% 8% 14% round 20px)",
      "inset(20% 26% 20% 26% round 16px)",
      "inset(28% 32% 28% 32% round 12px)",
    ]
  );
  const cardScale = useTransform(smoothProgress, [0, 0.08, 0.35, 0.6, 1], [1, 1, 0.95, 0.84, 0.78]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.05, 0.25, 0.45, 1], [1, 1, 0.3, 0, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.08, 0.5, 1], [0.55, 0.55, 0.1, 0.03]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={
            reduce
              ? {}
              : { clipPath, scale: cardScale, willChange: "transform, clip-path" }
          }
          className="absolute inset-0 overflow-hidden"
        >
          <HeroBackground reduce={reduce} bgScale={bgScale} />
          <motion.div
            style={reduce ? {} : { opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950/80"
          />
        </motion.div>

        <motion.div
          style={reduce ? {} : { opacity: contentOpacity, willChange: "opacity" }}
          className="relative z-10 h-full pointer-events-none"
        >
          <div className="absolute bottom-12 md:bottom-24 left-4 right-4 md:left-16 md:right-auto max-w-2xl">
            <motion.h1
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-[2.2rem] xs:text-[2.8rem] sm:text-[3.5rem] md:text-6xl lg:text-[5rem] font-light tracking-[-0.03em] leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              Trust middleware
              <br />
              for <span className="text-blue-600">AI agents</span>
            </motion.h1>
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="text-white/90 text-sm md:text-base font-light mb-7 max-w-md leading-relaxed"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              The runtime safety layer that stops agent loops, blocks attacks,
              and slashes your API bill — all in one line of code.
            </motion.p>
            <HeroWaitlistCapture reduce={reduce} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const HeroBackground = memo(function HeroBackground({
  reduce,
  bgScale,
}: {
  reduce: boolean | null;
  bgScale: any;
}) {
  const [loaded, setLoaded] = useState(false);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBgImage(`url(${MICHELANGELO_SRC})`);
      setLoaded(true);
    };
    img.src = MICHELANGELO_SRC;
    return () => {
      img.onload = null;
    };
  }, []);

  const style: React.CSSProperties = reduce
    ? { backgroundImage: bgImage || undefined }
    : { scale: bgScale as any, backgroundImage: bgImage || undefined };

  return (
    <div
      className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-opacity duration-500"
      style={style}
    >
      {!loaded && <div className="absolute inset-0 bg-gray-950" />}
    </div>
  );
});

function HeroWaitlistCapture({ reduce }: { reduce: boolean | null }) {
  const { increment } = useWaitlistCount();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "code" | "done" | "duplicate">("form");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const codeValid = /^\d{6}$/.test(code);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || submitting) return;
    setSubmitting(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), name: email.trim().split("@")[0] }),
      });
      const data = await res.json();
      if (res.status === 409 || data.error === "duplicate") {
        setStep("duplicate");
        return;
      }
      if (!res.ok) throw new Error(data.message);
      setStep("code");
    } catch {
      setStatusMsg("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeValid || submitting) return;
    setSubmitting(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/waitlist/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(data.message ?? "Wrong code. Try again.");
        return;
      }
      increment();
      setStep("done");
    } catch {
      setStatusMsg("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (submitting) return;
    setSubmitting(true);
    setStatusMsg("Sending a new code...");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), name: email.trim().split("@")[0] }),
      });
      setStatusMsg("New code sent! Check your inbox.");
    } catch {
      setStatusMsg("Could not send. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pointer-events-auto">
      {step === "done" ? (
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-white/80"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-light">You&apos;re on the waitlist! We&apos;ll be in touch.</span>
        </motion.div>
      ) : step === "duplicate" ? (
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/80"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <span className="text-sm font-light">You&apos;re already on the list!</span>
        </motion.div>
      ) : step === "code" ? (
        <div>
          <p className="text-white/50 text-xs font-light mb-3" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
            We sent a 6-digit code to <span className="text-white/70">{email}</span>
          </p>
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-2.5 w-full sm:w-auto sm:flex-row sm:items-start">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(v);
              }}
              placeholder="000000"
              disabled={submitting}
              className="w-full sm:w-36 px-4 py-2.5 text-sm text-center tracking-[0.3em] bg-black/40 backdrop-blur-sm border border-white/30 rounded-[3px] text-white placeholder-white/40 outline-none focus:border-white/60 focus:bg-black/50 transition-colors disabled:opacity-50"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            />
            <button
              type="submit"
              disabled={!codeValid || submitting}
              className="px-5 py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-[3px] transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Verify"
              )}
            </button>
          </form>
          <div className="flex items-center gap-3 mt-3">
            {statusMsg && (
              <p className="text-xs text-white/50 font-light" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                {statusMsg}
              </p>
            )}
            <button
              type="button"
              onClick={handleResend}
              disabled={submitting}
              className="text-xs text-white/40 hover:text-white/60 transition-colors font-light"
              style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
            >
              Resend code
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2.5 w-full sm:w-auto sm:flex-row sm:items-start">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={submitting}
            className="w-full sm:w-56 px-4 py-2.5 text-sm bg-black/40 backdrop-blur-sm border border-white/30 rounded-[3px] text-white placeholder-white/50 outline-none focus:border-white/60 focus:bg-black/50 transition-colors disabled:opacity-50"
            style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
          />
          <button
            type="submit"
            disabled={!emailValid || submitting}
            className="px-5 py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-[3px] transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Join the waitlist"
            )}
          </button>
        </form>
      )}
      {statusMsg && step === "form" && (
        <p className="text-xs text-white/50 font-light mt-2" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
          {statusMsg}
        </p>
      )}
      <div className="mt-4">
        <WaitlistCounter />
      </div>
    </div>
  );
}

/* ========================================================
   FEATURES
   ======================================================== */

const FEATURE_LAYERS = [
  {
    layer: "L1",
    title: "Circuit Breaker",
    short: "Stops runaway agent loops before they burn your budget.",
    detail: "Detects when your agent is stuck retrying the same failing operation and automatically intervenes. Three failures in 60 seconds triggers an automatic recovery process that saves 90% on failure costs.",
  },
  {
    layer: "L2",
    title: "Deduplication",
    short: "Catches duplicate actions — even when rephrased. Never charge a customer twice.",
    detail: "Understands intent, not just keywords. Two different prompts that mean the same thing get caught before execution. Prevents double refunds, duplicate emails, and accidental repeat purchases.",
  },
  {
    layer: "L3",
    title: "Prompt Firewall",
    short: "Blocks injection attacks, internal URLs, and secret leaks before they reach your model.",
    detail: "Screens every prompt for injection patterns, private IPs, and credential leaks. 150+ signature database that updates continuously. Catches what your model can't see.",
  },
  {
    layer: "L4",
    title: "Cost Policies",
    short: "Set per-agent budgets. Get alerts before things spiral out of control.",
    detail: "Define spending thresholds per agent, per day. Automatic model downgrades at 80% budget, hard pause at the limit. Never wake up to a surprise API bill again.",
  },
  {
    layer: "L5",
    title: "Audit Trail",
    short: "Every tool call, every decision — logged and searchable. Compliance-ready.",
    detail: "Full decision trail in structured format. Know exactly what your agent did, when, and why. Drift detection flags behavioral shifts before they become problems.",
  },
  {
    layer: "L6",
    title: "Retry Intelligence",
    short: "Smart backoff that cuts failure costs by 90% instead of hammering the same error.",
    detail: "Analyzes failure patterns and recovers with context, not brute force. Escalates to smarter models only when needed. One recovery attempt instead of 47 retries.",
  },
  {
    layer: "L7",
    title: "Side-effect Safety",
    short: "Guarantees payments process once. Emails send once. No double-writes. Ever.",
    detail: "Tracks every external action through a safe state machine. A dispatched payment cannot be re-dispatched. A confirmed email cannot be sent again. Deterministic guarantees, not best-effort.",
  },
  {
    layer: "L8",
    title: "Model Routing",
    short: "Auto-failover between models when quality degrades or costs spike.",
    detail: "Routes requests to the right model for the right task. Falls back automatically when models degrade. Uses cheap models for routine work, smart models for recovery — saving 90% on operational costs.",
  },
  {
    layer: "L9",
    title: "Silence Detection",
    short: "Heartbeat monitoring. No more agents going dark without anyone noticing.",
    detail: "Monitors agent responsiveness and detects stalls. Alerts you when an agent has stopped making progress — before your users notice. Triggers automatic recovery or human escalation.",
  },
] as const;

function FeaturesSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const [offsets, setOffsets] = useState<{ tx: number; ty: number }[]>([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current || !gridRef.current) return;
    hasMounted.current = true;
    const compute = () => {
      const grid = gridRef.current;
      if (!grid) return;
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
    };
    requestAnimationFrame(compute);
  }, []);

  return (
    <section
      ref={ref}
      id="features"
      className="relative min-h-[140dvh] flex flex-col justify-center overflow-hidden bg-white"
    >
      <motion.div
        style={{ y: reduce ? 0 : bgY, willChange: "transform" }}
        className="absolute inset-0 dot-grid opacity-40 pointer-events-none"
      />
      <div className="sticky top-0 min-h-screen flex items-center py-20">
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 w-full pb-30 sm:pb-16">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...slide }}
            className="relative z-20 text-center mb-8 sm:mb-12"
            style={{
              fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
            }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light text-trelo-text tracking-[-0.03em] leading-[1.05]">
              Nine layers.
              <br />
              <span className="text-blue-600">One proxy.</span>
            </h2>
          </motion.div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[1000px] mx-auto"
          >
            {FEATURE_LAYERS.map((card, i) => (
              <FeatureCardItem
                key={card.layer}
                card={card}
                index={i}
                scrollYProgress={scrollYProgress}
                reduce={reduce}
                offsetsReady={offsets.length > 0}
                offsetTx={offsets[i]?.tx ?? 0}
                offsetTy={offsets[i]?.ty ?? 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureCardItem = memo(function FeatureCardItem({
  card,
  index,
  scrollYProgress,
  reduce,
  offsetsReady,
  offsetTx,
  offsetTy,
}: {
  card: (typeof FEATURE_LAYERS)[number];
  index: number;
  scrollYProgress: any;
  reduce: boolean | null;
  offsetsReady: boolean;
  offsetTx: number;
  offsetTy: number;
}) {
  const start = 0.2 + index * 0.025;
  const end = start + 0.1;

  const tx = useTransform(
    scrollYProgress,
    reduce || !offsetsReady ? [0, 1] : [start, end],
    reduce || !offsetsReady ? [0, 0] : [offsetTx, 0]
  );
  const ty = useTransform(
    scrollYProgress,
    reduce || !offsetsReady ? [0, 1] : [start, end],
    reduce || !offsetsReady ? [0, 0] : [offsetTy, 0]
  );
  const opacity = useTransform(scrollYProgress, [start, start + 0.06], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, start + 0.15], [0.2, 1]);

  return (
    <motion.div
      data-card
      style={
        reduce
          ? { fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }
          : {
              x: tx,
              y: ty,
              opacity,
              scale,
              willChange: "transform, opacity",
              fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
            }
      }
    >
      <ExpandableCard card={card} />
    </motion.div>
  );
});

const ExpandableCard = memo(function ExpandableCard({
  card,
}: {
  card: (typeof FEATURE_LAYERS)[number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="flex flex-col bg-white rounded-xl border border-gray-100 p-5 cursor-pointer transition-shadow hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-gray-300 tracking-wider">
          {card.layer}
        </span>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] text-blue-600 font-medium"
            >
              Hide
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <h3 className="text-sm font-semibold text-trelo-text mb-1.5">
        {card.title}
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed">{card.short}</p>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs text-gray-500 leading-relaxed pt-3 border-t border-gray-100"
          >
            {card.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

/* ========================================================
   STATS
   ======================================================== */

const STATS_DATA = [
  { value: 70, suffix: "%", label: "Token waste reduction" },
  { value: 90, suffix: "%", label: "Failure cost reduction" },
  { value: 150, suffix: "+", label: "Security signatures" },
  { value: 4, suffix: "", label: "Protection layers deployed" },
] as const;

function StatsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden bg-white"
    >
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
            style={{
              fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
            }}
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
            {STATS_DATA.map((s, i) => (
              <StatItem
                key={s.label}
                stat={s}
                index={i}
                scrollYProgress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const StatItem = memo(function StatItem({
  stat,
  index,
  scrollYProgress,
  reduce,
}: {
  stat: (typeof STATS_DATA)[number];
  index: number;
  scrollYProgress: any;
  reduce: boolean | null;
}) {
  const cardStart = 0.02 + index * 0.07;
  const cardOpacity = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.25],
    [0, 1]
  );
  const cardY = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.25],
    [40, 0]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [cardStart, cardStart + 0.25],
    [0.85, 1]
  );

  return (
    <motion.div
      style={
        reduce
          ? {}
          : { opacity: cardOpacity, y: cardY, scale: cardScale, willChange: "transform, opacity" }
      }
      className="relative"
    >
      <div className="absolute -top-3 left-0 w-12 h-1 rounded-full bg-[#0f5bff] opacity-60" />
      <div
        className="text-5xl md:text-6xl lg:text-7xl font-thin text-trelo-text tracking-tight"
        style={{
          fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
        }}
      >
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>
      <div
        className="text-sm text-gray-700 font-medium mt-2"
        style={{
          fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
});

/* ========================================================
   HOW IT WORKS
   ======================================================== */

const HOW_IT_WORKS_STEPS = [
  {
    label: "Install the guard",
    detail:
      "One command. Python, FastAPI, SQLite. No external services, no config files, no infrastructure changes.",
    code: "pip install trelo",
    badge: "Setup once",
  },
  {
    label: "Wrap your agent",
    detail:
      "Add one line to your agent code. Circuit breakers, dedup, firewall, and audit trail activate immediately.",
    code: 'agent = Agent(guard="trelo")',
    badge: "Runtime",
  },
] as const;

function HowItWorksSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative min-h-[100dvh] flex items-center py-32 overflow-hidden"
    >
      <motion.div
        style={{ y: reduce ? 0 : bgY, willChange: "transform" }}
        className="absolute inset-0 pointer-events-none"
      >
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
          style={{
            fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-thin text-trelo-text tracking-[-0.03em] leading-[1.05] mb-4">
            Two steps.
            <br />
            <span className="font-thin text-blue-600">Zero config.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="space-y-10">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
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
                    <h3 className="text-sm font-semibold text-trelo-text">
                      {step.label}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {step.detail}
                  </p>
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
   ======================================================== */

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "For experimenting.",
    cta: "Star on GitHub",
    icon: null,
    prominent: false,
    features: ["10K/mo", "3", "7 days", false, false, false, false, "Basic", "Basic"],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "For indie devs shipping products.",
    cta: "Get started",
    icon: MoveRight,
    prominent: true,
    features: ["100K/mo", "10", "30 days", false, true, true, false, "Advanced", "Advanced"],
  },
  {
    name: "Team",
    price: "$299",
    period: "/mo",
    desc: "For teams at scale.",
    cta: "Start trial",
    icon: MoveRight,
    prominent: false,
    features: ["500K/mo", "Unlimited", "90 days", true, true, true, false, "Team", "Advanced"],
  },
] as const;

const FEATURE_LABELS = [
  "Requests / month",
  "Agents",
  "Log retention",
  "SSO",
  "Cost policies",
  "Testing sandbox",
  "Compliance reports",
  "Dashboard",
  "Model routing",
] as const;

function PricingSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} id="pricing" className="relative py-20 lg:py-40 overflow-hidden bg-white">
      <div className="max-w-[1000px] mx-auto px-6 w-full">
        <div
          className="flex flex-col items-center gap-4 text-center mb-16"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">
            PRICING
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] leading-[1.05]">
            Start free.
            <br />
            <span className="text-blue-600 font-normal">Scale when ready.</span>
          </h2>
        </div>

        {/* Desktop table */}
        <div
          className="hidden md:block border border-gray-100 rounded-xl overflow-hidden mx-auto"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] bg-gray-50">
            <div className="p-6" />
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 flex flex-col items-center text-center gap-2 ${plan.prominent ? "bg-blue-50/60" : ""}`}
              >
                <p
                  className={`text-sm font-semibold tracking-wide ${plan.prominent ? "text-blue-600" : "text-gray-500"}`}
                >
                  {plan.name}
                </p>
                <p className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-light tracking-[-0.02em] ${plan.prominent ? "text-blue-600" : "text-trelo-text"}`}
                  >
                    {plan.price}
                  </span>
                  {"period" in plan && (
                    <span className="text-sm font-light text-gray-400">{plan.period}</span>
                  )}
                </p>
                <p className="text-xs font-light text-gray-400">{plan.desc}</p>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 mt-3 py-2.5 px-5 rounded-[3px] text-sm font-normal transition-colors ${
                    plan.prominent
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-trelo-text"
                  }`}
                >
                  {plan.cta}
                  {plan.icon && <plan.icon className="w-3.5 h-3.5" />}
                </a>
              </div>
            ))}
          </div>
          {FEATURE_LABELS.map((label, ri) => (
            <div
              key={label}
              className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] ${ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <div className="p-3.5 text-sm font-medium text-gray-500 flex items-center">
                {label}
              </div>
              {PRICING_PLANS.map((plan, pi) => {
                const val = plan.features[ri];
                const isCheck = typeof val === "boolean";
                return (
                  <div
                    key={pi}
                    className={`p-3.5 flex items-center justify-center ${plan.prominent ? "bg-blue-50/20" : ""}`}
                  >
                    {isCheck ? (
                      val ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-300" />
                      )
                    ) : (
                      <span
                        className={`text-sm font-light ${plan.prominent ? "text-blue-700" : "text-gray-600"}`}
                      >
                        {val}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile pricing cards */}
        <div
          className="md:hidden space-y-4"
          style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
        >
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl p-5 ${plan.prominent ? "border-blue-200 bg-blue-50/40" : "border-gray-100"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className={`text-sm font-semibold ${plan.prominent ? "text-blue-600" : "text-gray-500"}`}
                  >
                    {plan.name}
                  </p>
                  <p className="flex items-baseline gap-1 mt-0.5">
                    <span
                      className={`text-3xl font-light tracking-[-0.02em] ${plan.prominent ? "text-blue-600" : "text-trelo-text"}`}
                    >
                      {plan.price}
                    </span>
                    {"period" in plan && (
                      <span className="text-sm font-light text-gray-400">{plan.period}</span>
                    )}
                  </p>
                </div>
                <a
                  href="#"
                  className={`inline-flex items-center gap-2 py-2 px-4 rounded-[3px] text-xs font-normal ${
                    plan.prominent
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-trelo-text"
                  }`}
                >
                  {plan.cta}
                  {plan.icon && <plan.icon className="w-3 h-3" />}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {FEATURE_LABELS.map((label, ri) => {
                  const val = plan.features[ri];
                  const isCheck = typeof val === "boolean";
                  return (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 font-light">{label}</span>
                      {isCheck ? (
                        val ? (
                          <Check className="w-3 h-3 text-green-600 ml-auto" />
                        ) : (
                          <Minus className="w-3 h-3 text-gray-300 ml-auto" />
                        )
                      ) : (
                        <span className="text-gray-600 font-light ml-auto">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise card */}
        <div className="flex justify-center mt-6">
          <div
            className="border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center gap-2 bg-gray-50/50 max-w-sm w-full"
            style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
          >
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">
              Enterprise
            </span>
            <span className="text-2xl font-light text-trelo-text">Custom</span>
            <p className="text-xs font-light text-gray-400">
              Dedicated support, SSO, compliance reports, unlimited everything.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 mt-2 py-2.5 px-5 rounded-[3px] text-sm font-normal bg-white border border-gray-200 hover:border-gray-300 text-trelo-text transition-colors"
            >
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
            <a
              href="https://github.com"
              target="_blank"
              className="text-blue-600 font-normal hover:underline underline-offset-2"
            >
              GitHub →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================
   CTA
   ======================================================== */

function CTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
      >
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
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-blue-600 hover:bg-blue-500 text-white text-sm font-normal transition-colors"
          >
            Join the waitlist
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] border border-gray-200 hover:border-gray-300 text-trelo-text text-sm font-normal transition-colors"
          >
            View pricing
          </a>
        </motion.div>
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ ...slide, delay: 0.24 }}
          className="mt-5"
        >
          <GitHubStars />
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================
   FOOTER
   ======================================================== */

const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/docs" },
  ],
  connect: [
    { label: "Contact", href: "/contact" },
    { label: "Discord", href: "https://discord.gg/UTXTN5krm", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/trelo-proxy/", external: true },
  ],
  legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Security", href: "/legal/security" },
  ],
} as const;

function FooterSection() {
  return (
    <footer
      className="py-16 bg-gray-50 border-t border-gray-100"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <a href="/" className="text-trelo-text font-medium text-xl tracking-tight">
              Trelo
            </a>
            <p className="text-sm font-light text-gray-400 mt-3 leading-relaxed">
              Trust middleware for AI agents. One line of code, eight layers of
              protection.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            {(
              Object.entries(FOOTER_LINKS) as [
                string,
                readonly { label: string; href: string; external?: boolean }[],
              ][]
            ).map(([category, links]) => (
                <div key={category}>
                  <p className="text-xs text-gray-400 font-medium mb-3 capitalize">{category}</p>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...("external" in link && link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="text-sm font-light text-gray-500 hover:text-trelo-text transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-gray-400">
            © {new Date().getFullYear()} Trelo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              className="text-gray-400 hover:text-trelo-text transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/trelo-proxy/"
              target="_blank"
              className="text-gray-400 hover:text-trelo-text transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
