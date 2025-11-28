"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  children: React.ReactNode;
  className?: string;
  viewportAmount?: number;
}

export default function SidebarSection({
  children,
  className,
  viewportAmount = 0.3,
}: SidebarSectionProps) {
  return (
    <motion.div
      initial={{
        backgroundColor: "rgba(0,0,0,0)",
        color: "#000000",
        scale: 0.98,
        boxShadow: "inset 0px 0 0 0 #000",
      }}
      whileInView={{
        backgroundColor: "#111111",
        color: "#FFFFFF",
        scale: 1,
        // using border instead of box-shadow for better performance
        borderLeftWidth: "6px",
        borderColor: "#ffffff",
      }}
      viewport={{ amount: viewportAmount, margin: "-10% 0px -10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 20,
        mass: 1,
      }}
      className={cn(
        "flex flex-col justify-between relative transition-colors will-change-transform border-l-0 border-transparent",
        className
      )}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>

      {/* Visual gloss effect - purely opacity based, very cheap */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
