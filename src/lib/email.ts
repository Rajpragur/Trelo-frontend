const FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-verification`;

export async function sendVerificationCode(
  to: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  if (!FUNCTION_URL.startsWith("https://")) {
    console.warn("Supabase URL not configured — skipping email.");
    return { success: true };
  }

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EDGE_FUNCTION_SECRET ?? ""}`,
      },
      body: JSON.stringify({ email: to, code }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Edge function error:", data);
      return { success: false, error: (data as any).error ?? "Email send failed" };
    }

    return { success: true };
  } catch (err) {
    console.error("Edge function call error:", err);
    return { success: false, error: "Failed to call email service." };
  }
}
