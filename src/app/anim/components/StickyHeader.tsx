"use client";

import { motion } from "framer-motion";

interface StickyHeaderProps {
  title: string;
  delay?: number;
  className?: string;
}

export default function StickyHeader({
  title,
  delay = 1,
  className = "",
}: StickyHeaderProps) {
  const defaultClasses =
    "font-michroma sticky font-bold tracking-tight text-center";

  return (
    <h1 className={`${defaultClasses} ${className}`}>
      <motion.span
        className="inline-block whitespace-nowrap"
        initial={{
          opacity: 0,
          letterSpacing: "1em",
          z: 400,
          y: -300,
        }}
        whileInView={{
          opacity: 1,
          letterSpacing: "normal",
          z: 0,
          y: 0,
        }}
        transition={{
          duration: 1.2,
          delay,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          margin: "-40% 0px -40% 0px",
        }}
      >
        {title}
      </motion.span>
    </h1>
  );
}
