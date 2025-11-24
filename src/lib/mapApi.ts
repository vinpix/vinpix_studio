import type {
  MapListResponse,
  MapDetailResponse,
  CreatorPulseSummary,
} from "./types/map";

/**
 * Call Lambda function through Next.js API route (server-side proxy)
 * This avoids CORS issues by routing through Vercel/Next.js
 */
async function callLambdaFunction(
  functionName: string,
  params: Record<string, unknown> = {}
): Promise<unknown> {
  try {
    console.log(`[mapApi] Calling ${functionName} with params:`, params);

    // Call through Next.js API route instead of directly to Lambda
    const response = await fetch("/api/maps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        function: functionName,
        params: params,
      }),
    });

    console.log(`[mapApi] Response status:`, response.status);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error(`[mapApi] HTTP error:`, errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    console.log(`[mapApi] Response data:`, data);
    return data;
  } catch (error: unknown) {
    console.error(`[mapApi] Error calling ${functionName}:`, error);
    throw error;
  }
}

/**
 * Get list of new maps
 */
export async function listNewMaps(
  limit: number = 20,
  lastKey?: unknown
): Promise<MapListResponse> {
  const result = await callLambdaFunction("listNewMaps", { limit, lastKey });
  return result as MapListResponse;
}

/**
 * Get list of top maps by play count
 * @param period - 'all', 'today', 'week', 'this_week', 'weekly', 'day', 'daily'
 */
export async function listTopMaps(
  limit: number = 20,
  period: string = "all",
  lastKey?: unknown
): Promise<MapListResponse> {
  const result = await callLambdaFunction("listTopMaps", {
    limit,
    period,
    lastKey,
  });
  return result as MapListResponse;
}

/**
 * Get map detail by mapId
 */
export async function getMapDetail(mapId: string): Promise<MapDetailResponse> {
  const result = await callLambdaFunction("getMapDetail", { mapId });
  return result as MapDetailResponse;
}

/**
 * Get creator pulse summary (stats for a creator)
 */
export async function getCreatorPulseSummary(
  uid: string,
  ack: boolean = false
): Promise<CreatorPulseSummary> {
  const result = await callLambdaFunction("getCreatorPulseSummary", {
    uid,
    ack,
  });
  return result as CreatorPulseSummary;
}

/**
 * Get map download URLs (including preview presigned URL)
 */
export async function getMapDownloadUrls(
  mapId: string,
  includePreview: boolean = true,
  expiresIn: number = 300
): Promise<{
  statusCode: number;
  body: {
    json?: { url: string; key: string; method: string; expiresIn: number };
    preview?: { url: string; key: string; method: string; expiresIn: number };
  };
}> {
  const result = await callLambdaFunction("getMapDownloadUrls", {
    mapId,
    includePreview,
    expiresIn,
  });
  return result as {
    statusCode: number;
    body: {
      json?: { url: string; key: string; method: string; expiresIn: number };
      preview?: { url: string; key: string; method: string; expiresIn: number };
    };
  };
}
