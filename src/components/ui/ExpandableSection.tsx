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
        className="expandable-toggle w-full flex items-center justify-between p-4 bg-white hover:bg-[#F0F0F0] transition-colors text-left print:hidden"
      >
        <h4 className="text-xl font-bold uppercase">{title}</h4>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {/* Title for print (always visible) */}
      <div className="hidden print:block p-4 bg-white border-b-2 border-black">
        <h4 className="text-xl font-bold uppercase">{title}</h4>
      </div>
      {/* Content for screen (conditional) */}
      {isExpanded && (
        <div className="p-6 bg-white border-t-2 border-black print:hidden">{children}</div>
      )}
      {/* Content for print (always visible) */}
      <div className="hidden print:block expandable-content p-6 bg-white">{children}</div>
    </div>
  );
}
