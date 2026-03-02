import { NextResponse } from "next/server";

export const runtime = "nodejs";

function parsePackageNames(raw: string | undefined): string[] {
  if (!raw) return [];

  const unique = new Set(
    raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

  return Array.from(unique);
}

export async function GET() {
  const packages = parsePackageNames(process.env.GPLAY_PACKAGE_NAMES);

  return NextResponse.json({
    packages,
    count: packages.length,
  });
}
