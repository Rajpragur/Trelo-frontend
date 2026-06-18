import { NextResponse } from "next/server";

export async function GET() {
  const repo = process.env.GITHUB_REPO?.trim();

  if (!repo) {
    return NextResponse.json(
      { stars: 0, empty: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "trelo-landing/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const data = await res.json();
    const stars: number = data.stargazers_count ?? 0;

    return NextResponse.json(
      { stars, url: `https://github.com/${repo}` },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("GitHub stars error:", err);
    return NextResponse.json(
      { error: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        },
      }
    );
  }
}
