"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ExpandableSection({
  title,
  defaultExpanded = false,
  children,
  className = "",
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`border-2 border-black ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F0F0F0] transition-colors text-left"
      >
        <h4 className="text-xl font-bold uppercase">{title}</h4>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isExpanded && (
        <div className="p-6 bg-white border-t-2 border-black">{children}</div>
      )}
    </div>
  );
}
