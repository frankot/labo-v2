"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { VideoFrame } from "./VideoFrame";

interface Frame {
  id: number;
  video: string;
}

interface MobileGridProps {
  frames: Frame[];
}

export function MobileGrid({ frames }: MobileGridProps) {
  const [expandedFrame, setExpandedFrame] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple visibility on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardTap = useCallback((frameId: number) => {
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
        {frames.map((frame, index) => {
          const isExpanded = expandedFrame === frame.id;

          return (
            <div
              key={frame.id}
              className={`relative cursor-pointer overflow-hidden transition-all duration-300 select-none ${
                isExpanded ? "h-80" : "h-52"
              } active:scale-95`}
              style={{
                animationDelay: `${index * 100}ms`,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                transform: "translateZ(0)", // GPU acceleration
                contain: "layout style paint", // Performance optimization
              }}
              onClick={() => handleCardTap(frame.id)}
            >
              <VideoFrame
                video={frame.video}
                isMobile={true}
                className="h-full w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
