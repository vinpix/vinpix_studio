"use client";
import React, { useState, useEffect } from "react";
import { useAdminUser } from "../layout";
import { SmartChatSidebar } from "@/components/smart-chat/SmartChatSidebar";
import { SmartChatInterface } from "@/components/smart-chat/SmartChatInterface";
import { MoodboardEditor } from "@/components/smart-chat/MoodboardEditor";
import {
  createSmartChatSession,
  getSmartChatSessions,
  getSmartChatDetail,
  deleteSmartChatSession,
  createSmartChatFolder,
  updateSmartChatSessionFolder,
  deleteSmartChatFolder,
  createSmartChatMoodboard,
  updateSmartChatTitle,
} from "@/lib/smartChatApi";
import {
  ChatSessionMetadata,
  ChatTree,
  MoodboardData,
} from "@/types/smartChat";
import { Loader2 } from "lucide-react";

export default function SmartChatPage() {
  const user = useAdminUser();
  const [sessions, setSessions] = useState<ChatSessionMetadata[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeTree, setActiveTree] = useState<ChatTree | null>(null);
  const [activeMoodboard, setActiveMoodboard] = useState<MoodboardData | null>(
    null
  );
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingTree, setLoadingTree] = useState(false);

  // Load Sessions
  useEffect(() => {
    if (user?.uid) {
      loadSessions(user.uid);
    }
  }, [user]);

  // Load Detail when activeSessionId changes
  useEffect(() => {
    if (user?.uid && activeSessionId) {
      const session = sessions.find((s) => s.sessionId === activeSessionId);
      if (session && session.type === "folder") {
        setActiveTree(null);
        setActiveMoodboard(null);
      } else if (session) {
        loadSessionDetail(user.uid, activeSessionId, session.type);
      }
    } else {
      setActiveTree(null);
      setActiveMoodboard(null);
    }
  }, [user, activeSessionId]); // Dependency on sessions length ensures re-check if session added? No, activeSessionId change triggers.

  const loadSessions = async (userId: string) => {
    setLoadingSessions(true);
    try {
      const res = await getSmartChatSessions(userId);
      setSessions(res.sessions || []);
    } catch (e) {
      console.error("Failed to load sessions", e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSessionDetail = async (
    userId: string,
    sessionId: string,
    type?: string
  ) => {
    setLoadingTree(true);
    try {
      const res = await getSmartChatDetail(userId, sessionId);

      if (type === "moodboard" || res.metadata.type === "moodboard") {
        setActiveMoodboard(res.moodboard || null);
        setActiveTree(null);
      } else {
        setActiveTree(res.tree || null);
        setActiveMoodboard(null);
      }
    } catch (e) {
      console.error("Failed to load session detail", e);
    } finally {
      setLoadingTree(false);
    }
  };

  const handleNewChat = async () => {
    if (!user?.uid) return;
    try {
      const savedModel = localStorage.getItem("smartChatModel") || undefined;
      const res = await createSmartChatSession(user.uid, undefined, savedModel);
      if (res.success) {
        setSessions([res.session, ...sessions]);
        setActiveSessionId(res.session.sessionId);
        // Tree loaded from response
        setActiveTree(res.tree);
        setActiveMoodboard(null);
      }
    } catch (e) {
      console.error("Failed to create new chat", e);
    }
  };

  const handleNewMoodboard = async () => {
    if (!user?.uid) return;
    try {
      const res = await createSmartChatMoodboard(user.uid, "New Moodboard");
      if (res.success) {
        setSessions([res.session, ...sessions]);
        setActiveSessionId(res.session.sessionId);
        setActiveMoodboard(res.data);
        setActiveTree(null);
      }
    } catch (e) {
      console.error("Failed to create moodboard", e);
    }
  };

  const handleCreateFolder = async (title: string) => {
    if (!user?.uid) return;
    try {
      const res = await createSmartChatFolder(user.uid, title);
      if (res.success) {
        setSessions([res.folder, ...sessions]);
      }
    } catch (e) {
      console.error("Failed to create folder", e);
    }
  };

  const handleMoveSession = async (
    sessionId: string,
    folderId: string | null
  ) => {
    if (!user?.uid) return;

    // Optimistic update
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, folderId: folderId || undefined }
          : s
      )
    );

    try {
      await updateSmartChatSessionFolder(user.uid, sessionId, folderId);
    } catch (e) {
      console.error("Failed to move session", e);
      // Revert on failure
      loadSessions(user.uid);
    }
  };

  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!user?.uid || !confirm("Are you sure you want to delete this item?"))
      return;

    try {
      await deleteSmartChatSession(user.uid, sessionId);
      setSessions(sessions.filter((s) => s.sessionId !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setActiveTree(null);
        setActiveMoodboard(null);
      }
    } catch (e) {
      console.error("Failed to delete session", e);
    }
  };

  const handleDeleteFolder = async (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !user?.uid ||
      !confirm(
        "Are you sure you want to delete this folder? Contents will be moved to root."
      )
    )
      return;

    try {
      // Optimistic: move contents to root
      setSessions((prev) =>
        prev
          .map((s) =>
            s.folderId === folderId ? { ...s, folderId: undefined } : s
          )
          .filter((s) => s.sessionId !== folderId)
      );

      await deleteSmartChatFolder(user.uid, folderId);
    } catch (e) {
      console.error("Failed to delete folder", e);
      loadSessions(user.uid);
    }
  };

  const handleRenameSession = async (sessionId: string, newTitle: string) => {
    if (!user?.uid) return;

    // Optimistic update
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, title: newTitle, updatedAt: Date.now() }
          : s
      )
    );

    try {
      await updateSmartChatTitle(user.uid, sessionId, newTitle);
    } catch (e) {
      console.error("Failed to rename session", e);
      // Revert if needed, or just reload
      loadSessions(user.uid);
    }
  };

  const handleUpdateSession = (
    sessionId: string,
    title: string,
    model: string
  ) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, title, model, updatedAt: Date.now() }
          : s
      )
    );
  };

  const handleUpdateMoodboard = (data: MoodboardData, newTitle?: string) => {
    // If title changed, update sessions list
    if (newTitle) {
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === activeSessionId
            ? { ...s, title: newTitle, updatedAt: Date.now() }
            : s
        )
      );
    }
    setActiveMoodboard(data);
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  const activeSession = sessions.find((s) => s.sessionId === activeSessionId);

  return (
    <div className="flex h-full overflow-hidden bg-white border-l border-gray-200">
      <SmartChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={handleNewChat}
        onNewMoodboard={handleNewMoodboard}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        onCreateFolder={handleCreateFolder}
        onMoveSession={handleMoveSession}
        onDeleteFolder={handleDeleteFolder}
        loading={loadingSessions}
      />

      <div className="flex-1 min-w-0 h-full relative flex flex-col">
        {activeSession ? (
          activeSession.type === "moodboard" && activeMoodboard ? (
            <MoodboardEditor
              key={activeSessionId}
              userId={user.uid}
              metadata={activeSession}
              initialData={activeMoodboard}
              onUpdate={handleUpdateMoodboard}
            />
          ) : activeSession.type !== "moodboard" && activeTree ? (
            <SmartChatInterface
              key={activeSessionId}
              userId={user.uid}
              session={activeSession}
              initialTree={activeTree}
              onUpdateSession={handleUpdateSession}
              availableMoodboards={sessions.filter(
                (s) => s.type === "moodboard"
              )}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white">
              {loadingTree ? "Loading..." : "Failed to load content."}
            </div>
          )
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white">
            <p>Select a chat or moodboard.</p>
          </div>
        )}

        {loadingTree && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <Loader2 className="animate-spin text-black" size={32} />
          </div>
        )}
      </div>
    </div>
  );
}
