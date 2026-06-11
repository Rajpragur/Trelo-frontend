"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dev mode bypass — auto-login for development
    const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";
    if (isDev) {
      const devUser = { email: "raj@trelo.cc", name: "Raj" };
      sessionStorage.setItem("trelo_user", JSON.stringify(devUser));
      setUser(devUser);
      setIsLoading(false);
      return;
    }
    const stored = sessionStorage.getItem("trelo_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const signIn = async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { email: _email, name: _email.split("@")[0] };
    sessionStorage.setItem("trelo_user", JSON.stringify(u));
    setUser(u);
  };

  const signInWithGoogle = async () => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { email: "user@trelo.cc", name: "Trelo User" };
    sessionStorage.setItem("trelo_user", JSON.stringify(u));
    setUser(u);
  };

  const signInWithGitHub = async () => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { email: "dev@trelo.cc", name: "Trelo Dev" };
    sessionStorage.setItem("trelo_user", JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (_email: string, _password: string, _name: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const u = { email: _email, name: _name };
    sessionStorage.setItem("trelo_user", JSON.stringify(u));
    setUser(u);
  };

  const signOut = () => {
    sessionStorage.removeItem("trelo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signInWithGoogle, signInWithGitHub, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
