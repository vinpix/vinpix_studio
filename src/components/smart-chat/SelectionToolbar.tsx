import React from "react";
import { X, Download, Loader2, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectionToolbarProps {
  selectedCount: number;
  onDownload: () => void;
  onClear: () => void;
  onSelectAll: () => void;
  onExit: () => void;
  downloadProgress: {
    isDownloading: boolean;
    currentStep: "fetching" | "converting" | "zipping";
    current: number;
    total: number;
    currentFileName?: string;
  } | null;
  /** Optional extra action rendered before Download (e.g. "Add to Batch"). */
  extraAction?: React.ReactNode;
}

export function SelectionToolbar({
  selectedCount,
  onDownload,
  onClear,
  onSelectAll,
  onExit,
  downloadProgress,
  extraAction,
}: SelectionToolbarProps) {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="sticky top-16 z-20 border-b border-indigo-200/70 bg-indigo-50/95 shadow-sm backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
              <CheckSquare size={15} />
              <span className="tabular-nums">{selectedCount}</span>
              <span className="font-medium opacity-90">selected</span>
            </span>
            <p className="hidden truncate whitespace-nowrap text-xs text-indigo-500 lg:block">
              Click images to select · ESC to exit
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={onClear}
              disabled={selectedCount === 0 || downloadProgress?.isDownloading}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-40"
            >
              Clear
            </button>

            <button
              onClick={onSelectAll}
              disabled={downloadProgress?.isDownloading}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-40"
            >
              Select All
            </button>

            <span aria-hidden className="mx-1.5 hidden h-6 w-px bg-indigo-200 sm:block" />

            {extraAction}

            <button
              onClick={onDownload}
              disabled={selectedCount === 0 || downloadProgress?.isDownloading}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
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
              className="ml-0.5 rounded-lg p-2 text-indigo-500 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
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
