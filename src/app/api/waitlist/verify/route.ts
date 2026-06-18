import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(request: NextRequest) {
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

    // Find the entry
    const { data, error } = await (supabase.from("waitlist") as any)
      .select("id, verification_code, code_expires_at, verified")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "not_found", message: "No signup found for this email." },
        { status: 404 }
      );
    }

    if (data.verified) {
      return NextResponse.json(
        { error: "already_verified", message: "This email is already verified." },
        { status: 200 }
      );
    }

    // Check expiry
    if (data.code_expires_at && new Date(data.code_expires_at) < new Date()) {
      return NextResponse.json(
        { error: "code_expired", message: "Verification code expired. Try signing up again." },
        { status: 410 }
      );
    }

    // Check code match
    if (data.verification_code !== code) {
      return NextResponse.json(
        { error: "wrong_code", message: "Wrong code. Please try again." },
        { status: 400 }
      );
    }

    // Mark verified
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
