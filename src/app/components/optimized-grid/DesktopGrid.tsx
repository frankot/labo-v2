"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { VideoFrame } from "./VideoFrame";

interface Frame {
  id: number;
  video: string;
  defaultPos: { x: number; y: number };
}

interface DesktopGridProps {
  frames: Frame[];
}

export function DesktopGrid({ frames }: DesktopGridProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple visibility on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Update CSS custom properties for dynamic grid
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rowSizes = getRowSizes();
    const colSizes = getColSizes();

    container.style.setProperty("grid-template-rows", rowSizes);
    container.style.setProperty("grid-template-columns", colSizes);
  }, [hovered]);

  const getRowSizes = () => {
    if (hovered === null) return "1fr 1fr 1fr";
    const { row } = hovered;
    const hoverSize = 6;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2]
      .map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  const getColSizes = () => {
    if (hovered === null) return "1fr 1fr 1fr";
    const { col } = hovered;
    const hoverSize = 6;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2]
      .map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(" ");
  };

  const handleMouseEnter = useCallback((row: number, col: number) => {
    setHovered({ row, col });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid h-full w-full gap-1 transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{
        contain: "layout style", // Performance optimization
      }}
    >
      {frames.map((frame, index) => {
        const row = Math.floor(frame.defaultPos.y / 4);
        const col = Math.floor(frame.defaultPos.x / 4);
        const isHovered = hovered?.row === row && hovered?.col === col;

        return (
          <div
            key={frame.id}
            className={`relative overflow-hidden transition-transform duration-300 ease-out ${
              isHovered
                ? "z-20 scale-105"
                : "scale-100 hover:z-10 hover:scale-[1.02]"
            }`}
            style={{
              transformOrigin: getTransformOrigin(
                frame.defaultPos.x,
                frame.defaultPos.y,
              ),
              animationDelay: `${index * 50}ms`,
              transform: "translateZ(0)", // GPU acceleration
            }}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseLeave={handleMouseLeave}
          >
            <VideoFrame
              video={frame.video}
              className="h-full w-full"
              isHovered={isHovered}
            />
          </div>
        );
      })}
    </div>
  );
}

function getTransformOrigin(x: number, y: number): string {
  const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom";
  const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right";
  return `${horizontal} ${vertical}`;
}
