"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealVariant = "fade-up" | "scale-in" | "blur-in" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (variant) {
      case "fade-up":
        return { opacity: 0, y: 32 };
      case "scale-in":
        return { opacity: 0, scale: 0.85 };
      case "blur-in":
        return { opacity: 0, y: 20, filter: "blur(8px)" };
      case "slide-left":
        return { opacity: 0, x: -40 };
      case "slide-right":
        return { opacity: 0, x: 40 };
    }
  };

  const getTarget = () => {
    switch (variant) {
      case "fade-up":
        return { opacity: 1, y: 0 };
      case "scale-in":
        return { opacity: 1, scale: 1 };
      case "blur-in":
        return { opacity: 1, y: 0, filter: "blur(0px)" };
      case "slide-left":
        return { opacity: 1, x: 0 };
      case "slide-right":
        return { opacity: 1, x: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getTarget()}
      viewport={{ once, margin: "-80px", amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxWrapper({
  children,
  className = "",
  speed = 0.5,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
