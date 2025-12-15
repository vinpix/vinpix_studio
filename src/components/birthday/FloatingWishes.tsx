"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const wishes = [
  "Happy Birthday!",
  "Love You ❤️",
  "Make a Wish ✨",
  "Best Day Ever",
  "Cheers! 🥂",
  "Keep Shining 🌟",
  "Joy & Laughter",
  "Forever Young",
];

interface FloatingWish {
  id: number;
  text: string;
  x: number;
  delay: number;
  duration: number;
  scale: number;
}

export const FloatingWishes = () => {
  const [items, setItems] = useState<FloatingWish[]>([]);

  useEffect(() => {
    // Generate random items on client side only to avoid hydration mismatch
    const newItems = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      text: wishes[Math.floor(Math.random() * wishes.length)],
      x: Math.random() * 100, // percentage
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 15,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: "110vh", x: `${item.x}vw`, opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
            x: [`${item.x}vw`, `${item.x + (Math.random() * 10 - 5)}vw`], // Slight drift
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{ scale: item.scale }}
          className="absolute text-pink-300/30 font-serif text-4xl font-bold whitespace-nowrap select-none"
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
};
