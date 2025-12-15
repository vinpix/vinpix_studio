/**
 * Simplified Bulk Task Types
 * No database storage, no batch management - just parsing
 */

export interface BulkTaskParseResponse {
  success: boolean;
  prefix: string;
  prompts: string[];
}
