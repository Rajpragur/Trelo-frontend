import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendVerificationCode } from "@/lib/email";
import { getClientIP, checkRateLimit } from "@/lib/utils";

const CODE_EXPIRY_MINUTES = 15;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateCode(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return (100000 + (arr[0] % 900000)).toString();
}

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);

  if (!checkRateLimit(ip, 10, 900_000)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many submissions. Try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; name?: string; use_case?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_body", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();
  const useCase = body.use_case?.trim() ?? "";

  if (!email || !name) {
    return NextResponse.json(
      { error: "missing_fields", message: "Email and name are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (email.length > 254) {
    return NextResponse.json(
      { error: "invalid_email", message: "Email address is too long." },
      { status: 400 }
    );
  }

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { error: "invalid_name", message: "Name must be between 2 and 100 characters." },
      { status: 400 }
    );
  }

  if (useCase.length > 500) {
    return NextResponse.json(
      { error: "invalid_use_case", message: "Please keep your description under 500 characters." },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();
  const code = generateCode();
  const codeExpiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60_000).toISOString();

  try {
    // Check for existing email
    const { data: existing } = await (supabase.from("waitlist") as any)
      .select("email, verified")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      // Already exists — if not verified, resend code by updating the record
      if (!existing.verified) {
        const { error: updateErr } = await (supabase.from("waitlist") as any)
          .update({
            verification_code: code,
            code_expires_at: codeExpiresAt,
            name,
            use_case: useCase,
          })
          .eq("email", email);

        if (updateErr) throw updateErr;

        await sendVerificationCode(email, code);

        return NextResponse.json(
          { success: true, action: "resent", message: "Verification code resent." },
          { status: 200 }
        );
      }

      // Already verified — duplicate
      return NextResponse.json(
        { error: "duplicate", message: "You're already on the list!" },
        { status: 409 }
      );
    }

    // New entry — insert with code
    const { error } = await (supabase.from("waitlist") as any).insert({
      email,
      name,
      use_case: useCase,
      verified: false,
      verification_code: code,
      code_expires_at: codeExpiresAt,
    });

    if (error) throw error;

    // Fire-and-forget email (don't block the response)
    const emailPromise = sendVerificationCode(email, code);

    const { count } = await (supabase.from("waitlist") as any)
      .select("*", { count: "exact", head: true })
      .eq("verified", true);

    // Wait for email to send before responding (so we can surface errors)
    const emailResult = await emailPromise;

    return NextResponse.json(
      {
        success: true,
        action: "created",
        message: "Check your email for a verification code.",
        count: count ?? null,
        ...(emailResult.success ? {} : { email_warning: "Could not send verification email." }),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Waitlist insert error:", err);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
