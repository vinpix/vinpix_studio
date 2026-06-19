/**
 * Single source of truth for Smart Chat model options.
 *
 * Two distinct axes (not duplicates):
 * - CHAT_MODELS:  the conversation LLM — drives the chat and authors image prompts.
 * - IMAGE_MODELS: the image renderer — only used when Image Mode is on.
 *
 * Both are surfaced together in the one Settings panel; keep this the only place
 * these lists are defined.
 */
export interface SmartChatModelOption {
  id: string;
  name: string;
}

/** Conversation LLMs (the "brain"). First entry is the default. */
export const CHAT_MODELS: SmartChatModelOption[] = [
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },
];

/** Image-generation models (separate from the chat LLM). First entry is the default. */
export const IMAGE_MODELS: SmartChatModelOption[] = [
  { id: "models/imagen-4.0-generate-001", name: "Imagen 4.0" },
  { id: "models/imagen-4.0-ultra-generate-001", name: "Imagen 4.0 Ultra" },
  { id: "models/gemini-3-pro-image-preview", name: "Gemini 3 Pro" },
  { id: "gpt-image-2", name: "GPT Image 2 (OpenAI)" },
];
