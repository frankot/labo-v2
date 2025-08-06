"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { AnimatedNumberProps } from "../types/animation";

const AnimatedNumber = ({
  value,
  suffix = "",
  className,
}: AnimatedNumberProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.5,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, value]);

  return (
    <motion.span
      className={`font-michroma text-3xl font-semibold tracking-tight text-stone-100 ${className || ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
      }}
      viewport={{ once: true, margin: "-20%" }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default AnimatedNumber;
