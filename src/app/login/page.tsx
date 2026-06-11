"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const slide = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const;

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, signIn, signInWithGoogle, signInWithGitHub, signUp } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name) { setError("Please enter your name."); return; }
    setSubmitting(true);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(email, password, name);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setSubmitting(true);
    try {
      if (provider === "google") await signInWithGoogle();
      else await signInWithGitHub();
      router.push("/dashboard");
    } catch {
      setError("OAuth failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && !isLoading) return null;

  return (
    <div
      className="min-h-screen flex bg-white"
      style={{ fontFamily: "'BDO Grotesk', var(--font-geist-sans), sans-serif" }}
    >
      {/* Left — hero panel */}
      <div className="hidden lg:flex flex-1 relative bg-gray-50 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-md text-center">
          <Link href="/" className="inline-block text-5xl font-thin text-trelo-text tracking-tight mb-8">
            Trelo
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...slide, delay: 0.1 }}
          >
            <p className="text-2xl md:text-3xl font-light text-trelo-text leading-snug mb-4">
              Trust middleware for{" "}
              <span className="text-blue-600">AI agents</span>
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Stop infinite loops, prevent attacks, and cut token waste by 40-70%.
              One line of code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...slide, delay: 0.4 }}
            className="mt-12 flex justify-center flex-wrap gap-2"
          >
            {["Circuit breaking", "Loop detection", "Prompt injection", "Cost policies"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-[11px] text-gray-500 bg-white border border-gray-100 rounded-sm">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden text-2xl font-light text-trelo-text tracking-tight mb-10 inline-block">
            Trelo
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Heading */}
              <div className="mb-6">
                <h1 className="text-2xl font-light text-trelo-text tracking-[-0.02em]">
                  {mode === "signin" ? "Sign in" : "Create account"}
                </h1>
                <p className="text-sm text-gray-400 mt-2 font-light">
                  {mode === "signin" ? "Access your Trelo dashboard." : "Start protecting your AI agents."}
                </p>
              </div>

              {/* OAuth buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-sm text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <GoogleIcon /> Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth("github")}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-sm text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <GitHubIcon /> GitHub
                </button>
              </div>

              <div className="relative flex items-center gap-3 mb-6">
                <span className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">or</span>
                <span className="flex-1 h-px bg-gray-100" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === "signup" && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">Full name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Create a password" : "Your password"}
                      className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-sm bg-white text-trelo-text placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === "signin" && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={() => setError("Reset link would be sent to your email.")}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#0f5bff] hover:bg-blue-600 text-white text-sm font-medium rounded-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === "signin" ? "Sign in" : "Create account"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-400 mt-6 text-center font-light">
                {mode === "signin" ? (
                  <>Don&apos;t have an account?{" "}
                    <button onClick={() => { setMode("signup"); setError(""); }} className="text-blue-600 hover:underline font-medium">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>Already have an account?{" "}
                    <button onClick={() => { setMode("signin"); setError(""); }} className="text-blue-600 hover:underline font-medium">
                      Sign in
                    </button>
                  </>
                )}
              </p>

              <p className="text-[11px] text-gray-400 mt-8 text-center leading-relaxed">
                By continuing, you agree to Trelo&apos;s{" "}
                <Link href="/legal/terms" className="text-gray-500 hover:text-blue-600 underline">Terms</Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-gray-500 hover:text-blue-600 underline">Privacy Policy</Link>.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
