"use client";

import { useResponsive } from "./hooks/useResponsive";
import { DesktopGrid } from "./DesktopGrid";
import { MobileGrid } from "./MobileGrid";

interface Frame {
  id: number;
  video: string;
  defaultPos: { x: number; y: number };
}

const frames: Frame[] = [
  {
    id: 1,
    video:
      "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 2,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0 },
  },
  {
    id: 3,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0 },
  },
  {
    id: 4,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4 },
  },
  {
    id: 5,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4 },
  },
  {
    id: 6,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4 },
  },
  {
    id: 7,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8 },
  },
  {
    id: 8,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8 },
  },
  {
    id: 9,
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8 },
  },
];

export default function OptimizedFrameLayout() {
  const { isMobile } = useResponsive();

  return (
    <div className="h-full w-full">
      {isMobile ? (
        <MobileGrid frames={frames} />
      ) : (
        <DesktopGrid frames={frames} />
      )}
    </div>
  );
}
