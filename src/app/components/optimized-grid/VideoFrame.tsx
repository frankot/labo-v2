"use client";

import React from "react";
import { useVideoPlayer } from "./hooks/useVideoPlayer";

interface VideoFrameProps {
  video: string;
  className?: string;
  isMobile?: boolean;
  isHovered?: boolean;
}

export function VideoFrame({
  video,
  className = "",
  isMobile = false,
  isHovered = false,
}: VideoFrameProps) {
  const { videoRef, play, pause } = useVideoPlayer();

  // Handle desktop hover play/pause
  React.useEffect(() => {
    if (!isMobile) {
      if (isHovered) {
        play();
      } else {
        pause();
      }
    }
  }, [isHovered, isMobile, play, pause]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video}
        loop
        muted
        playsInline
        autoPlay={isMobile}
        controls={false}
        disablePictureInPicture
      />
    </div>
  );
}
