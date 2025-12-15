"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SplashCursor from "@/components/SplashCursor";
import { InteractiveCake } from "./InteractiveCake";

interface BirthdayHeroProps {
  onOpen: () => void;
  isOpened: boolean;
}

export const BirthdayHero = ({ onOpen, isOpened }: BirthdayHeroProps) => {
  const [showCake, setShowCake] = useState(false);

  const handleStart = () => {
    setShowCake(true);
  };

  const handleCakeComplete = () => {
    triggerConfetti();
    onOpen();
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        background: isOpened
          ? "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)" // pastel pink to lavender
          : "#000000",
      }}
    >
      <div className="absolute inset-0 z-0">
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          DENSITY_DISSIPATION={isOpened ? 1.5 : 3.0}
          VELOCITY_DISSIPATION={isOpened ? 1.0 : 2.0}
          PRESSURE={0.8}
          SPLAT_FORCE={isOpened ? 4000 : 6000}
          CURL={isOpened ? 10 : 3}
          // Bright joyful colors when opened, dim mysterious colors when closed
          BACK_COLOR={
            isOpened ? { r: 0.9, g: 0.9, b: 1.0 } : { r: 0, g: 0, b: 0 }
          }
        />
      </div>

      <div className="z-10 relative w-full px-4">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            !showCake ? (
              // Stage 1: The Dark Room (Intro)
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full cursor-pointer"
                onClick={handleStart}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-white/80 font-serif text-2xl tracking-widest text-center"
                >
                  <p className="mb-4">It's dark in here...</p>
                  <p className="text-sm opacity-50 uppercase tracking-[0.3em]">
                    Click to Light a Candle
                  </p>
                </motion.div>

                {/* Spotlight effect follows cursor via SplashCursor, 
                    but we add a subtle glow here */}
                <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
              </motion.div>
            ) : (
              // Stage 2: The Candle Ritual
              <motion.div
                key="cake"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full"
              >
                <InteractiveCake onComplete={handleCakeComplete} />
              </motion.div>
            )
          ) : (
            // Stage 3: Celebration
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
              className="text-center pointer-events-none"
            >
              <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm mb-4 font-serif">
                Happy Birthday!
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-600 text-lg md:text-xl font-light italic mt-4"
              >
                Scroll down for your surprise ↓
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
