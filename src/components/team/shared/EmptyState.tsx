"use client";

import { Plus } from "lucide-react";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

export function EmptyState({ message, actionLabel, onAction, compact }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-black/25 text-center ${
        compact ? "p-4" : "p-10"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-black/40">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 border-2 border-black bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
        >
          <Plus size={14} /> {actionLabel}
        </button>
      )}
    </div>
  );
}
