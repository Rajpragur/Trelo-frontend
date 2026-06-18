"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useWaitlistCount } from "@/lib/waitlist-count";

interface WaitlistSectionProps {}

export function WaitlistSection({}: WaitlistSectionProps) {
  const { count, increment } = useWaitlistCount();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [useCase, setUseCase] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "code" | "done" | "duplicate" | "error">("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [newCount, setNewCount] = useState<number | null>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length >= 2;
  const codeValid = /^\d{6}$/.test(code);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || !nameValid || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          use_case: useCase.trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 409 || data.error === "duplicate") {
        setStep("duplicate");
        return;
      }
      if (!res.ok) {
        setStep("error");
        setErrorMessage(data.message ?? "Something went wrong.");
        return;
      }
      setStep("code");
    } catch {
      setStep("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeValid || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message ?? "Wrong code. Try again.");
        return;
      }
      setNewCount(data.count ?? null);
      increment();
      setStep("done");
    } catch {
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage("Sending a new code...");
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          use_case: useCase.trim(),
        }),
      });
      setErrorMessage("New code sent! Check your inbox.");
    } catch {
      setErrorMessage("Could not send. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-[560px] mx-auto px-6 w-full">
        <AnimatePresence mode="wait">
          {step === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-trelo-text tracking-[-0.02em] mb-2" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                You&apos;re verified!
              </h2>
              <p className="text-sm text-gray-400 font-light mb-8 max-w-sm leading-relaxed">
                We&apos;re rolling out access in phases. You&apos;ll get an email when your spot opens up.
              </p>
              {newCount !== null && (
                <p className="text-xs text-gray-400 font-light" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                  <AnimatedCounter value={newCount} suffix=" verified developers on the waitlist" />
                </p>
              )}
            </motion.div>
          ) : step === "duplicate" ? (
            <motion.div
              key="duplicate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-trelo-text tracking-[-0.02em] mb-2" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                Already on the list!
              </h2>
              <p className="text-sm text-gray-400 font-light mb-6 max-w-sm leading-relaxed">
                You&apos;ve already signed up. We&apos;ll notify you when your spot is ready.
              </p>
              <button
                onClick={() => { setStep("form"); setEmail(""); setName(""); setUseCase(""); setCode(""); }}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                ← Sign up with a different email
              </button>
            </motion.div>
          ) : step === "code" ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-trelo-text tracking-[-0.02em] mb-2 text-center" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                Check your email
              </h2>
              <p className="text-sm text-gray-400 font-light mb-2 text-center">
                We sent a 6-digit code to <strong className="text-gray-600">{email}</strong>
              </p>
              <p className="text-xs text-gray-400 font-light mb-6 text-center">Enter it below to verify your spot.</p>

              <form onSubmit={handleVerifyCode} className="w-full space-y-4">
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 6); setCode(v); }}
                    placeholder="000000"
                    disabled={submitting}
                    className="w-full px-4 py-3 text-lg text-center tracking-[0.4em] border border-gray-200 rounded-[3px] bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                    autoFocus
                  />
                </div>

                {errorMessage && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 text-center">
                    {errorMessage}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={!codeValid || submitting}
                  className="w-full py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-[3px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify email"
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={handleResend}
                disabled={submitting}
                className="mt-4 text-xs text-gray-400 hover:text-blue-600 transition-colors font-light"
              >
                Resend code
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-10">
                <motion.span initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 inline-block">
                  WAITLIST
                </motion.span>
                <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light text-trelo-text tracking-[-0.03em] leading-[1.05] mb-4 px-2"
                  style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                  Get early access
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="text-sm text-gray-400 font-light">
                  Be the first to try Trelo. No spam, just early access.
                </motion.p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email <span className="text-blue-600">*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" disabled={submitting}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-[3px] bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Full name <span className="text-blue-600">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" disabled={submitting}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-[3px] bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">What are you building?</label>
                  <textarea value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="Tell us about your project (optional)" rows={3} disabled={submitting}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-[3px] bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
                    style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }} />
                </div>

                {step === "error" && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500">
                    {errorMessage}
                  </motion.p>
                )}

                <button type="submit" disabled={!emailValid || !nameValid || submitting}
                  className="w-full py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-[3px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending code...
                    </>
                  ) : (
                    "Join the waitlist"
                  )}
                </button>
              </form>

              {count !== null && (
                <p className="text-center text-xs text-gray-400 font-light mt-6" style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}>
                  <AnimatedCounter value={count} suffix=" verified developers already signed up" />
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}