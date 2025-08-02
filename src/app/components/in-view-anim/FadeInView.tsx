"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import styles from "./FadeInView.module.css";

interface FadeInViewProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

export default function FadeInView({
  children,
  threshold = 0.1,
  className = "",
}: FadeInViewProps) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`${styles.animateInView} ${isInView ? styles.inView : ""} ${className}`}
    >
      {children}
    </div>
  );
}
