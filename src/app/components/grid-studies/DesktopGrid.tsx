"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { VideoFrame } from "./VideoFrame";
import { type CaseStudy } from "../../../lib/realizacje-data";

interface DesktopGridProps {
  caseStudies: CaseStudy[];
}

export function DesktopGrid({ caseStudies }: DesktopGridProps) {
  const [hovered, setHovered] = useState<{
    row: number;
    col: number;
    index: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple visibility on mount and set first video as hovered
  useEffect(() => {
    setIsVisible(true);
    // Set first video (index 0) as hovered by default
    if (caseStudies.length > 0) {
      const firstCase = caseStudies[0];
      const row = Math.floor(firstCase.defaultPos.y / 4);
      const col = Math.floor(firstCase.defaultPos.x / 4);
      setHovered({ row, col, index: 0 });
    }
  }, [caseStudies]);

  // Update CSS custom properties for dynamic grid with organic hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rowSizes = getOrganicRowSizes();

    container.style.setProperty("grid-template-rows", rowSizes);
    container.style.setProperty("grid-template-columns", "1fr 1fr 1fr");
  }, [hovered]);

  const getOrganicRowSizes = () => {
    if (hovered === null) return "1fr 1fr 1fr";

    const { row } = hovered;
    const containerWidth = containerRef.current?.clientWidth || 800;
    const cardWidth = containerWidth / 3; // 3 columns

    // Calculate height needed for 16:9 ratio
    const targetHeight = (cardWidth * 9) / 16;

    // Base row height when no hover
    const baseRowHeight = containerRef.current?.clientHeight
      ? containerRef.current.clientHeight / 3
      : 200;

    // Scale factor for hovered row (how much bigger than base) - enhanced for more dramatic effect
    const hoverScale = Math.max(1, targetHeight / baseRowHeight);

    // Compressed scale for non-hovered rows - squish harder
    const compressScale = 0.6;

    return [0, 1, 2]
      .map((r) => {
        if (r === row) {
          return `${hoverScale}fr`;
        } else {
          return `${compressScale}fr`;
        }
      })
      .join(" ");
  };

  const handleMouseEnter = useCallback(
    (row: number, col: number, index: number) => {
      setHovered({ row, col, index });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  // Calculate neighbor relationships for organic reactions
  const getCardState = (index: number, row: number, col: number) => {
    if (!hovered) return "normal";

    const { row: hoveredRow, col: hoveredCol, index: hoveredIndex } = hovered;

    if (hoveredIndex === index) return "hovered";

    // Check if it's a direct neighbor (adjacent in row or column)
    const isRowNeighbor =
      row === hoveredRow && Math.abs(col - hoveredCol) === 1;
    const isColNeighbor =
      col === hoveredCol && Math.abs(row - hoveredRow) === 1;
    const isDiagonalNeighbor =
      Math.abs(row - hoveredRow) === 1 && Math.abs(col - hoveredCol) === 1;

    if (isRowNeighbor || isColNeighbor) return "adjacent";
    if (isDiagonalNeighbor) return "diagonal";
    if (row === hoveredRow || col === hoveredCol) return "same-line";

    return "distant";
  };

  return (
    <div
      ref={containerRef}
      className={`grid h-full w-full gap-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{
        contain: "layout style", // Performance optimization
      }}
    >
      {caseStudies.map((caseStudy, index) => {
        const row = Math.floor(caseStudy.defaultPos.y / 4);
        const col = Math.floor(caseStudy.defaultPos.x / 4);
        const cardState = getCardState(index, row, col);
        const isHovered = cardState === "hovered";

        // Calculate transform based on card state - preserve 16:9 aspect ratio for video cards
        const getCardTransform = () => {
          switch (cardState) {
            case "hovered":
              // Scale more horizontally to maintain 16:9 aspect ratio
              return "scaleX(1.12) scaleY(1.02) translateZ(0)";
            case "adjacent":
              return "scale(0.88) translateZ(0)";
            case "diagonal":
              return "scale(0.92) translateZ(0)";
            case "same-line":
              return "scale(0.94) translateZ(0)";
            case "distant":
              return "scale(0.96) translateZ(0)";
            default:
              return "scale(1) translateZ(0)";
          }
        };

        const getCardOpacity = () => {
          switch (cardState) {
            case "hovered":
              return 1;
            case "adjacent":
              return 0.85;
            case "diagonal":
              return 0.9;
            case "same-line":
              return 0.92;
            case "distant":
              return 0.95;
            default:
              return 1;
          }
        };

        return (
          <div
            key={caseStudy.id}
            className={`relative cursor-pointer overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isHovered ? "z-20" : cardState === "adjacent" ? "z-5" : "z-10"
            }`}
            style={{
              transformOrigin: getTransformOrigin(
                caseStudy.defaultPos.x,
                caseStudy.defaultPos.y,
              ),
              animationDelay: `${index * 50}ms`,
              transform: getCardTransform(),
              opacity: getCardOpacity(),
            }}
            onMouseEnter={() => handleMouseEnter(row, col, index)}
            onMouseLeave={handleMouseLeave}
          >
            <VideoFrame
              video={caseStudy.video}
              className="h-full w-full"
              isHovered={isHovered}
              caseStudy={caseStudy}
              cardState={cardState}
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
