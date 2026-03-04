"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Play, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  parseBulkTaskJsonItems,
  parseBulkTaskJsonByPath,
  parseBulkTaskMarkdown,
} from "@/lib/bulkTaskApi";
import type { BulkTaskItem } from "@/types/bulkTask";

interface BulkTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (items: BulkTaskItem[], delay: number) => void;
}

export function BulkTaskModal({
  isOpen,
  onClose,
  onStart,
}: BulkTaskModalProps) {
  const [step, setStep] = useState(1);
  const [inputMode, setInputMode] = useState<"markdown" | "json">("markdown");
  const [markdownInput, setMarkdownInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonPath, setJsonPath] = useState("datas[*].prompt");
  const [jsonNamePath, setJsonNamePath] = useState("");
  const [parsedItems, setParsedItems] = useState<BulkTaskItem[]>([]);
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
          if (data.inputMode) setInputMode(data.inputMode);
          if (data.markdownInput) setMarkdownInput(data.markdownInput);
          if (data.jsonInput) setJsonInput(data.jsonInput);
          if (data.jsonPath) setJsonPath(data.jsonPath);
          if (data.jsonNamePath) setJsonNamePath(data.jsonNamePath);
          if (Array.isArray(data.parsedItems)) {
            setParsedItems(data.parsedItems);
          } else if (Array.isArray(data.parsedPrompts)) {
            setParsedItems(
              data.parsedPrompts.map((prompt: string, index: number) => ({
                name: `Task ${String(index + 1).padStart(3, "0")}`,
                prompt,
              }))
            );
          }
          if (data.selectedIndices)
            setSelectedIndices(new Set(data.selectedIndices));
          if (data.startFromIndex) setStartFromIndex(data.startFromIndex);

          // Smart restoration of step
          if (
            (data.parsedItems && data.parsedItems.length > 0) ||
            (data.parsedPrompts && data.parsedPrompts.length > 0)
          ) {
            // If we have parsed prompts, go to at least step 2
            // If saved step was 3, go there.
            setStep(data.step && data.step >= 2 ? data.step : 2);
          } else if (data.markdownInput) {
            // If we have text but no prompts, go to step 1
            setStep(1);
          } else if (data.jsonInput) {
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
        inputMode,
        markdownInput,
        jsonInput,
        jsonPath,
        jsonNamePath,
        parsedItems,
        delay,
        selectedIndices: Array.from(selectedIndices),
        startFromIndex,
      };
      localStorage.setItem("bulk_task_cache", JSON.stringify(cacheData));
    }
  }, [
    step,
    inputMode,
    markdownInput,
    jsonInput,
    jsonPath,
    jsonNamePath,
    parsedItems,
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
      setJsonInput("");
      setJsonPath("datas[*].prompt");
      setJsonNamePath("");
      setParsedItems([]);
      setDelay(2000);
      setError("");
      localStorage.removeItem("bulk_task_cache");
    }
  };

  const handleParse = async () => {
    if (inputMode === "markdown" && !markdownInput.trim()) {
      setError("Please enter some markdown to parse");
      return;
    }

    if (inputMode === "json" && !jsonInput.trim()) {
      setError("Please paste JSON input");
      return;
    }

    if (inputMode === "json" && !jsonPath.trim()) {
      setError("Please enter a JSON path (example: datas[*].prompt)");
      return;
    }

    setParsing(true);
    setError("");

    try {
      const result =
        inputMode === "markdown"
          ? await parseBulkTaskMarkdown(markdownInput)
          : parseBulkTaskJsonByPath({ jsonText: jsonInput, path: jsonPath });
      const parsedJsonItems =
        inputMode === "json"
          ? parseBulkTaskJsonItems({
              jsonText: jsonInput,
              promptPath: jsonPath,
              namePath: jsonNamePath,
            })
          : null;

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
        setError(
          inputMode === "markdown"
            ? "No prompts were parsed. Please check your input format."
            : "No prompts found. Please verify your JSON and path."
        );
        console.warn("[BulkTaskModal] Empty prompts array");
        return;
      }

      // Success case
      if (result.success) {
        setParsedItems(result.prompts.map((prompt, index) => {
          const nameFromPath = parsedJsonItems?.names[index];
          return {
            name:
              nameFromPath?.trim() ||
              `Task ${String(index + 1).padStart(3, "0")}`,
            prompt,
          };
        }));
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
    const updated = [...parsedItems];
    updated[index] = { ...updated[index], prompt: newValue };
    setParsedItems(updated);
  };

  const handleUpdateName = (index: number, newValue: string) => {
    const updated = [...parsedItems];
    updated[index] = { ...updated[index], name: newValue };
    setParsedItems(updated);
  };

  const handleRemovePrompt = (index: number) => {
    setParsedItems(parsedItems.filter((_, i) => i !== index));
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
    if (selectedIndices.size === parsedItems.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(parsedItems.map((_, i) => i)));
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
    for (let i = index - 1; i < parsedItems.length; i++) {
      newSelected.add(i);
    }
    setSelectedIndices(newSelected);
  };

  const handleStart = () => {
    const itemsToRun = parsedItems
      .filter((_, i) => selectedIndices.has(i))
      .map((item, index) => ({
        ...item,
        name: item.name?.trim() || `Task ${String(index + 1).padStart(3, "0")}`,
        prompt: item.prompt.trim(),
      }))
      .filter((item) => item.prompt.length > 0);

    if (itemsToRun.length === 0) {
      setError("No valid prompts selected to execute");
      return;
    }
    onStart(itemsToRun, delay);
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
                  Step {step} of 3 • {parsedItems.length} prompts
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
                        Input Source
                      </label>
                      {(markdownInput || jsonInput) && (
                        <button
                          onClick={handleClearCache}
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={12} />
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                      <button
                        onClick={() => setInputMode("markdown")}
                        className={cn(
                          "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                          inputMode === "markdown"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        Markdown
                      </button>
                      <button
                        onClick={() => setInputMode("json")}
                        className={cn(
                          "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                          inputMode === "json"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        JSON
                      </button>
                    </div>
                  </div>

                  {inputMode === "markdown" ? (
                    <div>
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
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          JSON Path
                        </label>
                        <input
                          value={jsonPath}
                          onChange={(e) => setJsonPath(e.target.value)}
                          placeholder="datas[*].prompt"
                          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supports dot path, array wildcard and index. Example:
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded ml-1">
                            datas[*].prompt
                          </code>
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Name Path (optional)
                        </label>
                        <input
                          value={jsonNamePath}
                          onChange={(e) => setJsonNamePath(e.target.value)}
                          placeholder="datas[*].id"
                          className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          If provided, each task name will use this path.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          JSON Input
                        </label>
                        <textarea
                          value={jsonInput}
                          onChange={(e) => setJsonInput(e.target.value)}
                          placeholder='Paste JSON. Example: {"version":1,"datas":[{"prompt":"..."},{"prompt":"..."}]}'
                          className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100 resize-none min-h-[260px]"
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleParse}
                    disabled={
                      parsing ||
                      (inputMode === "markdown" && !markdownInput.trim()) ||
                      (inputMode === "json" && (!jsonInput.trim() || !jsonPath.trim()))
                    }
                    className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {parsing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Parsing...
                      </>
                    ) : (
                      "Extract Prompts"
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
                          Parsed Prompts ({parsedItems.length})
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                          <input
                            type="checkbox"
                            checked={
                              selectedIndices.size === parsedItems.length &&
                              parsedItems.length > 0
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
                            max={parsedItems.length}
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
                    {parsedItems.map((item, index) => (
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
                        <div className="flex-1 space-y-2">
                          <input
                            value={item.name}
                            onChange={(e) =>
                              handleUpdateName(index, e.target.value)
                            }
                            placeholder={`Task ${String(index + 1).padStart(3, "0")}`}
                            className="w-full border border-gray-200 rounded-lg p-2 text-xs font-medium outline-none focus:border-black/20 bg-white"
                          />
                          <textarea
                            value={item.prompt}
                            onChange={(e) =>
                              handleUpdatePrompt(index, e.target.value)
                            }
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-black/20 resize-none min-h-[60px] bg-white"
                          />
                        </div>
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
                      disabled={parsedItems.length === 0}
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
