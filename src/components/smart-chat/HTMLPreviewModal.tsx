import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Edit3,
  Eye,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
interface HtmlPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  onSave?: (newHtml: string) => void;
}
export function HtmlPreviewModal({
  isOpen,
  onClose,
  htmlContent,
  onSave,
}: HtmlPreviewModalProps) {
  const [viewMode, setViewMode] = useState<"preview" | "edit">("preview");
  const [editableHtml, setEditableHtml] = useState(htmlContent);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setEditableHtml(htmlContent);
      setViewMode("preview");
    }
  }, [isOpen, htmlContent]);
  const handleCopy = () => {
    navigator.clipboard.writeText(editableHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDownloadHtml = () => {
    const blob = new Blob([editableHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preview.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      // Create a temporary container for the HTML content
      const container = document.createElement("div");
      container.innerHTML = editableHtml;

      // Add some basic styles to ensure it looks good
      const style = document.createElement("style");
      style.innerHTML = `
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        img { max-width: 100%; height: auto; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      `;
      container.appendChild(style);

      // Use html2pdf to generate the PDF
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 10,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(container).save();
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };
  const handleSave = () => {
    if (onSave) {
      onSave(editableHtml);
    }
    setViewMode("preview");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: isFullscreen ? "100%" : "90%",
              height: isFullscreen ? "100%" : "90%",
              maxWidth: isFullscreen ? "100%" : "1200px",
              maxHeight: isFullscreen ? "100%" : "800px",
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "relative bg-white shadow-2xl flex flex-col overflow-hidden",
              isFullscreen ? "rounded-none" : "rounded-2xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("preview")}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      viewMode === "preview"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <Eye size={14} /> Preview
                  </button>
                  <button
                    onClick={() => setViewMode("edit")}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      viewMode === "edit"
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <Edit3 size={14} /> Edit HTML
                  </button>
                </div>
                <div className="h-4 w-px bg-gray-200 mx-2" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy HTML"
                  >
                    {copied ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                  <button
                    onClick={handleDownloadHtml}
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download HTML"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FileText size={14} />
                    {isExporting ? "Exporting..." : "Export PDF"}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 size={20} />
                  ) : (
                    <Maximize2 size={20} />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
              {viewMode === "preview" ? (
                <div className="flex-1 overflow-auto p-8 flex justify-center">
                  <div className="w-full max-w-[800px] bg-white shadow-sm border border-gray-200 rounded-lg min-h-full p-12">
                    <div
                      dangerouslySetInnerHTML={{ __html: editableHtml }}
                      className="prose prose-sm max-w-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <textarea
                    value={editableHtml}
                    onChange={(e) => setEditableHtml(e.target.value)}
                    className="flex-1 p-6 font-mono text-sm bg-gray-900 text-gray-100 resize-none outline-none"
                    spellCheck={false}
                  />
                  {onSave && (
                    <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setEditableHtml(htmlContent);
                          setViewMode("preview");
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Discard Changes
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
