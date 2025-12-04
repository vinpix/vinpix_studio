import React, { useState, useMemo } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverEvent,
} from "@dnd-kit/core";
import { ChatSessionMetadata } from "@/types/smartChat";
import {
  Plus,
  MessageSquare,
  Trash2,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  FolderPlus,
  Palette,
  LayoutGrid,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface SmartChatSidebarProps {
  sessions: ChatSessionMetadata[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onNewMoodboard: () => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  onRenameSession: (sessionId: string, newTitle: string) => void;
  onCreateFolder: (title: string) => void;
  onMoveSession: (sessionId: string, folderId: string | null) => void;
  onDeleteFolder: (folderId: string, e: React.MouseEvent) => void;
  loading?: boolean;
}

// --- Components ---

const SessionItem = ({
  session,
  isActive,
  onClick,
  onDelete,
  onRename,
  isOverlay,
}: {
  session: ChatSessionMetadata;
  isActive?: boolean;
  onClick?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  onRename?: (newTitle: string) => void;
  isOverlay?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: session.sessionId,
    data: { type: "session", session },
  });

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(session.title || "");

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        className="h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 opacity-50"
      />
    );
  }

  const isMoodboard = session.type === "moodboard";

  const handleRenameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (newTitle.trim() && newTitle !== session.title && onRename) {
      onRename(newTitle);
    }
    setIsRenaming(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        if (!isRenaming && onClick) onClick();
      }}
      className={cn(
        "group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border border-transparent select-none",
        isActive
          ? "bg-white border-gray-200 shadow-sm"
          : "hover:bg-gray-100 hover:border-gray-200/50",
        isOverlay &&
          "shadow-xl bg-white scale-105 border-gray-200 rotate-2 z-50 cursor-grabbing"
      )}
    >
      {isMoodboard ? (
        <Palette
          size={18}
          className={cn(
            "mt-0.5 shrink-0",
            isActive ? "text-purple-600" : "text-gray-400"
          )}
        />
      ) : (
        <MessageSquare
          size={18}
          className={cn(
            "mt-0.5 shrink-0",
            isActive ? "text-black" : "text-gray-400"
          )}
        />
      )}

      <div className="flex-1 min-w-0 overflow-hidden">
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} className="mr-8">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => handleRenameSubmit()}
              className="w-full text-sm font-medium bg-white border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:border-black"
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setNewTitle(session.title || "");
                  setIsRenaming(false);
                  e.stopPropagation();
                }
              }}
            />
          </form>
        ) : (
          <h4
            className={cn(
              "text-sm font-medium truncate pr-6",
              isActive ? "text-black" : "text-gray-700"
            )}
          >
            {session.title ||
              (isMoodboard ? "Untitled Moodboard" : "Untitled Chat")}
          </h4>
        )}
        <div className="flex items-center gap-2 mt-1">
          {!isMoodboard && (
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {session.model
                ?.replace("gemini-", "")
                .replace("-preview", "")
                .replace("-exp", "") || "AI"}
            </span>
          )}
          <span className="text-[10px] text-gray-400">
            {formatDistanceToNow(session.updatedAt, { addSuffix: true })}
          </span>
        </div>
      </div>

      {!isRenaming && (
        <div className="absolute right-2 top-2 flex opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded backdrop-blur-sm">
          {onRename && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setNewTitle(session.title || "");
                setIsRenaming(true);
              }}
              className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-all"
              title="Rename"
            >
              <Pencil size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const FolderItem = ({
  folder,
  childrenSessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
  onDeleteFolder,
  isExpanded,
  toggleExpanded,
}: {
  folder: ChatSessionMetadata;
  childrenSessions: ChatSessionMetadata[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onDeleteFolder: (id: string, e: React.MouseEvent) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: folder.sessionId,
    data: { type: "folder", folder },
  });

  return (
    <div className="space-y-1">
      <div
        ref={setNodeRef}
        onClick={toggleExpanded}
        className={cn(
          "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all select-none",
          isOver
            ? "bg-indigo-50 border-2 border-indigo-200 border-dashed"
            : "hover:bg-gray-100"
        )}
      >
        <div className="text-gray-400">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <div className="text-gray-400">
          {isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />}
        </div>
        <span className="flex-1 text-sm font-medium text-gray-700 truncate">
          {folder.title}
        </span>
        <span className="text-xs text-gray-400">{childrenSessions.length}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFolder(folder.sessionId, e);
          }}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
          title="Delete Folder"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {isExpanded && (
        <div className="ml-4 pl-2 border-l border-gray-200 space-y-1 mt-1">
          {childrenSessions.length === 0 ? (
            <div className="text-xs text-gray-400 py-2 pl-2 italic">
              Empty folder
            </div>
          ) : (
            childrenSessions.map((session) => (
              <SessionItem
                key={session.sessionId}
                session={session}
                isActive={activeSessionId === session.sessionId}
                onClick={() => onSelectSession(session.sessionId)}
                onDelete={(e) => onDeleteSession(session.sessionId, e)}
                onRename={(newTitle) =>
                  onRenameSession(session.sessionId, newTitle)
                }
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export function SmartChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onNewMoodboard,
  onDeleteSession,
  onRenameSession,
  onCreateFolder,
  onMoveSession,
  onDeleteFolder,
  loading,
}: SmartChatSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [activeDragItem, setActiveDragItem] =
    useState<ChatSessionMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "moodboard">("chat");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Group items
  const { folders, rootSessions, folderMap } = useMemo(() => {
    const folders: ChatSessionMetadata[] = [];
    const rootSessions: ChatSessionMetadata[] = [];
    const folderMap: Record<string, ChatSessionMetadata[]> = {};

    sessions.forEach((item) => {
      if (item.type === "folder") {
        folders.push(item);
        folderMap[item.sessionId] = [];
      }
    });

    folders.sort((a, b) => b.updatedAt - a.updatedAt);

    sessions.forEach((item) => {
      if (item.type !== "folder") {
        const itemType = item.type || "chat";
        // Filter based on activeTab
        if (itemType === activeTab) {
          if (item.folderId && folderMap[item.folderId]) {
            folderMap[item.folderId].push(item);
          } else {
            rootSessions.push(item);
          }
        }
      }
    });

    // Sort contents
    rootSessions.sort((a, b) => b.updatedAt - a.updatedAt);
    Object.values(folderMap).forEach((list) =>
      list.sort((a, b) => b.updatedAt - a.updatedAt)
    );

    return { folders, rootSessions, folderMap };
  }, [sessions, activeTab]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) next.delete(folderId);
      else next.add(folderId);
      return next;
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = sessions.find((s) => s.sessionId === active.id);
    if (item) setActiveDragItem(item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const session = sessions.find((s) => s.sessionId === activeId);
    if (!session) return;

    // Dropped on Root (container)
    if (overId === "root-container") {
      if (session.folderId) {
        onMoveSession(activeId, null);
      }
      return;
    }

    // Dropped on a Folder
    // Check if overId is a folder
    const targetFolder = folders.find((f) => f.sessionId === overId);
    if (targetFolder) {
      if (session.folderId !== targetFolder.sessionId) {
        onMoveSession(activeId, targetFolder.sessionId);
        // Expand target folder
        setExpandedFolders((prev) => new Set(prev).add(targetFolder.sessionId));
      }
      return;
    }
  };

  const { setNodeRef: setRootRef, isOver: isOverRoot } = useDroppable({
    id: "root-container",
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-80 border-r border-gray-200 h-full flex flex-col bg-gray-50/50">
        {/* Tabs */}
        <div className="flex p-2 border-b border-gray-200 gap-1 bg-white">
          <button
            onClick={() => setActiveTab("chat")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "chat"
                ? "bg-gray-100 text-black shadow-sm"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <MessageSquare size={16} /> Chats
          </button>
          <button
            onClick={() => setActiveTab("moodboard")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "moodboard"
                ? "bg-purple-50 text-purple-700 shadow-sm border border-purple-100"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Palette size={16} /> Styles
          </button>
        </div>

        {/* Buttons */}
        <div className="p-4 border-b border-gray-200 space-y-2">
          {activeTab === "chat" ? (
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium text-sm shadow-sm active:translate-y-0.5"
            >
              <Plus size={18} /> New Chat
            </button>
          ) : (
            <button
              onClick={onNewMoodboard}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-all font-medium text-sm shadow-sm active:translate-y-0.5"
            >
              <Plus size={18} /> New Moodboard
            </button>
          )}

          <button
            onClick={() => {
              const title = prompt("Enter folder name:", "New Folder");
              if (title) onCreateFolder(title);
            }}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium text-xs shadow-sm"
          >
            <FolderPlus size={16} /> New Folder
          </button>
        </div>

        {/* List */}
        <div
          ref={setRootRef}
          className={cn(
            "flex-1 overflow-y-auto p-3 space-y-1 transition-colors min-h-0",
            isOverRoot && activeDragItem?.folderId ? "bg-indigo-50/30" : ""
          )}
        >
          {loading && sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              Loading...
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No chats yet.
            </div>
          ) : (
            <>
              {/* Folders first */}
              {folders.map((folder) => (
                <FolderItem
                  key={folder.sessionId}
                  folder={folder}
                  childrenSessions={folderMap[folder.sessionId] || []}
                  activeSessionId={activeSessionId}
                  onSelectSession={onSelectSession}
                  onDeleteSession={onDeleteSession}
                  onRenameSession={onRenameSession}
                  onDeleteFolder={onDeleteFolder}
                  isExpanded={expandedFolders.has(folder.sessionId)}
                  toggleExpanded={() => toggleFolder(folder.sessionId)}
                />
              ))}

              {/* Separator if needed */}
              {folders.length > 0 && rootSessions.length > 0 && (
                <div className="h-2" />
              )}

              {/* Root Sessions */}
              {rootSessions.map((session) => (
                <SessionItem
                  key={session.sessionId}
                  session={session}
                  isActive={activeSessionId === session.sessionId}
                  onClick={() => onSelectSession(session.sessionId)}
                  onDelete={(e) => onDeleteSession(session.sessionId, e)}
                  onRename={(newTitle) =>
                    onRenameSession(session.sessionId, newTitle)
                  }
                />
              ))}

              {/* Spacer for dropping at bottom */}
              <div className="h-10 w-full" />
            </>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeDragItem ? (
          <SessionItem session={activeDragItem} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
