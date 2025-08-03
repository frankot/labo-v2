"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { VideoFrame } from "./VideoFrame";
import { type CaseStudy } from "../../../lib/realizacje-data";

interface MobileGridProps {
  caseStudies: CaseStudy[];
}

export function MobileGrid({ caseStudies }: MobileGridProps) {
  const [expandedFrame, setExpandedFrame] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple visibility on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardTap = useCallback((frameId: string) => {
    setExpandedFrame((current) => (current === frameId ? null : frameId));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full overflow-y-auto transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex min-h-full flex-col gap-1 p-2">
        {caseStudies.map((caseStudy, index) => {
          const isExpanded = expandedFrame === caseStudy.id;

          return (
            <div
              key={caseStudy.id}
              className={`relative cursor-pointer overflow-hidden transition-all duration-300 select-none ${
                isExpanded ? "h-80" : "h-52"
              } active:scale-95`}
              style={{
                animationDelay: `${index * 300}ms`,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                transform: "translateZ(0)",
                contain: "layout style paint",
              }}
              onClick={() => handleCardTap(caseStudy.id)}
            >
              <VideoFrame
                video={caseStudy.video}
                isMobile={true}
                className="h-full w-full"
                caseStudy={caseStudy}
                isHovered={isExpanded} // Only show overlay when expanded
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
