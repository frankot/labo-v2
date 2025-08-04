"use client";

import { motion } from "framer-motion";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const StaggeredText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
}: StaggeredTextProps) => {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-25%" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
            },
          }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggeredText;
