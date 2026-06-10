"use client";

import { useEffect, useRef, useState, memo } from "react";

interface DitherShaderProps {
  src: string;
  gridSize?: number;
  ditherMode?: "bayer";
  colorMode?: "grayscale" | "color" | "monochrome";
  invert?: boolean;
  animated?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  threshold?: number;
  className?: string;
}

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function DitherShaderComponent({
  src,
  gridSize = 2,
  ditherMode = "bayer",
  colorMode = "grayscale",
  invert = false,
  primaryColor = "#000000",
  secondaryColor = "#f5f5f5",
  threshold = 0.5,
  className = "",
}: DitherShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
    return () => { img.onload = null; };
  }, [src]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imgRef.current;

    const render = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const cw = parent.clientWidth;
      const ch = parent.clientHeight;
      if (cw === 0 || ch === 0) return;

      canvas.width = cw;
      canvas.height = ch;

      ctx.drawImage(img, 0, 0, cw, ch);
      const imageData = ctx.getImageData(0, 0, cw, ch);
      const pixels = imageData.data;

      const p1r = parseInt(primaryColor.slice(1, 3), 16);
      const p1g = parseInt(primaryColor.slice(3, 5), 16);
      const p1b = parseInt(primaryColor.slice(5, 7), 16);
      const p2r = parseInt(secondaryColor.slice(1, 3), 16);
      const p2g = parseInt(secondaryColor.slice(3, 5), 16);
      const p2b = parseInt(secondaryColor.slice(5, 7), 16);

      for (let y = 0; y < ch; y += gridSize) {
        for (let x = 0; x < cw; x += gridSize) {
          const i = (y * cw + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          const luminance = colorMode === "grayscale"
            ? (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
            : (r + g + b) / (3 * 255);

          let noise = 0;
          if (ditherMode === "bayer") {
            const bx = (x / gridSize) % 4;
            const by = (y / gridSize) % 4;
            noise = (BAYER_4X4[Math.floor(by)][Math.floor(bx)] + 0.5) / 16;
          }

          const adjusted = luminance + (noise - 0.5) * threshold;
          const pixelOn = invert ? adjusted < 0.5 : adjusted > 0.5;

          if (colorMode === "monochrome") {
            pixels[i] = pixelOn ? p1r : p2r;
            pixels[i + 1] = pixelOn ? p1g : p2g;
            pixels[i + 2] = pixelOn ? p1b : p2b;
          } else if (colorMode === "grayscale") {
            const val = pixelOn ? 0 : 255;
            pixels[i] = val;
            pixels[i + 1] = val;
            pixels[i + 2] = val;
          } else {
            if (!pixelOn) {
              pixels[i] = Math.round(pixels[i] * 0.1);
              pixels[i + 1] = Math.round(pixels[i + 1] * 0.1);
              pixels[i + 2] = Math.round(pixels[i + 2] * 0.1);
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    render();

    const parent = containerRef.current;
    if (!parent) return;
    const ro = new ResizeObserver(() => render());
    ro.observe(parent);

    return () => {
      ro.disconnect();
    };
  }, [loaded, gridSize, ditherMode, colorMode, invert, primaryColor, secondaryColor, threshold]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

export const DitherShader = memo(DitherShaderComponent);
