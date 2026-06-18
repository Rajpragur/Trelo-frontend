import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// --- Shared rate limiter ---

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstHop = forwarded.split(",")[0]?.trim();
    if (firstHop) return firstHop;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 3_600_000
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}