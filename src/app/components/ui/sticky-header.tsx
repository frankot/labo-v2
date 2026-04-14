"use client";

import { StaggeredText } from "@/app/anim/components";

interface StickyHeaderProps {
  title: string;
  delay?: number;
  className?: string;
  staggerDelay?: number;
}

export default function StickyHeader({
  title,
  delay = 1,
  className = "",
  staggerDelay = 0.04,
}: StickyHeaderProps) {
  const defaultClasses =
    "font-michroma sticky top-[5px] z-0 font-bold tracking-tight text-center pointer-events-none text-[3rem] text-white/20 lg:text-[5rem] xl:text-[11rem]";

  return (
    <h1 className={`${defaultClasses} ${className}`}>
      <StaggeredText text={title} delay={delay} staggerDelay={staggerDelay} />
    </h1>
  );
}
