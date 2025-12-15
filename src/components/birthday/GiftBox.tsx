"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Gift } from "lucide-react";

export const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfbf7] to-white overflow-hidden">
      <Reveal width="100%">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">
            One Last Surprise
          </h2>
          <p className="text-gray-500 font-light">Click to open your gift</p>
        </div>
      </Reveal>

      <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
        <motion.div
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Lid */}
          <motion.div
            className="absolute top-0 left-0 w-full z-20 flex items-center justify-center"
            initial={{ y: 0, rotateX: 0 }}
            animate={
              isOpen
                ? {
                    y: -150,
                    rotateX: 20,
                    opacity: 0,
                  }
                : {
                    y: [0, -5, 0],
                  }
            }
            transition={
              isOpen
                ? { duration: 0.8, ease: "backIn" }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
          >
            {/* Simple visual representation of lid top using divs since we don't have 3D assets */}
            <div className="w-48 h-12 bg-pink-400 rounded-md shadow-md relative flex justify-center items-center border-b-4 border-pink-500">
              <div className="w-12 h-full bg-pink-300"></div>
            </div>
            {/* Bow */}
            <div className="absolute -top-10 text-pink-500 drop-shadow-lg">
              <Gift
                size={80}
                strokeWidth={1}
                fill="pink"
                className="text-pink-600"
              />
            </div>
          </motion.div>

          {/* Box Body */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-200 rounded-md shadow-xl flex items-center justify-center border-b-8 border-pink-300"
            animate={isOpen ? { scale: 0.9, y: 50, opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-full bg-pink-300/50"></div>
          </motion.div>

          {/* The Content (Hidden initially) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 bg-white p-6 rounded-lg shadow-2xl border-2 border-yellow-200 text-center z-10"
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={
              isOpen
                ? { scale: 1, opacity: 1, rotate: 0 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="flex justify-center mb-4 text-yellow-500">
              <Sparkles size={40} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
              A Special Treat!
            </h3>
            <p className="text-gray-600 mb-6 font-light">
              This voucher is good for:
            </p>
            <div className="border-2 border-dashed border-pink-300 p-4 rounded bg-pink-50 mb-4">
              <p className="font-bold text-xl text-pink-600 font-serif">
                One Romantic Dinner Date 🍷
              </p>
              <p className="text-xs text-pink-400 mt-1">
                Valid anytime, anywhere.
              </p>
            </div>
            <p className="text-xs text-gray-400">Screenshot this to redeem!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
