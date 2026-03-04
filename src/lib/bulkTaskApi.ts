import { callLambdaFunction } from "./auth";

/**
 * Simplified Bulk Task API - Only parsing functionality
 */

export interface BulkTaskParseResponse {
  success: boolean;
  prefix: string;
  prompts: string[];
}

export interface BulkTaskJsonParseOptions {
  jsonText: string;
  path: string;
}

export interface BulkTaskJsonParseItemsOptions {
  jsonText: string;
  promptPath: string;
  namePath?: string;
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

function parsePathTokens(path: string): string[] {
  const normalized = path.trim().replace(/\[(\d+|\*)\]/g, ".$1");
  return normalized
    .split(".")
    .map((token) => token.trim())
    .filter(Boolean);
}

function extractByToken(current: unknown, token: string): unknown[] {
  if (token === "*") {
    if (Array.isArray(current)) return current;
    if (current && typeof current === "object") return Object.values(current);
    return [];
  }

  if (Array.isArray(current)) {
    if (/^\d+$/.test(token)) {
      const index = Number(token);
      return index >= 0 && index < current.length ? [current[index]] : [];
    }

    return current
      .map((item) =>
        item && typeof item === "object"
          ? (item as Record<string, unknown>)[token]
          : undefined
      )
      .filter((value) => value !== undefined);
  }

  if (!current || typeof current !== "object") {
    return [];
  }

  const value = (current as Record<string, unknown>)[token];
  return value === undefined ? [] : [value];
}

export function parseBulkTaskJsonByPath({
  jsonText,
  path,
}: BulkTaskJsonParseOptions): BulkTaskParseResponse {
  const prompts = extractStringValuesByPath(jsonText, path);

  return {
    success: prompts.length > 0,
    prefix: "",
    prompts,
  };
}

function extractStringValuesByPath(jsonText: string, path: string): string[] {
  const parsed = JSON.parse(jsonText) as unknown;
  const tokens = parsePathTokens(path);

  if (tokens.length === 0) {
    throw new Error("Path is required. Example: datas[*].prompt");
  }

  let currentValues: unknown[] = [parsed];

  for (const token of tokens) {
    currentValues = currentValues.flatMap((value) => extractByToken(value, token));
    if (currentValues.length === 0) {
      break;
    }
  }

  const prompts = currentValues
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);

  return prompts;
}

export function parseBulkTaskJsonItems({
  jsonText,
  promptPath,
  namePath,
}: BulkTaskJsonParseItemsOptions): { prompts: string[]; names: string[] } {
  const prompts = extractStringValuesByPath(jsonText, promptPath);
  const names = namePath?.trim()
    ? extractStringValuesByPath(jsonText, namePath)
    : [];

  return { prompts, names };
}
