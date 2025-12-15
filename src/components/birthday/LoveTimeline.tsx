"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Dummy data for the timeline
const timelineData = [
  {
    id: 1,
    date: "First Meeting",
    title: "Where It All Began",
    description:
      "I still remember the first time I saw you. It felt like time stood still.",
    color: "bg-blue-100",
  },
  {
    id: 2,
    date: "First Date",
    title: "Coffee & Laughter",
    description:
      "We sat there for hours just talking. I knew then you were special.",
    color: "bg-pink-100",
  },
  {
    id: 3,
    date: "First Trip",
    title: "Adventures Together",
    description:
      "Exploring new places with you makes the world seem so much brighter.",
    color: "bg-purple-100",
  },
  {
    id: 4,
    date: "Today",
    title: "Celebrating You",
    description:
      "Another year of you being amazing. I'm so lucky to be by your side.",
    color: "bg-yellow-100",
  },
];

export const LoveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-[#fdfbf7]"
    >
      {/* Central Line */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-pink-300 to-transparent origin-top -translate-x-1/2"
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="space-y-32">
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  item,
  index,
}: {
  item: (typeof timelineData)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`flex items-center gap-8 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Date / Content Side */}
      <div className={`flex-1 text-right ${isEven ? "" : "text-left"}`}>
        <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-mono tracking-wider mb-2">
          {item.date}
        </span>
        <h3 className="text-3xl font-serif text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 font-light leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Center Node */}
      <div className="relative flex-shrink-0">
        <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow-md relative z-10" />
        <div className="absolute inset-0 bg-pink-200 rounded-full blur-md animate-pulse" />
      </div>

      {/* Image / Visual Side (Placeholder) */}
      <div className="flex-1">
        <div
          className={`aspect-[4/3] ${item.color} rounded-lg shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center`}
        >
          <span className="text-black/10 text-4xl font-serif italic">
            Photo
          </span>
        </div>
      </div>
    </motion.div>
  );
};
