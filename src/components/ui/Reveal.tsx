"use client";

import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export const Reveal = ({
  children,
  width = "fit-content",
  className,
  delay = 0.25,
  duration = 0.5,
  y = 75,
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration, delay, ease: "easeOut" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

interface RevealImageProps {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
  width?: number | string;
  height?: number | string;
}

export const RevealImage = ({
  children,
  className,
  fill = false,
  width,
  height,
}: RevealImageProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 1.1 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
      className={cn("overflow-hidden", className)}
      style={{
        position: "relative",
        width: fill ? "100%" : width,
        height: fill ? "100%" : height,
      }}
    >
      {children}
    </motion.div>
  );
};
