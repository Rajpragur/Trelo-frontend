"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface WaitlistCountContextValue {
  count: number | null;
  increment: () => void;
}

const WaitlistCountContext = createContext<WaitlistCountContextValue>({
  count: null,
  increment: () => {},
});

export function WaitlistCountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => {});
  }, []);

  const increment = useCallback(() => {
    setCount((prev) => (prev !== null ? prev + 1 : 1));
  }, []);

  return (
    <WaitlistCountContext.Provider value={{ count, increment }}>
      {children}
    </WaitlistCountContext.Provider>
  );
}

export function useWaitlistCount() {
  return useContext(WaitlistCountContext);
}
