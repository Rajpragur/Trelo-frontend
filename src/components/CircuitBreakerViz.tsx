"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const STATES = [
  { id: "CLOSED", label: "CLOSED", color: "#16a34a", x: 60, y: 60 },
  { id: "OPEN", label: "OPEN", color: "#d97706", x: 240, y: 60 },
  { id: "HALF_OPEN", label: "HALF_OPEN", color: "#3B82F6", x: 240, y: 180 },
  { id: "HARD_OPEN", label: "HARD OPEN", color: "#dc2626", x: 60, y: 180 },
];

const TRANSITIONS = [
  { from: "CLOSED", to: "OPEN", label: "3 failures / 60s", fromIdx: 0, toIdx: 1 },
  { from: "OPEN", to: "HALF_OPEN", label: "Smart model recovery", fromIdx: 1, toIdx: 2 },
  { from: "HALF_OPEN", to: "CLOSED", label: "Probe success", fromIdx: 2, toIdx: 0 },
  { from: "HALF_OPEN", to: "OPEN", label: "Probe fails", fromIdx: 2, toIdx: 1 },
  { from: "OPEN", to: "HARD_OPEN", label: "All recovery fails", fromIdx: 1, toIdx: 3 },
];

export function CircuitBreakerViz() {
  const [activeState, setActiveState] = useState(0);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduce || !mounted) return;
    const sequence = [0, 1, 2, 0, 1, 2, 0];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % sequence.length;
      setActiveState(sequence[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, [reduce, mounted]);

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <svg width="340" height="240" viewBox="0 0 340 240" fill="none" className="w-full h-auto">
        {/* Connection lines */}
        {TRANSITIONS.map((t, i) => {
          const from = STATES[t.fromIdx];
          const to = STATES[t.toIdx];
          const isActive =
            mounted &&
            !reduce &&
            ((activeState === t.fromIdx) ||
              (STATES[activeState]?.id === t.to));

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? from.color : "#e5e7eb"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={isActive ? "6 4" : "4 6"}
                className={isActive ? "animate-flow-line" : ""}
                opacity={isActive ? 0.8 : 0.4}
              />
              {/* Label */}
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 6}
                textAnchor="middle"
                fill={isActive ? from.color : "#9ca3af"}
                fontSize="8"
                fontFamily="var(--font-mono), monospace"
              >
                {t.label}
              </text>
            </g>
          );
        })}

        {/* State circles */}
        {STATES.map((state, i) => {
          const isActive = mounted && activeState === i;
          return (
            <g key={state.id}>
              {/* Outer glow ring */}
              {isActive && !reduce && (
                <motion.circle
                  cx={state.x}
                  cy={state.y}
                  r="28"
                  fill="none"
                  stroke={state.color}
                  strokeWidth="1"
                  animate={{ r: [28, 36, 28], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Main circle */}
              <circle
                cx={state.x}
                cy={state.y}
                r="24"
                fill={isActive ? state.color : "white"}
                stroke={state.color}
                strokeWidth="2"
                opacity={isActive ? 1 : 0.6}
              />
              {/* Label */}
              <text
                x={state.x}
                y={state.y + 4}
                textAnchor="middle"
                fill={isActive ? "white" : state.color}
                fontSize="9"
                fontWeight="600"
                fontFamily="var(--font-geist-sans), sans-serif"
              >
                {state.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
