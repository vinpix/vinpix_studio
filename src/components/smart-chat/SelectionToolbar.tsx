import React from "react";
import { X, Download, Loader2, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectionToolbarProps {
  selectedCount: number;
  onDownload: () => void;
  onClear: () => void;
  onExit: () => void;
  downloadProgress: {
    isDownloading: boolean;
    currentStep: "fetching" | "converting" | "zipping";
    current: number;
    total: number;
    currentFileName?: string;
  } | null;
}

export function SelectionToolbar({
  selectedCount,
  onDownload,
  onClear,
  onExit,
  downloadProgress,
}: SelectionToolbarProps) {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="sticky top-16 z-20 bg-indigo-50 border-b border-indigo-200 shadow-sm"
      >
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-indigo-100 px-3 py-1.5 rounded-full">
              <CheckSquare size={16} className="text-indigo-700" />
              <span className="text-sm font-semibold text-indigo-900">
                {selectedCount} Selected
              </span>
            </div>
            <p className="text-xs text-indigo-600">
              Click images to select • ESC to exit
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              disabled={selectedCount === 0 || downloadProgress?.isDownloading}
              className="px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Clear
            </button>

            <button
              onClick={onDownload}
              disabled={selectedCount === 0 || downloadProgress?.isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              {downloadProgress?.isDownloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating ZIP...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download ZIP ({selectedCount})
                </>
              )}
            </button>

            <button
              onClick={onExit}
              disabled={downloadProgress?.isDownloading}
              className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
              title="Exit Selection Mode"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Progress Modal */}
      <AnimatePresence>
        {downloadProgress?.isDownloading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-bold mb-4">Creating ZIP Archive</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {downloadProgress.currentStep === "fetching" &&
                      "Fetching images..."}
                    {downloadProgress.currentStep === "converting" &&
                      "Converting to WebP..."}
                    {downloadProgress.currentStep === "zipping" &&
                      "Creating ZIP file..."}
                  </span>
                  <span className="font-mono font-semibold">
                    {downloadProgress.current} / {downloadProgress.total}
                  </span>
                </div>

                {downloadProgress.currentFileName && (
                  <p className="text-xs text-gray-500 truncate">
                    {downloadProgress.currentFileName}
                  </p>
                )}

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (downloadProgress.current / downloadProgress.total) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Please don&apos;t close this window
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
