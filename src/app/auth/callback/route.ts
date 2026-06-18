import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function sanitizeRedirect(next: unknown, origin: string): string {
  if (typeof next !== "string" || next.length === 0) return `${origin}/dashboard`;
  return next.startsWith("/") && !next.startsWith("//") ? `${origin}${next}` : `${origin}/dashboard`;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirect(searchParams.get("next"), origin);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
