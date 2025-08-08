"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoFrame } from "./VideoFrame";
import { type CaseStudy } from "../../../lib/realizacje-data";

interface MobileGridProps {
  caseStudies: CaseStudy[];
}

export function MobileGrid({ caseStudies }: MobileGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Simple visibility on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [caseStudies.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length,
    );
    setTimeout(() => setIsTransitioning(false), 300);
  }, [caseStudies.length, isTransitioning]);

  // Touch handlers for swipe gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  }, [goToNext, goToPrevious]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const currentCaseStudy = caseStudies[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`h-full w-full overflow-hidden transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="relative h-full w-full">
        {/* Main carousel container */}
        <div
          className="relative h-full w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: "pan-y",
            WebkitTapHighlightColor: "transparent",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          {/* Current slide */}
          <div
            className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isTransitioning ? "scale-95 opacity-80" : "scale-100 opacity-100"
            }`}
          >
            <VideoFrame
              video={currentCaseStudy.video}
              isMobile={true}
              className="h-full w-full"
              caseStudy={currentCaseStudy}
              isHovered={true}
            />
          </div>

          {/* Navigation chevrons */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/40 active:scale-95 disabled:opacity-50"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/40 active:scale-95 disabled:opacity-50"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 z-10 rounded-full bg-black/20 px-3 py-1 backdrop-blur-sm">
            <span className="font-michroma text-xs text-white">
              {currentIndex + 1} / {caseStudies.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
