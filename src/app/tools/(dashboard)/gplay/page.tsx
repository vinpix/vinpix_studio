"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

interface GooglePlayReview {
  reviewId: string;
  authorName: string;
  commentText: string;
  starRating: number;
  appVersionName: string;
  device: string;
  userCommentUpdatedAtSeconds: number;
  hasDeveloperReply: boolean;
  developerReplyText: string;
}

interface PackagesResponse {
  packages?: string[];
}

const DEFAULT_LOW_RATING_TEMPLATE =
  "We are sorry your experience was not great. Please share more details with our support team at kietle@vinpixstudio.com so we can help you quickly.";

const DEFAULT_HIGH_RATING_TEMPLATE =
  "Thank you for using Vinpix Studio. We truly appreciate your feedback. If you need any help, please contact us at kietle@vinpixstudio.com.";

function formatUnixSeconds(seconds: number): string {
  if (!seconds) return "-";
  return new Date(seconds * 1000).toLocaleString();
}

function starLabel(stars: number): string {
  if (!stars) return "No rating";
  return `${"★".repeat(stars)}${"☆".repeat(Math.max(0, 5 - stars))} (${stars}/5)`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function GPlayToolsPage() {
  const [packageName, setPackageName] = useState("com.example.app");
  const [packageOptions, setPackageOptions] = useState<string[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [reviews, setReviews] = useState<GooglePlayReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [submittingReviewId, setSubmittingReviewId] = useState<string | null>(
    null
  );
  const [runningAutoReply, setRunningAutoReply] = useState(false);
  const [lowRatingTemplate, setLowRatingTemplate] = useState(
    DEFAULT_LOW_RATING_TEMPLATE
  );
  const [highRatingTemplate, setHighRatingTemplate] = useState(
    DEFAULT_HIGH_RATING_TEMPLATE
  );

  const pendingReviews = useMemo(
    () => reviews.filter((review) => !review.hasDeveloperReply),
    [reviews]
  );

  const loadReviewsFromApi = async (
    currentPackageName: string
  ): Promise<GooglePlayReview[]> => {
    const response = await fetch(
      `/api/gplay/reviews?packageName=${encodeURIComponent(currentPackageName)}&maxResults=50`
    );

    const data = (await response.json()) as {
      reviews?: GooglePlayReview[];
      error?: string;
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to fetch reviews");
    }

    return data.reviews || [];
  };

  useEffect(() => {
    const loadPackages = async () => {
      setLoadingPackages(true);

      try {
        const response = await fetch("/api/gplay/packages");
        const data = (await response.json()) as PackagesResponse;

        if (!response.ok) {
          throw new Error("Failed to load package list");
        }

        const options = data.packages || [];
        setPackageOptions(options);

        if (options.length > 0) {
          setPackageName((prev) =>
            !prev.trim() || prev === "com.example.app" ? options[0] : prev
          );
        }
      } catch {
        setPackageOptions([]);
      } finally {
        setLoadingPackages(false);
      }
    };

    void loadPackages();
  }, []);

  const fetchReviews = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!packageName.trim()) {
      setStatusMessage("Please enter a package name.");
      return;
    }

    setLoadingReviews(true);
    setStatusMessage("Loading reviews from Google Play...");

    try {
      const nextReviews = await loadReviewsFromApi(packageName.trim());
      setReviews(nextReviews);

      const draftMap: Record<string, string> = {};
      for (const review of nextReviews) {
        draftMap[review.reviewId] = review.starRating <= 3
          ? DEFAULT_LOW_RATING_TEMPLATE
          : DEFAULT_HIGH_RATING_TEMPLATE;
      }
      setReplyDrafts(draftMap);

      setStatusMessage(`Loaded ${nextReviews.length} review(s).`);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unexpected error while fetching reviews"
      );
    } finally {
      setLoadingReviews(false);
    }
  };

  const syncSingleReplyStatus = async (
    currentPackageName: string,
    reviewId: string
  ) => {
    for (let attempt = 1; attempt <= 4; attempt++) {
      await sleep(1000);

      try {
        const nextReviews = await loadReviewsFromApi(currentPackageName);
        setReviews(nextReviews);

        const matched = nextReviews.find((item) => item.reviewId === reviewId);
        if (matched?.hasDeveloperReply) {
          return true;
        }
      } catch {
        // Ignore transient sync errors; optimistic UI is already updated.
      }
    }

    return false;
  };

  const submitManualReply = async (reviewId: string) => {
    const replyText = replyDrafts[reviewId]?.trim();

    if (!replyText) {
      setStatusMessage("Reply text cannot be empty.");
      return;
    }

    setSubmittingReviewId(reviewId);
    setStatusMessage("Sending manual reply...");

    try {
      const response = await fetch("/api/gplay/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: packageName.trim(),
          reviewId,
          replyText,
        }),
      });

      const data = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(data.message || data.error || "Reply failed");
      }

      setReviews((prev) =>
        prev.map((item) =>
          item.reviewId === reviewId
            ? {
                ...item,
                hasDeveloperReply: true,
                developerReplyText: replyText,
              }
            : item
        )
      );

      setStatusMessage("Reply sent successfully. Syncing latest status...");
      const synced = await syncSingleReplyStatus(packageName.trim(), reviewId);
      if (synced) {
        setStatusMessage("Reply synced with Google Play.");
      } else {
        setStatusMessage(
          "Reply sent. Google Play status may take a few seconds to refresh."
        );
      }
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Failed to reply");
    } finally {
      setSubmittingReviewId(null);
    }
  };

  const runAutoReply = async (dryRun: boolean) => {
    if (!packageName.trim()) {
      setStatusMessage("Please enter a package name.");
      return;
    }

    setRunningAutoReply(true);
    setStatusMessage(dryRun ? "Running auto reply dry-run..." : "Running auto reply...");

    try {
      const response = await fetch("/api/gplay/auto-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: packageName.trim(),
          dryRun,
          maxReviews: 50,
          lowRatingTemplate,
          highRatingTemplate,
          lowRatingThreshold: 3,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
        totalCandidates?: number;
        totalReplied?: number;
      };

      if (!response.ok) {
        throw new Error(data.message || data.error || "Auto reply failed");
      }

      if (dryRun) {
        setStatusMessage(
          `Dry-run done. ${data.totalCandidates || 0} review(s) are eligible for auto reply.`
        );
      } else {
        setStatusMessage(
          `Auto reply done. ${data.totalReplied || 0} review(s) have been replied.`
        );
      }

      await fetchReviews();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to run auto reply"
      );
    } finally {
      setRunningAutoReply(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
          Google Play Reviews
        </h2>
        <p className="text-black/60 max-w-3xl">
          Quản lý review và trả lời tự động cho app trên Google Play Console bằng
          API server-side.
        </p>
      </div>

      <form
        onSubmit={fetchReviews}
        className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <label className="block text-sm font-bold uppercase mb-2">Package Name</label>
        {packageOptions.length > 0 ? (
          <div className="mb-3">
            <select
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
              className="w-full border border-black px-3 py-2 bg-white"
            >
              {packageOptions.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
            <p className="text-xs text-black/60 mt-1">
              Loaded from `GPLAY_PACKAGE_NAMES`.
            </p>
          </div>
        ) : (
          <p className="text-xs text-black/60 mb-3">
            {loadingPackages
              ? "Loading package list..."
              : "No package list found in GPLAY_PACKAGE_NAMES. You can type manually."}
          </p>
        )}
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={packageName}
            onChange={(event) => setPackageName(event.target.value)}
            className="flex-1 border border-black px-3 py-2 bg-white"
            placeholder="com.yourcompany.app"
          />
          <button
            type="submit"
            disabled={loadingReviews}
            className="px-5 py-2 bg-black text-white font-bold uppercase disabled:opacity-50"
          >
            {loadingReviews ? "Loading..." : "Load Reviews"}
          </button>
        </div>
      </form>

      <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
        <h3 className="font-black uppercase">Auto Reply Templates</h3>
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Template for 1-3 stars</label>
          <textarea
            value={lowRatingTemplate}
            onChange={(event) => setLowRatingTemplate(event.target.value)}
            className="w-full border border-black px-3 py-2 min-h-20"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Template for 4-5 stars</label>
          <textarea
            value={highRatingTemplate}
            onChange={(event) => setHighRatingTemplate(event.target.value)}
            className="w-full border border-black px-3 py-2 min-h-20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => runAutoReply(true)}
            disabled={runningAutoReply || loadingReviews}
            className="px-4 py-2 border-2 border-black font-bold uppercase disabled:opacity-50"
          >
            Dry Run Auto Reply
          </button>
          <button
            type="button"
            onClick={() => runAutoReply(false)}
            disabled={runningAutoReply || loadingReviews}
            className="px-4 py-2 bg-black text-white font-bold uppercase disabled:opacity-50"
          >
            Run Auto Reply
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="text-sm font-medium bg-yellow-50 border border-yellow-300 px-4 py-2">
          {statusMessage}
        </div>
      )}

      <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black uppercase">Reviews</h3>
          <span className="text-xs uppercase font-bold text-black/60">
            Pending: {pendingReviews.length} / Total: {reviews.length}
          </span>
        </div>

        {reviews.length === 0 ? (
          <p className="text-sm text-black/60">No reviews loaded yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.reviewId} className="border border-black/20 p-4 space-y-3">
                <div className="flex flex-wrap gap-3 items-center text-xs uppercase font-bold text-black/60">
                  <span>{review.authorName}</span>
                  <span>{starLabel(review.starRating)}</span>
                  <span>Version: {review.appVersionName || "-"}</span>
                  <span>Updated: {formatUnixSeconds(review.userCommentUpdatedAtSeconds)}</span>
                </div>

                <p className="text-sm whitespace-pre-wrap">
                  {review.commentText || "(No text comment)"}
                </p>

                {review.hasDeveloperReply ? (
                  <div className="bg-green-50 border border-green-300 p-3 text-sm">
                    <p className="font-bold mb-1">Developer reply</p>
                    <p className="whitespace-pre-wrap">{review.developerReplyText}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={replyDrafts[review.reviewId] || ""}
                      onChange={(event) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [review.reviewId]: event.target.value,
                        }))
                      }
                      className="w-full border border-black px-3 py-2 min-h-20"
                    />
                    <button
                      type="button"
                      onClick={() => submitManualReply(review.reviewId)}
                      disabled={submittingReviewId === review.reviewId}
                      className="px-4 py-2 bg-black text-white font-bold uppercase disabled:opacity-50"
                    >
                      {submittingReviewId === review.reviewId
                        ? "Sending..."
                        : "Send Reply"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
