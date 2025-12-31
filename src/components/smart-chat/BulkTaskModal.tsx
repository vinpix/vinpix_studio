"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Play, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { parseBulkTaskMarkdown } from "@/lib/bulkTaskApi";

interface BulkTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (prompts: string[], delay: number) => void;
}

export function BulkTaskModal({
  isOpen,
  onClose,
  onStart,
}: BulkTaskModalProps) {
  const [step, setStep] = useState(1);
  const [markdownInput, setMarkdownInput] = useState("");
  const [parsedPrompts, setParsedPrompts] = useState<string[]>([]);
  const [delay, setDelay] = useState(2000); // Default 2 seconds
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const [isRestored, setIsRestored] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [startFromIndex, setStartFromIndex] = useState(1);

  // Load from cache when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const cached = localStorage.getItem("bulk_task_cache");
        if (cached) {
          const data = JSON.parse(cached);

          // Restore settings and data
          if (data.delay) setDelay(data.delay);
          if (data.markdownInput) setMarkdownInput(data.markdownInput);
          if (data.parsedPrompts) setParsedPrompts(data.parsedPrompts);
          if (data.selectedIndices)
            setSelectedIndices(new Set(data.selectedIndices));
          if (data.startFromIndex) setStartFromIndex(data.startFromIndex);

          // Smart restoration of step
          if (data.parsedPrompts && data.parsedPrompts.length > 0) {
            // If we have parsed prompts, go to at least step 2
            // If saved step was 3, go there.
            setStep(data.step && data.step >= 2 ? data.step : 2);
          } else if (data.markdownInput) {
            // If we have text but no prompts, go to step 1
            setStep(1);
          }
        }
      } catch (e) {
        console.error("Failed to restore bulk task cache", e);
      } finally {
        setIsRestored(true);
      }
    } else {
      setIsRestored(false);
    }
  }, [isOpen]);

  // Save to cache whenever state changes
  useEffect(() => {
    if (isOpen && isRestored) {
      const cacheData = {
        step,
        markdownInput,
        parsedPrompts,
        delay,
        selectedIndices: Array.from(selectedIndices),
        startFromIndex,
      };
      localStorage.setItem("bulk_task_cache", JSON.stringify(cacheData));
    }
  }, [
    step,
    markdownInput,
    parsedPrompts,
    delay,
    selectedIndices,
    startFromIndex,
    isOpen,
    isRestored,
  ]);

  const handleClearCache = () => {
    if (confirm("Are you sure you want to clear all bulk task data?")) {
      setStep(1);
      setMarkdownInput("");
      setParsedPrompts([]);
      setDelay(2000);
      setError("");
      localStorage.removeItem("bulk_task_cache");
    }
  };

  const handleParse = async () => {
    if (!markdownInput.trim()) {
      setError("Please enter some text to parse");
      return;
    }

    setParsing(true);
    setError("");

    try {
      const result = await parseBulkTaskMarkdown(markdownInput);

      // Add logging to debug the response structure
      console.log(
        "[BulkTaskModal] Parse result:",
        JSON.stringify(result, null, 2)
      );

      // Check for error in response
      if (result && typeof result === "object" && "error" in result) {
        const errorMsg =
          typeof result.error === "string"
            ? result.error
            : "Failed to parse prompts";
        setError(errorMsg);
        console.error("[BulkTaskModal] Backend error:", result.error);
        return;
      }

      // Validate response structure
      if (!result || typeof result !== "object") {
        setError("Invalid response from server. Please try again.");
        console.error("[BulkTaskModal] Invalid result:", result);
        return;
      }

      // Check if prompts array exists and is valid
      if (!Array.isArray(result.prompts)) {
        setError("Invalid response format. Expected prompts array.");
        console.error("[BulkTaskModal] Missing or invalid prompts:", result);
        return;
      }

      // Check if we got any prompts
      if (result.prompts.length === 0) {
        setError("No prompts were parsed. Please check your input format.");
        console.warn("[BulkTaskModal] Empty prompts array");
        return;
      }

      // Success case
      if (result.success) {
        setParsedPrompts(result.prompts);
        setSelectedIndices(new Set(result.prompts.map((_, i) => i)));
        setStartFromIndex(1);
        setStep(2);
      } else {
        setError("Failed to parse prompts. Please check your input format.");
      }
    } catch (e) {
      const errorMsg =
        e instanceof Error ? e.message : "An error occurred while parsing";
      setError(errorMsg);
      console.error("[BulkTaskModal] Exception:", e);
    } finally {
      setParsing(false);
    }
  };

  const handleUpdatePrompt = (index: number, newValue: string) => {
    const updated = [...parsedPrompts];
    updated[index] = newValue;
    setParsedPrompts(updated);
  };

  const handleRemovePrompt = (index: number) => {
    setParsedPrompts(parsedPrompts.filter((_, i) => i !== index));
    const newSelected = new Set(selectedIndices);
    newSelected.delete(index);
    // Shift indices after the removed one
    const shiftedSelected = new Set<number>();
    newSelected.forEach((i) => {
      if (i < index) shiftedSelected.add(i);
      else if (i > index) shiftedSelected.add(i - 1);
    });
    setSelectedIndices(shiftedSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIndices.size === parsedPrompts.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(parsedPrompts.map((_, i) => i)));
    }
  };

  const toggleSelectPrompt = (index: number) => {
    const newSelected = new Set(selectedIndices);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedIndices(newSelected);
  };

  const handleStartFrom = (index: number) => {
    setStartFromIndex(index);
    const newSelected = new Set<number>();
    for (let i = index - 1; i < parsedPrompts.length; i++) {
      newSelected.add(i);
    }
    setSelectedIndices(newSelected);
  };

  const handleStart = () => {
    const promptsToRun = parsedPrompts.filter((_, i) => selectedIndices.has(i));

    if (promptsToRun.length === 0) {
      setError("No prompts selected to execute");
      return;
    }
    onStart(promptsToRun, delay);
    handleClose();
  };

  const handleClose = () => {
    // We don't clear state here anymore to allow persistence
    // State is cleared only via handleClearCache
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create Bulk Task
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Step {step} of 3 • {parsedPrompts.length} prompts
                  {step >= 2 && ` (${selectedIndices.size} selected)`}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Paste Markdown */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Paste Markdown Input
                      </label>
                      {markdownInput && (
                        <button
                          onClick={handleClearCache}
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          Clear
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Example format:
                      <br />
                      <code className="bg-gray-100 px-2 py-1 rounded mt-1 block">
                        # Prefix: Icon white background
                        <br />- Red sneakers with tiny white wings
                        <br />- Blue running shoes with golden wings
                      </code>
                    </p>
                    <textarea
                      value={markdownInput}
                      onChange={(e) => setMarkdownInput(e.target.value)}
                      placeholder="Paste your markdown here..."
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100 resize-none min-h-[300px]"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleParse}
                    disabled={parsing || !markdownInput.trim()}
                    className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {parsing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Parsing...
                      </>
                    ) : (
                      "Parse Prompts"
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Review Prompts */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4">
                        <label className="block text-sm font-semibold text-gray-700">
                          Parsed Prompts ({parsedPrompts.length})
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                          <input
                            type="checkbox"
                            checked={
                              selectedIndices.size === parsedPrompts.length &&
                              parsedPrompts.length > 0
                            }
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                          />
                          <span className="text-xs font-medium text-gray-600">
                            Select All
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Start from:
                          </span>
                          <input
                            type="number"
                            min="1"
                            max={parsedPrompts.length}
                            value={startFromIndex}
                            onChange={(e) =>
                              handleStartFrom(parseInt(e.target.value) || 1)
                            }
                            className="w-16 border border-gray-200 rounded p-1 text-xs outline-none focus:border-black/20"
                          />
                        </div>
                        <button
                          onClick={handleClearCache}
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          Clear All
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Review and edit prompts before execution. Only checked
                      prompts will be run.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {parsedPrompts.map((prompt, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-2 items-start p-2 rounded-lg transition-colors",
                          selectedIndices.has(index)
                            ? "bg-indigo-50/30"
                            : "opacity-60"
                        )}
                      >
                        <div className="flex flex-col items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            checked={selectedIndices.has(index)}
                            onChange={() => toggleSelectPrompt(index)}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {index + 1}
                          </div>
                        </div>
                        <textarea
                          value={prompt}
                          onChange={(e) =>
                            handleUpdatePrompt(index, e.target.value)
                          }
                          className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-black/20 resize-none min-h-[60px] bg-white"
                        />
                        <button
                          onClick={() => handleRemovePrompt(index)}
                          className="flex-shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                          title="Remove prompt"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={parsedPrompts.length === 0}
                      className="flex-1 bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Configure and Start */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Delay Between Tasks
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Time to wait between sending each prompt
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="500"
                        max="30000"
                        step="500"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-sm font-semibold text-gray-700 w-20 text-right">
                        {delay < 1000
                          ? `${delay}ms`
                          : `${(delay / 1000).toFixed(1)}s`}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Fast (0.5s)</span>
                      <span>Slow (30s)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Summary
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {selectedIndices.size} prompts selected to run</li>
                      <li>
                        •{" "}
                        {delay < 1000
                          ? `${delay}ms`
                          : `${(delay / 1000).toFixed(1)}s`}{" "}
                        delay between each
                      </li>
                      <li>
                        • Prompts will be sent to chat input automatically
                      </li>
                      <li>
                        • Using current smart chat settings for image generation
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleStart}
                      className="flex-1 bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={18} />
                      Start Execution
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
