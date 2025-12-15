export type Role = "user" | "assistant" | "system";

export interface ChatAttachment {
  id: string;
  type: "image";
  key?: string; // S3 key for fetching signed url
  url?: string; // Local blob url or temporary signed url
  name?: string;
  status?: "loading" | "complete" | "failed";
  prompt?: string;
}

export interface ChatNode {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  role: Role;
  content: string;
  model?: string; // Model used for this response (if assistant)
  createdAt: number;
  updatedAt?: number; // Timestamp of the last direct edit
  attachments?: ChatAttachment[];
}

export interface ChatTree {
  sessionId: string;
  rootNodeId: string | null;
  currentNodeId: string | null; // The node currently being viewed/active
  nodes: Record<string, ChatNode>;
}

export interface MoodboardData {
  sessionId: string;
  images: {
    key: string;
    url?: string;
    name: string;
  }[];
  styleDescription: string;
}

export interface ChatSessionMetadata {
  userId: string;
  sessionId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  model: string;
  lastMessage: string;
  type?: "chat" | "folder" | "moodboard";
  folderId?: string;
  styleId?: string;
  thinkingSteps?: number;
}

export interface CreateSessionResponse {
  success: boolean;
  session: ChatSessionMetadata;
  tree: ChatTree;
}

export interface CreateMoodboardResponse {
  success: boolean;
  session: ChatSessionMetadata;
  data: MoodboardData;
}

export interface GetSessionsResponse {
  sessions: ChatSessionMetadata[];
  lastKey?: any;
}

export interface GetSessionDetailResponse {
  metadata: ChatSessionMetadata;
  tree?: ChatTree;
  moodboard?: MoodboardData;
}
