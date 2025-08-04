"use client";

import { AnimatedText } from "@/app/anim/components";

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
    "font-michroma sticky font-bold tracking-tight text-center pointer-events-none";

  return (
    <h1 className={`${defaultClasses} ${className}`}>
      <AnimatedText text={title} delay={delay} />
    </h1>
  );
}
