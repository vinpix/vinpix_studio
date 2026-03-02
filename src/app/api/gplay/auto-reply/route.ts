import { NextRequest, NextResponse } from "next/server";
import { listGooglePlayReviews, replyGooglePlayReview } from "@/lib/server/googlePlay";

export const runtime = "nodejs";

interface AutoReplyBody {
  packageName?: string;
  dryRun?: boolean;
  maxReviews?: number;
  lowRatingTemplate?: string;
  highRatingTemplate?: string;
  lowRatingThreshold?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AutoReplyBody;
    const packageName = body.packageName?.trim();

    if (!packageName) {
      return NextResponse.json(
        { error: "packageName is required." },
        { status: 400 }
      );
    }

    const lowRatingTemplate =
      body.lowRatingTemplate?.trim() ||
      "We are sorry your experience was not great. Please share more details with our support team at kietle@vinpixstudio.com so we can help you quickly.";

    const highRatingTemplate =
      body.highRatingTemplate?.trim() ||
      "Thank you for using Vinpix Studio. We truly appreciate your feedback. If you need any help, please contact us at kietle@vinpixstudio.com.";

    const lowRatingThreshold = Math.max(
      1,
      Math.min(body.lowRatingThreshold || 3, 5)
    );

    const requestedMaxReviews = Math.max(1, Math.min(body.maxReviews || 50, 100));
    const reviewsResult = await listGooglePlayReviews({
      packageName,
      maxResults: requestedMaxReviews,
    });

    const candidates = reviewsResult.reviews.filter(
      (review) => !review.hasDeveloperReply
    );

    const actions = candidates.map((review) => {
      const replyText =
        review.starRating <= lowRatingThreshold
          ? lowRatingTemplate
          : highRatingTemplate;

      return {
        reviewId: review.reviewId,
        starRating: review.starRating,
        replyText,
      };
    });

    if (!body.dryRun) {
      for (const action of actions) {
        await replyGooglePlayReview({
          packageName,
          reviewId: action.reviewId,
          replyText: action.replyText,
        });
      }
    }

    return NextResponse.json({
      success: true,
      packageName,
      dryRun: Boolean(body.dryRun),
      totalReviewsFetched: reviewsResult.reviews.length,
      totalCandidates: candidates.length,
      totalReplied: body.dryRun ? 0 : actions.length,
      actions,
      nextPageToken: reviewsResult.nextPageToken,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to auto reply Google Play reviews",
        message,
      },
      { status: 500 }
    );
  }
}
