"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LAYERS = ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8"];
const FRAMEWORKS = ["LangChain", "CrewAI", "OpenAI SDK", "AutoGen"];
const TOOLS = ["Tools", "APIs", "Databases", "Payments"];

const FLOATING_CARDS = [
  { label: "$47 saved today", value: "", color: "text-green-600", dot: "bg-green-500", float: "animate-float" },
  { label: "Threats blocked", value: "3", color: "text-red-600", dot: "bg-red-500", float: "animate-float-delayed" },
  { label: "Circuit state", value: "CLOSED", color: "text-green-600", dot: "bg-green-500", float: "animate-float-slow" },
  { label: "Calls intercepted", value: "1,247", color: "text-blue-600", dot: "bg-blue-500", float: "animate-float-slower" },
];

const TERMINAL_LINES = [
  { text: "$ pip install trelo", color: "text-gray-600", delay: 0 },
  { text: "$ trelo serve --port 8000", color: "text-gray-600", delay: 0.8 },
  { text: "+ 8 layers active", color: "text-green-600", delay: 1.6 },
];

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Concentric circles emanating from center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[200, 300, 420, 560].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-trelo-accent/[0.06]"
            style={{ width: size, height: size }}
            initial={reduce ? {} : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
          />
        ))}
      </div>

      {/* Main architecture diagram */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Agent frameworks row */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-4"
        >
          {FRAMEWORKS.map((fw, i) => (
            <motion.span
              key={fw}
              initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="px-3 py-1.5 rounded bg-gray-50 font-mono text-xs text-gray-500 ring-1 ring-gray-100"
            >
              {fw}
            </motion.span>
          ))}
        </motion.div>

        {/* Flow line down */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex justify-center mb-4 origin-top"
        >
          <FlowDots direction="down" />
        </motion.div>

        {/* TRELO proxy box */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-lg border-2 border-trelo-accent/20 bg-white/80 backdrop-blur-sm p-6 mb-4 shadow-sm"
        >
          <p className="text-center font-semibold text-base text-trelo-accent mb-4">
            Trelo proxy layer
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {LAYERS.map((l, i) => (
              <motion.div
                key={l}
                className="px-2 py-1.5 rounded bg-trelo-accent/[0.04] border border-trelo-accent/10 text-center"
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.06, duration: 0.3 }}
              >
                <PulsingDot index={i} />
                <span className="text-[10px] font-bold text-trelo-accent block">{l}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flow line down */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="flex justify-center mb-4 origin-top"
        >
          <FlowDots direction="down" />
        </motion.div>

        {/* Tools row */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {TOOLS.map((t, i) => (
            <motion.span
              key={t}
              initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.08, duration: 0.4 }}
              className="px-3 py-1.5 rounded bg-gray-50 font-mono text-xs text-gray-500 ring-1 ring-gray-100"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Floating metric cards */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <FloatingCard
            card={FLOATING_CARDS[0]}
            position="top-[15%] left-[5%] md:left-[8%]"
          />
          <FloatingCard
            card={FLOATING_CARDS[1]}
            position="top-[20%] right-[5%] md:right-[8%]"
          />
          <FloatingCard
            card={FLOATING_CARDS[2]}
            position="bottom-[25%] left-[2%] md:left-[5%]"
          />
          <FloatingCard
            card={FLOATING_CARDS[3]}
            position="bottom-[18%] right-[2%] md:right-[5%]"
          />
        </div>
      )}

      {/* Terminal snippet - bottom right */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 right-4 md:right-8 md:bottom-12 max-w-[220px] md:max-w-xs rounded-md bg-white shadow-lg ring-1 ring-gray-200/60 overflow-hidden"
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 bg-gray-50">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="p-3 text-left font-mono text-xs leading-relaxed">
          {TERMINAL_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? {} : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 + line.delay, duration: 0.3 }}
              className={line.color}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PulsingDot({ index }: { index: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="w-1.5 h-1.5 rounded-full bg-trelo-accent/60 inline-block mb-0.5" />;

  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-trelo-accent inline-block mb-0.5"
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        delay: index * 0.25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FlowDots({ direction }: { direction: "down" | "up" }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none">
        <line x1="8" y1="0" x2="8" y2="24" stroke="rgb(59, 130, 246)" strokeWidth="1.5" opacity="0.3" />
        <path d="M4 22L8 30L12 22" fill="rgb(59, 130, 246)" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" className="overflow-visible">
      <line
        x1="8" y1="0" x2="8" y2="24"
        stroke="rgb(59, 130, 246)"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.3"
        className="animate-flow-line"
      />
      <motion.circle
        cx="8"
        r="2.5"
        fill="rgb(59, 130, 246)"
        opacity="0.6"
        animate={{ cy: [0, 24] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <path d="M4 22L8 30L12 22" fill="rgb(59, 130, 246)" opacity="0.4" />
    </svg>
  );
}

function FloatingCard({
  card,
  position,
}: {
  card: (typeof FLOATING_CARDS)[number];
  position: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 + Math.random() * 0.5, duration: 0.5 }}
      className={`absolute ${position} ${reduce ? "" : card.float}`}
    >
      <div className="px-3 py-2 rounded-md bg-white/90 backdrop-blur-sm shadow-sm ring-1 ring-gray-200/60 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${card.dot}`} />
        <div>
          {card.value && (
            <span className={`text-sm font-bold ${card.color} mr-1`}>{card.value}</span>
          )}
          <span className="text-xs text-gray-500">{card.label}</span>
        </div>
      </div>
    </motion.div>
  );
}
