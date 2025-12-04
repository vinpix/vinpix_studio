import React from "react";
import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 h-4">
      <motion.div
        className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      />
      <motion.div
        className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
  );
}

