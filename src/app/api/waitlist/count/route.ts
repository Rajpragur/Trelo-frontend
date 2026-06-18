import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  try {
    const supabase = createServiceClient();

    const { count, error } = await (supabase.from("waitlist") as any)
      .select("*", { count: "exact", head: true })
      .eq("verified", true);

    if (error) throw error;

    return NextResponse.json(
      { count: count ?? 0 },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=30, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("Waitlist count error:", err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
