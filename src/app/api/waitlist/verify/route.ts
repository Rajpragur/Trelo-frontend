import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getClientIP, checkRateLimit } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);

  if (!checkRateLimit(ip, 10, 900_000)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_body", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const code = body.code?.trim();

  if (!email || !code) {
    return NextResponse.json(
      { error: "missing_fields", message: "Email and verification code are required." },
      { status: 400 }
    );
  }

  if (!/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "invalid_code", message: "Please enter a 6-digit code." },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();

    const { data, error } = await (supabase.from("waitlist") as any)
      .select("id, verification_code, code_expires_at, verified")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: "invalid_code", message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    if (data.verified) {
      return NextResponse.json(
        { error: "already_verified", message: "This email is already verified." },
        { status: 200 }
      );
    }

    if (data.code_expires_at && new Date(data.code_expires_at) < new Date()) {
      return NextResponse.json(
        { error: "invalid_code", message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    if (data.verification_code !== code) {
      return NextResponse.json(
        { error: "invalid_code", message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    const { error: updateErr } = await (supabase.from("waitlist") as any)
      .update({
        verified: true,
        verification_code: null,
        code_expires_at: null,
      })
      .eq("id", data.id);

    if (updateErr) throw updateErr;

    const { count } = await (supabase.from("waitlist") as any)
      .select("*", { count: "exact", head: true })
      .eq("verified", true);

    return NextResponse.json(
      { success: true, verified: true, count: count ?? null },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist verify error:", err);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
