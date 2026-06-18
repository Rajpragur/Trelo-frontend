"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface WaitlistGateProps {
  email: string;
  children: ReactNode;
}

export function WaitlistGate({ email, children }: WaitlistGateProps) {
  const [approved, setApproved] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`/api/waitlist/check?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => setApproved(d.approved === true))
      .catch(() => setApproved(false));
  }, [email]);

  if (approved === null) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (approved) {
    return <>{children}</>;
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-[80vh] p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-md"
        style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
      >
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-light text-trelo-text tracking-[-0.02em] mb-2">
          You&apos;re on the waitlist
        </h2>
        <p className="text-sm text-gray-400 font-light mb-8 max-w-sm leading-relaxed">
          We&apos;re rolling out access in phases. You&apos;ll get an email
          when your spot opens up and the dashboard unlocks.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[3px] bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
}
