import { createSign } from "node:crypto";

const GOOGLE_OAUTH_SCOPE = "https://www.googleapis.com/auth/androidpublisher";
const TOKEN_SAFETY_WINDOW_MS = 60_000;

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  token_uri: string;
}

interface AccessTokenCache {
  token: string;
  expiresAtMs: number;
}

interface GooglePlayApiComment {
  userComment?: {
    text?: string;
    starRating?: number;
    appVersionName?: string;
    device?: string;
    lastModified?: {
      seconds?: string;
    };
  };
  developerComment?: {
    text?: string;
    lastModified?: {
      seconds?: string;
    };
  };
}

interface GooglePlayReviewRaw {
  reviewId: string;
  authorName?: string;
  comments?: GooglePlayApiComment[];
}

interface GooglePlayListResponse {
  reviews?: GooglePlayReviewRaw[];
  tokenPagination?: {
    nextPageToken?: string;
  };
}

export interface GooglePlayReview {
  reviewId: string;
  authorName: string;
  commentText: string;
  starRating: number;
  appVersionName: string;
  device: string;
  userCommentUpdatedAtSeconds: number;
  hasDeveloperReply: boolean;
  developerReplyText: string;
  developerReplyUpdatedAtSeconds: number;
}

let accessTokenCache: AccessTokenCache | null = null;

function base64UrlEncode(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function parseServiceAccountCredentials(): ServiceAccountCredentials {
  const raw = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON;

  if (!raw) {
    throw new Error(
      "Missing GOOGLE_PLAY_SERVICE_ACCOUNT_JSON. Please set a Service Account JSON string in environment variables."
    );
  }

  let parsed: Partial<ServiceAccountCredentials>;
  try {
    parsed = JSON.parse(raw) as Partial<ServiceAccountCredentials>;
  } catch {
    throw new Error(
      "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON is not valid JSON."
    );
  }

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error(
      "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON must include client_email and private_key."
    );
  }

  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key,
    token_uri: parsed.token_uri || "https://oauth2.googleapis.com/token",
  };
}

function createJwtAssertion(credentials: ServiceAccountCredentials): string {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    iss: credentials.client_email,
    scope: GOOGLE_OAUTH_SCOPE,
    aud: credentials.token_uri,
    iat: nowSeconds,
    exp: nowSeconds + 3600,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer
    .sign(credentials.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${unsignedToken}.${signature}`;
}

async function fetchAccessToken(): Promise<string> {
  if (
    accessTokenCache &&
    accessTokenCache.expiresAtMs - TOKEN_SAFETY_WINDOW_MS > Date.now()
  ) {
    return accessTokenCache.token;
  }

  const credentials = parseServiceAccountCredentials();
  const assertion = createJwtAssertion(credentials);

  const params = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const tokenResponse = await fetch(credentials.token_uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    cache: "no-store",
  });

  const data = (await tokenResponse.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!tokenResponse.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        "Unable to fetch Google OAuth access token."
    );
  }

  const expiresInSeconds = data.expires_in || 3600;
  accessTokenCache = {
    token: data.access_token,
    expiresAtMs: Date.now() + expiresInSeconds * 1000,
  };

  return data.access_token;
}

function normalizeReview(raw: GooglePlayReviewRaw): GooglePlayReview {
  const comments = raw.comments || [];
  const userCommentNode = comments.find((comment) => Boolean(comment.userComment));
  const developerCommentNode = comments.find((comment) =>
    Boolean(comment.developerComment)
  );

  const userComment = userCommentNode?.userComment;
  const developerComment = developerCommentNode?.developerComment;

  return {
    reviewId: raw.reviewId,
    authorName: raw.authorName || "Unknown user",
    commentText: userComment?.text || "",
    starRating: userComment?.starRating || 0,
    appVersionName: userComment?.appVersionName || "",
    device: userComment?.device || "",
    userCommentUpdatedAtSeconds: Number(userComment?.lastModified?.seconds || 0),
    hasDeveloperReply: Boolean(developerComment?.text),
    developerReplyText: developerComment?.text || "",
    developerReplyUpdatedAtSeconds: Number(
      developerComment?.lastModified?.seconds || 0
    ),
  };
}

export async function listGooglePlayReviews(options: {
  packageName: string;
  maxResults?: number;
  pageToken?: string;
}): Promise<{ reviews: GooglePlayReview[]; nextPageToken: string | null }> {
  const accessToken = await fetchAccessToken();
  const maxResults = Math.max(1, Math.min(options.maxResults || 100, 100));

  const url = new URL(
    `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(
      options.packageName
    )}/reviews`
  );

  url.searchParams.set("maxResults", String(maxResults));
  if (options.pageToken) {
    url.searchParams.set("token", options.pageToken);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = (await response.json()) as GooglePlayListResponse & {
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Google Play API error while listing reviews."
    );
  }

  const reviews = (data.reviews || []).map(normalizeReview);
  const nextPageToken = data.tokenPagination?.nextPageToken || null;

  return {
    reviews,
    nextPageToken,
  };
}

export async function replyGooglePlayReview(options: {
  packageName: string;
  reviewId: string;
  replyText: string;
}): Promise<void> {
  const accessToken = await fetchAccessToken();

  const response = await fetch(
    `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(
      options.packageName
    )}/reviews/${encodeURIComponent(options.reviewId)}:reply`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        replyText: options.replyText,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;

    throw new Error(
      data?.error?.message || "Google Play API error while replying to review."
    );
  }
}
