"use client";

import { useState, useRef, useEffect } from "react";
import { BirthdayHero } from "@/components/birthday/BirthdayHero";
import { LoveTimeline } from "@/components/birthday/LoveTimeline";
import { LoveQuiz } from "@/components/birthday/LoveQuiz";
import { FloatingWishes } from "@/components/birthday/FloatingWishes";
import { Letter } from "@/components/birthday/Letter";
import { GiftBox } from "@/components/birthday/GiftBox";
import { BackgroundAudio } from "@/components/birthday/BackgroundAudio";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

export default function HappyBirthdayPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize smooth scroll if opened to prevent scroll jank during intro
    if (isOpened) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [isOpened]);

  return (
    <main
      ref={containerRef}
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-1000 ${
        isOpened ? "bg-[#fdfbf7]" : "bg-black"
      }`}
    >
      <BackgroundAudio startPlaying={isOpened} />

      {/* Hero Section - Always present but changes state */}
      <section className="relative h-screen sticky top-0 z-20">
        <BirthdayHero isOpened={isOpened} onOpen={() => setIsOpened(true)} />
      </section>

      {/* Content Sections - Only visible after opening */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative z-10 bg-[#fdfbf7]"
          >
            {/* Background Effects */}
            <FloatingWishes />

            {/* 1. Timeline */}
            <LoveTimeline />

            {/* 2. Quiz Section */}
            <section className="py-24 px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">
                  One Last Thing...
                </h2>
                <p className="text-gray-600 italic">
                  Prove you know me to get your gift!
                </p>
              </div>
              <LoveQuiz onUnlock={() => setIsUnlocked(true)} />
            </section>

            {/* 3. Letter */}
            <Letter />

            {/* 4. Final Gift - Gated by Quiz */}
            <section className="py-24 pb-48 px-4 flex justify-center relative z-10 min-h-[50vh] items-center">
              {isUnlocked ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <GiftBox />
                </motion.div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl opacity-50 select-none grayscale">
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="font-serif text-xl">Locked</p>
                </div>
              )}
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-gray-400 font-light text-sm relative z-10">
              <p>Made with ❤️ just for you.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
