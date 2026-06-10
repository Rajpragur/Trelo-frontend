"use client";

type TransitionType =
  | "to-lavender"
  | "to-blue"
  | "to-white"
  | "from-lavender"
  | "from-blue";

interface SectionTransitionProps {
  type: TransitionType;
  position: "top" | "bottom";
}

export function SectionTransition({ type, position }: SectionTransitionProps) {
  const baseClass = "absolute left-0 right-0 h-32 pointer-events-none z-10";
  const posClass = position === "top" ? "top-0" : "bottom-0";
  const typeClass = `section-fade-${type}`;

  return <div className={`${baseClass} ${posClass} ${typeClass}`} />;
}

export function SmoothTransition({
  from = "white",
  to = "lavender",
}: {
  from?: "white" | "lavender" | "blue";
  to?: "white" | "lavender" | "blue";
}) {
  if (from === to) return null;

  const colorMap = {
    white: "255, 255, 255",
    lavender: "139, 92, 246",
    blue: "59, 130, 246",
  };

  const fromAlpha = from === "white" ? 0 : 0.06;
  const toAlpha = to === "white" ? 0 : 0.06;

  return (
    <div
      className="absolute left-0 right-0 h-48 pointer-events-none z-10"
      style={{
        bottom: "-24px",
        background: `linear-gradient(to bottom, rgba(${colorMap[from]}, ${fromAlpha}), rgba(${colorMap[to]}, ${toAlpha}))`,
      }}
    />
  );
}
