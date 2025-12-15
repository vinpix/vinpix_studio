"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const letterContent = [
  "Dear [Name],",
  "",
  "As I sit down to write this, I find myself overwhelmed with gratitude for having you in my life. Today isn't just a celebration of another year passing, but a celebration of the wonderful person you are.",
  "",
  "Looking back at all the memories we've shared, I can't help but smile. You bring so much light, laughter, and warmth to everyone around you.",
  "",
  "My wish for you this year is simple: may you find as much happiness as you give to others. May your days be filled with exciting adventures, quiet moments of peace, and dreams coming true.",
  "",
  "Thank you for being you.",
];

export const Letter = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (isInView) {
      if (currentLineIndex < letterContent.length) {
        const line = letterContent[currentLineIndex];

        if (currentCharIndex < line.length) {
          const timeout = setTimeout(() => {
            setDisplayedLines((prev) => {
              const newLines = [...prev];
              if (newLines[currentLineIndex] === undefined) {
                newLines[currentLineIndex] = "";
              }
              newLines[currentLineIndex] += line[currentCharIndex];
              return newLines;
            });
            setCurrentCharIndex((prev) => prev + 1);
          }, 30); // Typing speed
          return () => clearTimeout(timeout);
        } else {
          // Line finished, move to next
          const timeout = setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          }, 400); // Pause between lines
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [isInView, currentLineIndex, currentCharIndex]);

  return (
    <section className="py-24 px-4 flex justify-center relative z-10">
      <div className="max-w-2xl w-full" ref={containerRef}>
        <Reveal width="100%">
          <div className="bg-white p-8 md:p-16 shadow-2xl border border-gray-100 relative rotate-1 transform transition-transform hover:rotate-0 duration-500">
            {/* Paper texture effect */}
            <div className="absolute inset-0 bg-[#fffdf0] opacity-50 z-0" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-50 z-10" />

            <div className="relative z-10 font-mono text-gray-800 leading-relaxed text-lg space-y-2 min-h-[400px]">
              {displayedLines.map((line, index) => (
                <p
                  key={index}
                  className={
                    index === 0 ? "text-2xl font-bold mb-6 font-serif" : ""
                  }
                >
                  {line}
                  {index === currentLineIndex &&
                    index < letterContent.length && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-5 bg-gray-800 ml-1 align-middle"
                      />
                    )}
                </p>
              ))}

              {/* Pre-allocate space or just let it grow? Let it grow for now. */}
              {currentLineIndex === 0 && !isInView && (
                <p className="text-gray-300 italic">Waiting to open...</p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentLineIndex >= letterContent.length ? 1 : 0,
              }}
              transition={{ duration: 1 }}
              className="mt-12 text-right"
            >
              <p className="font-serif text-xl italic text-gray-800">
                With love,
              </p>
              <p className="font-serif text-xl font-bold text-gray-800 mt-2">
                [Your Name]
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
