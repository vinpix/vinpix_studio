import { NextRequest, NextResponse } from "next/server";
import { replyGooglePlayReview } from "@/lib/server/googlePlay";

export const runtime = "nodejs";

interface ReplyBody {
  packageName?: string;
  reviewId?: string;
  replyText?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReplyBody;
    const packageName = body.packageName?.trim();
    const reviewId = body.reviewId?.trim();
    const replyText = body.replyText?.trim();

    if (!packageName || !reviewId || !replyText) {
      return NextResponse.json(
        {
          error: "packageName, reviewId, and replyText are required.",
        },
        { status: 400 }
      );
    }

    await replyGooglePlayReview({
      packageName,
      reviewId,
      replyText,
    });

    return NextResponse.json({
      success: true,
      packageName,
      reviewId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to reply to Google Play review",
        message,
      },
      { status: 500 }
    );
  }
}
