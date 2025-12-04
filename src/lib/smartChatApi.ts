import { callLambdaFunction } from "./auth";
import {
  ChatTree,
  ChatSessionMetadata,
  CreateSessionResponse,
  GetSessionsResponse,
  GetSessionDetailResponse,
  CreateMoodboardResponse,
  MoodboardData,
} from "@/types/smartChat";

export async function createSmartChatSession(
  userId: string,
  title?: string,
  model?: string
): Promise<CreateSessionResponse> {
  const result = await callLambdaFunction("createSmartChatSession", {
    userId,
    title,
    model,
  });
  return result as CreateSessionResponse;
}

export async function getSmartChatSessions(
  userId: string,
  limit: number = 20,
  lastKey?: any
): Promise<GetSessionsResponse> {
  const result = await callLambdaFunction("getSmartChatSessions", {
    userId,
    limit,
    lastKey,
  });
  return result as GetSessionsResponse;
}

export async function getSmartChatDetail(
  userId: string,
  sessionId: string
): Promise<GetSessionDetailResponse> {
  const result = await callLambdaFunction("getSmartChatDetail", {
    userId,
    sessionId,
  });
  return result as GetSessionDetailResponse;
}

export async function saveSmartChatState(
  userId: string,
  sessionId: string,
  treeData: ChatTree,
  lastMessagePreview?: string,
  newTitle?: string,
  currentModel?: string,
  styleId?: string,
  thinkingSteps?: number
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("saveSmartChatState", {
    userId,
    sessionId,
    treeData,
    lastMessagePreview,
    newTitle,
    currentModel,
    styleId,
    thinkingSteps,
  });
  return result as { success: boolean };
}

export async function deleteSmartChatSession(
  userId: string,
  sessionId: string
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("deleteSmartChatSession", {
    userId,
    sessionId,
  });
  return result as { success: boolean };
}

export async function updateSmartChatTitle(
  userId: string,
  sessionId: string,
  title: string
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("updateSmartChatTitle", {
    userId,
    sessionId,
    title,
  });
  return result as { success: boolean };
}

export async function uploadSmartChatImage(
  userId: string,
  sessionId: string,
  base64Data: string
): Promise<{ key: string; success: boolean }> {
  const result = await callLambdaFunction("uploadSmartChatImage", {
    userId,
    sessionId,
    base64Data,
  });
  return result as { key: string; success: boolean };
}

export async function deleteSmartChatImages(
  userId: string,
  keys: string[]
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("deleteSmartChatImages", {
    userId,
    keys,
  });
  return result as { success: boolean };
}

export async function generateImage(
  userId: string,
  sessionId: string,
  prompt: string,
  referenceImage?: string,
  options?: { aspectRatio?: string; resolution?: string }
): Promise<{ key: string; success: boolean }> {
  const result = await callLambdaFunction("generateImage", {
    userId,
    sessionId,
    prompt,
    referenceImage,
    aspectRatio: options?.aspectRatio,
    resolution: options?.resolution,
  });
  return result as { key: string; success: boolean };
}

export async function getPresignedUrl(
  key: string,
  options?: { download?: boolean }
): Promise<string> {
  const result = (await callLambdaFunction("getPresignedUrl", {
    key,
    download: options?.download,
  })) as {
    url: string;
  };
  return result.url;
}

export async function chatWithAI(
  systemPrompt: string,
  prompt: string,
  model?: string,
  schema?: any,
  autoPairJson: boolean = false,
  images?: string[]
): Promise<string | any> {
  // Directly calling the chat function
  // Note: Response might be a string or JSON object
  const result = await callLambdaFunction("chat", {
    systemPrompt,
    prompt,
    model,
    schema,
    autoPairJson,
    images,
  });
  console.log("[smartChatApi] chatWithAI lambda result:", result);
  return result;
}

export async function createSmartChatFolder(
  userId: string,
  title: string
): Promise<{ success: boolean; folder: ChatSessionMetadata }> {
  const result = await callLambdaFunction("createSmartChatFolder", {
    userId,
    title,
  });
  return result as { success: boolean; folder: ChatSessionMetadata };
}

export async function updateSmartChatSessionFolder(
  userId: string,
  sessionId: string,
  folderId: string | null
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("updateSmartChatSessionFolder", {
    userId,
    sessionId,
    folderId,
  });
  return result as { success: boolean };
}

export async function deleteSmartChatFolder(
  userId: string,
  folderId: string
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("deleteSmartChatFolder", {
    userId,
    folderId,
  });
  return result as { success: boolean };
}

export async function createSmartChatMoodboard(
  userId: string,
  title: string
): Promise<CreateMoodboardResponse> {
  const result = await callLambdaFunction("createMoodboard", {
    userId,
    title,
  });
  return result as CreateMoodboardResponse;
}

export async function updateSmartChatMoodboard(
  userId: string,
  sessionId: string,
  images?: MoodboardData["images"],
  styleDescription?: string,
  title?: string
): Promise<{ success: boolean }> {
  const result = await callLambdaFunction("updateMoodboard", {
    userId,
    sessionId,
    images,
    styleDescription,
    title,
  });
  return result as { success: boolean };
}

export async function analyzeSmartChatMoodboard(
  userId: string,
  sessionId: string
): Promise<{ success: boolean; styleDescription: string }> {
  const result = await callLambdaFunction("analyzeMoodboard", {
    userId,
    sessionId,
  });
  return result as { success: boolean; styleDescription: string };
}
