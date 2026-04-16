"use client";

import { StaggeredText } from "@/app/anim/components";

interface StickyHeaderProps {
  title: string;
  delay?: number;
  className?: string;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function StickyHeader({
  title,
  delay = 1,
  className = "",
  staggerDelay = 0.04,
  as: Tag = "h2",
}: StickyHeaderProps) {
  const defaultClasses =
    "font-michroma sticky top-[5px] z-0 font-bold tracking-tight text-center pointer-events-none text-[3rem] text-white/20 lg:text-[5rem] xl:text-[11rem]";

  return (
    <Tag className={`${defaultClasses} ${className}`}>
      <StaggeredText text={title} delay={delay} staggerDelay={staggerDelay} />
    </Tag>
  );
}
