import { NextRequest, NextResponse } from "next/server";
import { listGooglePlayReviews } from "@/lib/server/googlePlay";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const packageName = request.nextUrl.searchParams.get("packageName")?.trim();
    const maxResultsRaw = request.nextUrl.searchParams.get("maxResults");
    const pageToken = request.nextUrl.searchParams.get("pageToken") || undefined;

    if (!packageName) {
      return NextResponse.json(
        { error: "Missing required query param: packageName" },
        { status: 400 }
      );
    }

    const maxResults = maxResultsRaw ? Number(maxResultsRaw) : 50;

    const result = await listGooglePlayReviews({
      packageName,
      maxResults: Number.isFinite(maxResults) ? maxResults : 50,
      pageToken,
    });

    return NextResponse.json({
      packageName,
      reviews: result.reviews,
      nextPageToken: result.nextPageToken,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to fetch Google Play reviews",
        message,
      },
      { status: 500 }
    );
  }
}
