"use client";

interface AnimatedFlowLineProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  path?: string;
}

export function AnimatedFlowLine({
  className = "",
  color = "rgb(59, 130, 246)",
  width = 100,
  height = 100,
  path = "M 0 50 L 100 50",
}: AnimatedFlowLineProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-flow-line"
        opacity="0.3"
      />
    </svg>
  );
}

export function VerticalFlowLine({
  className = "",
  color = "rgb(59, 130, 246)",
  height = 60,
}: {
  className?: string;
  color?: string;
  height?: number;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width="24"
        height={height}
        viewBox={`0 0 24 ${height}`}
        fill="none"
        className="animate-flow-line"
      >
        <line
          x1="12"
          y1="0"
          x2="12"
          y2={height}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="4 6"
          opacity="0.4"
        />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 12L0 0H16L8 12Z" fill={color} opacity="0.4" />
      </svg>
    </div>
  );
}
