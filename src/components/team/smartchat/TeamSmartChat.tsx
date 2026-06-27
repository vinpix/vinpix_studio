"use client";

/**
 * Smart Chat tool embedded inside the /team board.
 *
 * Same UI as the admin tools Smart Chat (src/app/tools/(dashboard)/smart-chat),
 * but /team has no per-user uid (shared passcode gate), so it runs against the
 * shared TEAM_SMARTCHAT_USER_ID namespace instead of an admin user's uid.
 */
import React, { useState, useEffect, useRef } from "react";
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
import { TEAM_SMARTCHAT_USER_ID } from "@/lib/teamConstants";
import {
  ChatSessionMetadata,
  ChatTree,
  MoodboardData,
} from "@/types/smartChat";
import { Loader2 } from "lucide-react";

const USER_ID = TEAM_SMARTCHAT_USER_ID;

export function TeamSmartChat() {
  const [sessions, setSessions] = useState<ChatSessionMetadata[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeTree, setActiveTree] = useState<ChatTree | null>(null);
  const [activeMoodboard, setActiveMoodboard] = useState<MoodboardData | null>(
    null
  );
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingTree, setLoadingTree] = useState(false);

  // Tracks a freshly-created chat that has not yet received a message. If the
  // user navigates away (or starts another new chat) without using it, it's
  // garbage-collected so empty chats don't pile up in the shared history.
  const emptyChatIdRef = useRef<string | null>(null);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Delete the pending empty chat if we're moving away from it to something else.
  const gcPendingEmptyChat = (nextActiveId: string | null) => {
    const pending = emptyChatIdRef.current;
    if (!pending || pending === nextActiveId) return;
    emptyChatIdRef.current = null;
    let removed: ChatSessionMetadata | undefined;
    setSessions((prev) => {
      removed = prev.find((s) => s.sessionId === pending);
      return prev.filter((s) => s.sessionId !== pending);
    });
    deleteSmartChatSession(USER_ID, pending).catch((e) => {
      console.error("Failed to clean up empty chat", e);
      // Backend delete failed — the session still exists server-side, so put it
      // back in the list instead of leaving the UI out of sync.
      if (removed) {
        setSessions((prev) =>
          prev.some((s) => s.sessionId === pending) ? prev : [removed!, ...prev]
        );
      }
    });
  };

  // Child fires this the moment a message is sent — the chat is now "used".
  const markDirty = (sessionId: string) => {
    if (emptyChatIdRef.current === sessionId) emptyChatIdRef.current = null;
  };

  const handleSelectSession = (id: string) => {
    gcPendingEmptyChat(id);
    setActiveSessionId(id);
  };

  // Load detail when activeSessionId changes
  useEffect(() => {
    if (activeSessionId) {
      const session = sessions.find((s) => s.sessionId === activeSessionId);
      if (session && session.type === "folder") {
        setActiveTree(null);
        setActiveMoodboard(null);
      } else if (session) {
        loadSessionDetail(activeSessionId, session.type);
      }
    } else {
      setActiveTree(null);
      setActiveMoodboard(null);
    }
  }, [activeSessionId]);

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      // Shared team workspace fills up faster than a single user's, so request a
      // generous page. Backend now returns the most-recent N (sorted), so a new
      // chat is always included.
      const res = await getSmartChatSessions(USER_ID, 200);
      setSessions(res.sessions || []);
    } catch (e) {
      console.error("Failed to load sessions", e);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadSessionDetail = async (sessionId: string, type?: string) => {
    setLoadingTree(true);
    try {
      const res = await getSmartChatDetail(USER_ID, sessionId);

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
    try {
      const savedModel = localStorage.getItem("smartChatModel") || undefined;
      const res = await createSmartChatSession(USER_ID, undefined, savedModel);
      if (res.success) {
        // Drop the previous untouched new chat, then track this one.
        gcPendingEmptyChat(res.session.sessionId);
        emptyChatIdRef.current = res.session.sessionId;
        setSessions((prev) => [res.session, ...prev]);
        setActiveSessionId(res.session.sessionId);
        setActiveTree(res.tree);
        setActiveMoodboard(null);
      }
    } catch (e) {
      console.error("Failed to create new chat", e);
    }
  };

  const handleNewMoodboard = async () => {
    try {
      const res = await createSmartChatMoodboard(USER_ID, "New Moodboard");
      if (res.success) {
        gcPendingEmptyChat(res.session.sessionId);
        setSessions((prev) => [res.session, ...prev]);
        setActiveSessionId(res.session.sessionId);
        setActiveMoodboard(res.data);
        setActiveTree(null);
      }
    } catch (e) {
      console.error("Failed to create moodboard", e);
    }
  };

  const handleCreateFolder = async (title: string) => {
    try {
      const res = await createSmartChatFolder(USER_ID, title);
      if (res.success) {
        setSessions((prev) => [res.folder, ...prev]);
      }
    } catch (e) {
      console.error("Failed to create folder", e);
    }
  };

  const handleMoveSession = async (
    sessionId: string,
    folderId: string | null
  ) => {
    // Optimistic update
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, folderId: folderId || undefined }
          : s
      )
    );

    try {
      await updateSmartChatSessionFolder(USER_ID, sessionId, folderId);
    } catch (e) {
      console.error("Failed to move session", e);
      loadSessions();
    }
  };

  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this item?")) return;

    if (emptyChatIdRef.current === sessionId) emptyChatIdRef.current = null;

    try {
      await deleteSmartChatSession(USER_ID, sessionId);
      setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
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

      await deleteSmartChatFolder(USER_ID, folderId);
    } catch (e) {
      console.error("Failed to delete folder", e);
      loadSessions();
    }
  };

  const handleRenameSession = async (sessionId: string, newTitle: string) => {
    // Optimistic update
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, title: newTitle, updatedAt: Date.now() }
          : s
      )
    );

    try {
      await updateSmartChatTitle(USER_ID, sessionId, newTitle);
    } catch (e) {
      console.error("Failed to rename session", e);
      loadSessions();
    }
  };

  const handleUpdateSession = (
    sessionId: string,
    title: string,
    model: string
  ) => {
    if (emptyChatIdRef.current === sessionId) emptyChatIdRef.current = null;
    setSessions((prev) =>
      prev.map((s) =>
        s.sessionId === sessionId
          ? { ...s, title, model, updatedAt: Date.now() }
          : s
      )
    );
  };

  const handleUpdateMoodboard = (data: MoodboardData, newTitle?: string) => {
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

  const activeSession = sessions.find((s) => s.sessionId === activeSessionId);

  return (
    <div className="flex h-full overflow-hidden bg-white">
      <SmartChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
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
              userId={USER_ID}
              metadata={activeSession}
              initialData={activeMoodboard}
              onUpdate={handleUpdateMoodboard}
            />
          ) : activeSession.type !== "moodboard" && activeTree ? (
            <SmartChatInterface
              key={activeSessionId}
              userId={USER_ID}
              session={activeSession}
              initialTree={activeTree}
              onUpdateSession={handleUpdateSession}
              onDirty={markDirty}
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
