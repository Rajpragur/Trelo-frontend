"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface MetricItem {
  label: string;
  value: string;
  color: "green" | "blue" | "red" | "amber";
}

const METRICS: MetricItem[] = [
  { label: "Calls intercepted", value: "12,847", color: "blue" },
  { label: "Threats blocked", value: "3", color: "red" },
  { label: "Saved this session", value: "$2,431", color: "green" },
  { label: "Circuit states", value: "All CLOSED", color: "green" },
  { label: "Dedup hits", value: "847", color: "amber" },
  { label: "Recovery patterns", value: "23 active", color: "blue" },
  { label: "Cost reduction", value: "67%", color: "green" },
  { label: "Audit events", value: "4,291", color: "blue" },
];

const COLOR_MAP = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
};

export function StatusMarquee() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = [...METRICS, ...METRICS];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed top-16 left-0 right-0 z-30 bg-gray-50/80 backdrop-blur-md border-b border-gray-100 hidden md:block overflow-hidden"
    >
      <div className="h-8 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((m, i) => (
            <div key={i} className="flex items-center gap-2 mx-8">
              <span className={`w-1.5 h-1.5 rounded-full ${COLOR_MAP[m.color]} pulse-indicator`} />
              <span className="text-xs font-mono text-gray-500">
                {m.value}
              </span>
              <span className="text-xs text-gray-400">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
