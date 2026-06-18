import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ approved: false }, { status: 200 });
  }

  try {
    const supabase = createServiceClient();

    const { data, error } = await (supabase.from("dashboard_access") as any)
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json(
      { approved: data !== null },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=60",
        },
      }
    );
  } catch (err) {
    console.error("Dashboard access check error:", err);
    return NextResponse.json({ approved: false }, { status: 200 });
  }
}
