"use client";

import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { motion } from "framer-motion";

// Placeholder data - replace with real images and captions
const MEMORIES = [
  {
    id: 1,
    src: "/art.png", // Use placeholder
    caption: "The beginning of something beautiful",
    rotation: -3,
    width: 600,
    height: 400,
  },
  {
    id: 2,
    src: "/game1.png", // Use placeholder
    caption: "Adventures we shared",
    rotation: 2,
    width: 500,
    height: 500,
  },
  {
    id: 3,
    src: "/game3.png", // Use placeholder
    caption: "Moments of pure joy",
    rotation: -4,
    width: 400,
    height: 600,
  },
  {
    id: 4,
    src: "/game4.png", // Use placeholder
    caption: "Celebrating small victories",
    rotation: 3,
    width: 600,
    height: 400,
  },
];

export const MemoryLane = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <Reveal width="100%">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-gray-800">
          Our Memory Lane
        </h2>
      </Reveal>

      <div className="flex flex-col gap-24 items-center">
        {MEMORIES.map((memory, index) => (
          <div
            key={memory.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8 md:gap-16 w-full max-w-5xl`}
          >
            {/* Image Side */}
            <div className="flex-1 w-full flex justify-center">
              <Reveal>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ rotate: memory.rotation }}
                  className="relative p-3 bg-white shadow-xl rounded-sm transform transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden rounded-sm">
                    <Image
                      src={memory.src}
                      alt={memory.caption}
                      width={memory.width}
                      height={memory.height}
                      className="object-cover"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                  {/* Tape effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-1" />
                </motion.div>
              </Reveal>
            </div>

            {/* Caption Side */}
            <div className="flex-1 text-center md:text-left">
              <Reveal delay={0.4}>
                <p className="text-xl md:text-2xl font-serif text-gray-700 italic">
                  "{memory.caption}"
                </p>
                <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-sans">
                  Memory #{index + 1}
                </p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
