"use client";

import { motion } from "framer-motion";
import { AnimatedTextProps } from "../types/animation";

type Props = AnimatedTextProps & { onLoad?: boolean };

const AnimatedText = ({
  text,
  className,
  delay = 0,
  onLoad = false,
}: Props) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: 0.02,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate={onLoad ? "visible" : undefined}
      whileInView={onLoad ? undefined : "visible"}
      viewport={onLoad ? undefined : { once: true, margin: "-10%" }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span key={index} variants={child} className="mr-1 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;
