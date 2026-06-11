"use client";

import { useEffect, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  commands: string[];
  outputs?: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  className?: string;
}

function TerminalComponent({
  commands,
  outputs = {},
  typingSpeed = 50,
  delayBetweenCommands = 800,
  className,
}: TerminalProps) {
  const [lines, setLines] = useState<{ type: "command" | "output"; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setIsTyping(true), 500);
    return () => clearTimeout(timer);
  }, [inView]);

  useEffect(() => {
    if (!isTyping) return;
    const cmd = commands[cmdIdx];
    if (!cmd) return;

    if (charIdx < cmd.length) {
      const t = setTimeout(() => {
        setCurrentText(cmd.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, typingSpeed + Math.random() * 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { type: "command", text: cmd }]);
        setCurrentText("");

        const out = outputs[cmdIdx] || [];
        if (out.length > 0) {
          setTimeout(() => {
            setLines((prev) => [
              ...prev,
              ...out.map((o) => ({ type: "output" as const, text: o })),
            ]);
            setTimeout(() => {
              setCharIdx(0);
              setCmdIdx((c) => c + 1);
              if (cmdIdx + 1 >= commands.length) {
                setIsTyping(false);
              }
            }, 300);
          }, 200);
        } else {
          const next = cmdIdx + 1;
          if (next >= commands.length) {
            setIsTyping(false);
          } else {
            setTimeout(() => {
              setCharIdx(0);
              setCmdIdx(next);
            }, delayBetweenCommands);
          }
        }
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isTyping, charIdx, cmdIdx, commands, outputs, typingSpeed, delayBetweenCommands]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-2xl">
        <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-3 border-b border-gray-700/50">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-500 font-mono">shell</span>
          </div>
          <div className="w-[52px]" />
        </div>
        <div ref={contentRef} className="h-48 overflow-y-auto p-4 font-mono text-sm leading-relaxed space-y-0.5">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.type === "command" ? (
                <span className="text-green-400">
                  <span className="text-gray-600 mr-2">$</span>
                  {line.text}
                </span>
              ) : (
                <span className="text-gray-400">{line.text}</span>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="whitespace-pre-wrap">
              <span className="text-green-400">
                <span className="text-gray-600 mr-2">$</span>
                {currentText}
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />
              </span>
            </div>
          )}
          {!isTyping && inView && (
            <div className="whitespace-pre-wrap">
              <span className="text-green-400">
                <span className="text-gray-600 mr-2">$</span>
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Terminal = memo(TerminalComponent);
