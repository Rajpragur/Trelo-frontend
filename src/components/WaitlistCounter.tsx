"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useWaitlistCount } from "@/lib/waitlist-count";

export function WaitlistCounter() {
  const { count } = useWaitlistCount();

  if (count === null) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      className="text-white/60 text-xs font-light tracking-wide"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      <AnimatedCounter value={count} suffix=" developers on the waitlist" />
    </motion.p>
  );
}
