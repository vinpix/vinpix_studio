import { callLambdaFunction } from "./auth";

/**
 * Simplified Bulk Task API - Only parsing functionality
 */

export interface BulkTaskParseResponse {
  success: boolean;
  prefix: string;
  prompts: string[];
}

/**
 * Parse raw markdown text into individual prompts using AI
 */
export async function parseBulkTaskMarkdown(
  rawText: string
): Promise<BulkTaskParseResponse> {
  const result = await callLambdaFunction("parseBulkPrompts", {
    rawText,
  });
  return result as BulkTaskParseResponse;
}
