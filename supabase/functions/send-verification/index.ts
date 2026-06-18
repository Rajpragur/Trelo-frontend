// Deploy: supabase functions deploy send-verification
// Set secrets: supabase secrets set RESEND_API_KEY=re_xxxxx

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@3.2.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "Trelo <hello@trelo.cc>";

const resend = new Resend(RESEND_API_KEY);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  const expectedSecret = Deno.env.get("EDGE_FUNCTION_SECRET");
  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { email?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, code } = body;

  if (!email || !code) {
    return new Response(JSON.stringify({ error: "Email and code required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your Trelo verification code`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 48px 24px; text-align: center;">
          <img src="https://trelo.cc/logo.svg" alt="Trelo" width="103" height="50" style="display: block; margin: 0 auto 40px; border: 0;" />
          <p style="font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 36px;">
            Thanks for joining the waitlist. Enter the code below to verify your email.
          </p>
          <div style="background: #f9fafb; border-radius: 6px; padding: 24px; text-align: center; margin-bottom: 36px;">
            <p style="font-size: 32px; font-weight: 600; letter-spacing: 0.3em; color: #111827; margin: 0; font-family: 'Courier New', monospace;">
              ${code}
            </p>
          </div>
          <p style="font-size: 12px; color: #9ca3af; line-height: 1.6; margin: 0 0 40px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <div style="border-top: 1px solid #f3f4f6; padding-top: 20px;">
            <p style="font-size: 12px; color: #9ca3af; line-height: 1.6; margin: 0;">
              <a href="https://trelo.cc" style="color: #0f5bff; text-decoration: none;">trelo.cc</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
