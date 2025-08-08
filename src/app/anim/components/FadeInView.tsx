"use client";

import { motion } from "framer-motion";
import { FadeInViewProps } from "../types/animation";

const FadeInView = ({
  children,
  threshold = 0.1,
  className = "",
  rootMargin = "0px",
  onLoad = false,
}: FadeInViewProps & { onLoad?: boolean }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={onLoad ? { opacity: 1, y: 0 } : undefined}
      whileInView={onLoad ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      viewport={
        onLoad
          ? undefined
          : {
              once: true,
              amount: threshold,
              margin: rootMargin,
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default FadeInView;
