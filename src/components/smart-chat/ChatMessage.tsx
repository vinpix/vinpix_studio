import React, { useState } from "react";
import {
  User,
  Bot,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Copy,
  Check,
  Download,
  Loader2,
  AlertCircle,
  Trash2,
  Archive,
  MessageSquarePlus,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import { ChatNode, ChatAttachment } from "@/types/smartChat";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SecureImage } from "./SecureImage";
import { getPresignedUrl } from "@/lib/smartChatApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import JSZip from "jszip";

interface ChatMessageProps {
  node: ChatNode;
  siblingCount: number;
  currentSiblingIndex: number;
  onPrevSibling: () => void;
  onNextSibling: () => void;
  onEdit: (newContent: string) => void;
  onDirectEdit?: (newContent: string) => void;
  onImageClick: (attachment: ChatAttachment) => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  onRegenerateImage?: (attachmentIndex: number) => void;
  onIncludeImage?: (attachment: ChatAttachment) => void;
  referenceAttachments?: ChatAttachment[];
  isSelectionMode?: boolean;
  selectedAttachments?: Set<number>;
  onToggleImageSelection?: (attachmentIndex: number) => void;
}

export function ChatMessage({
  node,
  siblingCount,
  currentSiblingIndex,
  onPrevSibling,
  onNextSibling,
  onEdit,
  onDirectEdit,
  onImageClick,
  onDelete,
  onRegenerate,
  onRegenerateImage,
  onIncludeImage,
  referenceAttachments,
  isSelectionMode,
  selectedAttachments,
  onToggleImageSelection,
}: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(node.content);
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);

  const handleSaveEdit = () => {
    if (editContent.trim() !== node.content) {
      onEdit(editContent);
    }
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(node.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async (
    e: React.MouseEvent,
    attachment: ChatAttachment
  ) => {
    e.stopPropagation(); // Prevent opening viewer
    try {
      let url = attachment.url;
      // If it's a remote key, get signed URL
      if (attachment.key && !url?.startsWith("data:")) {
        url = await getPresignedUrl(attachment.key);
      }

      if (!url) return;

      let filename = attachment.name || "download.webp";
      // Ensure webp extension
      if (filename.lastIndexOf(".") > 0) {
        filename = filename.substring(0, filename.lastIndexOf(".")) + ".webp";
      } else {
        filename += ".webp";
      }

      // Fetch blob to check type/convert
      let fetchUrl = url;
      if (!url.startsWith("data:")) {
        fetchUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      }

      const response = await fetch(fetchUrl);
      const blob = await response.blob();

      // Always convert to WebP via Canvas to ensure consistent format and Godot compatibility
      // This "sanitizes" the image through the browser's encoder, fixing potential issues with
      // server-generated WebP files or mismatching headers.
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (webpBlob) => {
            if (webpBlob) {
              const blobUrl = URL.createObjectURL(webpBlob);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = filename;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            }
          },
          "image/webp",
          0.9
        );
      }
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleDownloadAll = async () => {
    if (!node.attachments || node.attachments.length === 0) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      const promises = node.attachments.map(async (att, idx) => {
        if (!att.url && !att.key) return;

        let url = att.url;
        // Need to fetch content, so simple presigned URL without disposition might be safer for fetch?
        // But some buckets require signed URL for read.
        if (att.key && !url?.startsWith("data:")) {
          url = await getPresignedUrl(att.key);
        }

        if (!url) return;

        try {
          // Use proxy to avoid CORS issues when fetching from S3
          const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error("Fetch failed");
          const blob = await response.blob();
          // Use attachment name or fallback
          let fileName = att.name || `image-${idx}.png`;

          // Truncate name if too long
          const MAX_LENGTH = 30;
          const lastDotIndex = fileName.lastIndexOf(".");
          if (lastDotIndex !== -1) {
            const name = fileName.substring(0, lastDotIndex);
            const ext = fileName.substring(lastDotIndex);
            if (name.length > MAX_LENGTH) {
              fileName = name.substring(0, MAX_LENGTH) + "..." + ext;
            }
          } else {
            if (fileName.length > MAX_LENGTH) {
              fileName = fileName.substring(0, MAX_LENGTH) + "...";
            }
          }

          if (!fileName.endsWith(".png") && !fileName.endsWith(".jpg")) {
            fileName += ".png";
          }
          zip.file(fileName, blob);
        } catch (e) {
          console.error("Failed to fetch image for zip", e);
        }
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `images-${node.id.slice(-6)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (e) {
      console.error("Failed to zip images", e);
      alert("Failed to create zip file");
    } finally {
      setZipping(false);
    }
  };

  const isUser = node.role === "user";

  // Custom components for ReactMarkdown to style elements
  const MarkdownComponents = {
    // Style links
    a: ({ ...props }: React.ComponentPropsWithoutRef<"a">) => (
      <a
        {...props}
        className="text-blue-600 hover:underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    // Style headings
    h1: ({ ...props }: React.ComponentPropsWithoutRef<"h1">) => (
      <h1 {...props} className="text-2xl font-bold my-4" />
    ),
    h2: ({ ...props }: React.ComponentPropsWithoutRef<"h2">) => (
      <h2 {...props} className="text-xl font-bold my-3" />
    ),
    h3: ({ ...props }: React.ComponentPropsWithoutRef<"h3">) => (
      <h3 {...props} className="text-lg font-bold my-2" />
    ),
    // Style lists
    ul: ({ ...props }: React.ComponentPropsWithoutRef<"ul">) => (
      <ul {...props} className="list-disc ml-5 my-2 space-y-1" />
    ),
    ol: ({ ...props }: React.ComponentPropsWithoutRef<"ol">) => (
      <ol {...props} className="list-decimal ml-5 my-2 space-y-1" />
    ),
    // Style code blocks
    code: ({
      inline,
      className,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <div className="relative my-4 rounded-lg overflow-hidden bg-gray-900 text-gray-100">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 text-xs text-gray-400">
            <span>{match?.[1] || "code"}</span>
            <button
              onClick={() => navigator.clipboard.writeText(String(children))}
              className="hover:text-white transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code
          {...props}
          className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-500"
        >
          {children}
        </code>
      );
    },
    // Style tables
    table: ({ ...props }: React.ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto my-4 border rounded-lg">
        <table {...props} className="w-full text-sm text-left" />
      </div>
    ),
    thead: ({ ...props }: React.ComponentPropsWithoutRef<"thead">) => (
      <thead {...props} className="bg-gray-50 border-b" />
    ),
    th: ({ ...props }: React.ComponentPropsWithoutRef<"th">) => (
      <th {...props} className="px-4 py-2 font-bold" />
    ),
    td: ({ ...props }: React.ComponentPropsWithoutRef<"td">) => (
      <td {...props} className="px-4 py-2 border-b last:border-0" />
    ),
    // Style blockquotes
    blockquote: ({
      ...props
    }: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        {...props}
        className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2"
      />
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group w-full border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors",
        isUser ? "bg-white" : "bg-gray-50/30"
      )}
    >
      <div className="max-w-3xl mx-auto p-6 flex gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm transition-transform hover:scale-105",
            isUser
              ? "bg-white border-gray-200"
              : "bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent"
          )}
        >
          {isUser ? (
            <User size={16} className="text-gray-600" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header: Name & Branch Controls */}
          <div className="flex items-center justify-between h-6">
            <span className="font-bold text-sm text-gray-900">
              {isUser ? "You" : node.model || "AI Assistant"}
            </span>

            {/* Branch Navigation */}
            {siblingCount > 1 && (
              <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5 select-none">
                <button
                  onClick={onPrevSibling}
                  disabled={currentSiblingIndex === 0}
                  className="p-0.5 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                >
                  <ChevronLeft size={12} />
                </button>
                <motion.span
                  key={currentSiblingIndex}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-mono w-6 text-center text-gray-500"
                >
                  {currentSiblingIndex + 1}/{siblingCount}
                </motion.span>
                <button
                  onClick={onNextSibling}
                  disabled={currentSiblingIndex === siblingCount - 1}
                  className="p-0.5 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="text-sm leading-relaxed text-gray-800">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 bg-white p-3 border rounded-lg shadow-sm border-indigo-100"
                >
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full min-h-[100px] p-2 resize-y outline-none bg-transparent"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditContent(node.content);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      Cancel
                    </button>
                    {onDirectEdit && (
                      <button
                        onClick={() => {
                          onDirectEdit(editContent);
                          setIsEditing(false);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-orange-600 hover:bg-orange-700 rounded transition-colors"
                        title="Replace this message and regenerate (deletes future messages)"
                      >
                        Direct Edit
                      </button>
                    )}
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded transition-colors"
                      title="Create a new timeline (keeps original)"
                    >
                      Save & Branch
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="prose prose-sm max-w-none break-words"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {node.content}
                  </ReactMarkdown>

                  {/* Reference Images (if any) */}
                  {referenceAttachments && referenceAttachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                        <ImageIcon size={12} />
                        Used References
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {referenceAttachments.map((att, idx) => (
                          <div
                            key={idx}
                            onClick={() => onImageClick(att)}
                            className="relative group/ref rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                          >
                            <SecureImage
                              storageKey={att.key}
                              src={att.url}
                              alt={att.name || "reference"}
                              className="h-16 w-16 object-cover"
                            />
                            {/* Overlay for Include */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/ref:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              {onIncludeImage && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onIncludeImage(att);
                                  }}
                                  className="p-1 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-colors"
                                  title="Include in chat"
                                >
                                  <MessageSquarePlus size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {node.attachments && node.attachments.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                      {node.attachments.map((att, idx) => {
                        const isSelected = selectedAttachments?.has(idx);

                        if (att.status === "loading") {
                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                console.log(
                                  "[ChatMessage] Loading image clicked:",
                                  {
                                    idx,
                                    isSelectionMode,
                                    onToggleImageSelection:
                                      !!onToggleImageSelection,
                                  }
                                );
                                if (isSelectionMode && onToggleImageSelection) {
                                  console.log(
                                    "[ChatMessage] Loading image clicked - calling toggleImageSelection:",
                                    {
                                      nodeId: node.id,
                                      attachmentIndex: idx,
                                      isSelectionMode,
                                      onToggleImageSelection:
                                        !!onToggleImageSelection,
                                    }
                                  );
                                  onToggleImageSelection(idx);
                                } else {
                                  // Open image viewer when not in selection mode
                                  onImageClick(att);
                                }
                              }}
                              className={cn(
                                "h-48 w-48 shrink-0 bg-gray-100 rounded-lg flex flex-col items-center justify-center animate-pulse transition-all",
                                isSelectionMode &&
                                  "cursor-pointer hover:scale-102",
                                isSelected
                                  ? "border-4 border-indigo-500 ring-4 ring-indigo-200"
                                  : isSelectionMode
                                  ? "border-2 border-dashed border-gray-300 hover:border-indigo-400"
                                  : "border border-gray-200"
                              )}
                            >
                              <Loader2 className="animate-spin text-gray-400 mb-2" />
                              <span className="text-xs text-gray-400">
                                Generating...
                              </span>

                              {/* Selection Indicator for Loading State */}
                              {isSelectionMode && (
                                <div className="absolute top-2 left-2 z-20">
                                  {isSelected ? (
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                                      <Check size={16} className="text-white" />
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm" />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        }
                        if (att.status === "failed") {
                          return (
                            <div
                              key={idx}
                              className="h-48 w-48 shrink-0 bg-red-50 rounded-lg flex flex-col items-center justify-center border border-red-200"
                            >
                              <AlertCircle className="text-red-400 mb-2" />
                              <span className="text-xs text-red-400">
                                Failed
                              </span>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (isSelectionMode && onToggleImageSelection) {
                                console.log(
                                  "[ChatMessage] Image clicked - calling toggleImageSelection:",
                                  {
                                    nodeId: node.id,
                                    attachmentIndex: idx,
                                    isSelectionMode,
                                    onToggleImageSelection:
                                      !!onToggleImageSelection,
                                  }
                                );
                                onToggleImageSelection(idx);
                              } else {
                                onImageClick(att);
                              }
                            }}
                            className={cn(
                              "relative group/image rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all shrink-0",
                              isSelectionMode && "hover:scale-102",
                              isSelected
                                ? "border-4 border-indigo-500 ring-4 ring-indigo-200"
                                : isSelectionMode
                                ? "border-2 border-dashed border-gray-300 hover:border-indigo-400"
                                : "border border-gray-200"
                            )}
                          >
                            <SecureImage
                              storageKey={att.key}
                              src={att.url}
                              alt={att.name || "attachment"}
                              className="h-48 w-auto object-cover max-w-[calc(50vw-4rem)] rounded-lg"
                            />

                            {/* Selection Indicator */}
                            {isSelectionMode && (
                              <div className="absolute top-2 left-2 z-20">
                                {isSelected ? (
                                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                                    <Check size={16} className="text-white" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm" />
                                )}
                              </div>
                            )}

                            {/* Selection Overlay */}
                            {isSelectionMode && isSelected && (
                              <div className="absolute inset-0 bg-indigo-500/20 pointer-events-none" />
                            )}

                            {/* Prompt Popover on Hover */}
                            {!isSelectionMode && att.prompt && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white p-3 text-xs transform translate-y-full group-hover/image:translate-y-0 transition-transform duration-300 max-h-[60%] overflow-y-auto pointer-events-auto">
                                  <p className="font-semibold mb-1 text-[10px] uppercase tracking-wider text-gray-400">
                                    Generation Prompt
                                  </p>
                                  <p className="leading-relaxed text-gray-100">
                                    {att.prompt}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Download Button Overlay */}
                            {!isSelectionMode && (
                              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/image:opacity-100 transition-opacity">
                                {onIncludeImage && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onIncludeImage(att);
                                    }}
                                    className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm"
                                    title="Include in chat"
                                  >
                                    <MessageSquarePlus size={14} />
                                  </button>
                                )}
                                {onRegenerateImage && !isUser && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onRegenerateImage(idx);
                                    }}
                                    className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm"
                                    title="Regenerate this image"
                                  >
                                    <RefreshCw size={14} />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => handleDownloadImage(e, att)}
                                  className="p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm"
                                  title="Download image"
                                >
                                  <Download size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {node.attachments.length > 1 && (
                        <button
                          onClick={handleDownloadAll}
                          disabled={zipping}
                          className="h-48 w-24 shrink-0 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-black transition-colors"
                          title="Download all as ZIP"
                        >
                          {zipping ? (
                            <Loader2 className="animate-spin" size={24} />
                          ) : (
                            <Archive size={24} />
                          )}
                          <span className="text-xs font-medium">
                            {zipping ? "Zipping..." : "Download All"}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          {!isEditing && (
            <div className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied ? (
                  <Check size={12} className="text-green-500" />
                ) : (
                  <Copy size={12} />
                )}
                {copied ? (
                  <span className="text-green-500 font-medium">Copied</span>
                ) : (
                  "Copy"
                )}
              </button>

              {isUser && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2"
                >
                  <Edit2 size={12} /> Edit
                </button>
              )}

              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors ml-2"
                  title="Delete message and branch"
                >
                  <Trash2 size={12} />
                </button>
              )}

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 transition-colors ml-2"
                  title="Regenerate response (deletes current)"
                >
                  <RefreshCw size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
