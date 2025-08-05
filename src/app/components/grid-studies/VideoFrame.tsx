"use client";

import React, { useState, useEffect } from "react";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { CaseStudy } from "../../../lib/realizacje-data";
import Card from "../ui/card";

interface VideoFrameProps {
  video: string;
  className?: string;
  isMobile?: boolean;
  isHovered?: boolean;
  caseStudy?: CaseStudy;
  cardState?:
    | "normal"
    | "hovered"
    | "adjacent"
    | "diagonal"
    | "same-line"
    | "distant";
}

export function VideoFrame({
  video,
  className = "",
  isMobile = false,
  isHovered = false,
  caseStudy,
  cardState = "normal",
}: VideoFrameProps) {
  const { videoRef, play, pause } = useVideoPlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  // Track video playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef]);

  // Handle play/pause for both desktop and mobile
  React.useEffect(() => {
    if (!isMobile) {
      // Desktop: hover to play, but keep playing when pointer leaves
      if (isHovered) {
        play();
      }
      // Note: no pause() when leaving hover - video continues playing
    } else {
      // Mobile: only play when clicked/expanded, don't stop others
      if (isHovered) {
        play();
      }
    }
  }, [isHovered, isMobile, play, pause]);

  // Get video transform and filter based on card state - no darkening overlays
  const getVideoStyles = () => {
    switch (cardState) {
      case "hovered":
        return {
          transform: "scale(1.1)",
        };
      case "adjacent":
        return {
          transform: "scale(1.02)",
        };
      case "diagonal":
        return {
          transform: "scale(1.01)",
        };
      case "same-line":
        return {
          transform: "scale(1.01)",
        };
      case "distant":
        return {
          transform: "scale(1)",
        };
      default:
        return {
          transform: "scale(1)",
        };
    }
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-lg border-6 border-black ${className}`}
    >
      <div
        className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={getVideoStyles()}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={video}
          loop
          muted
          playsInline
          autoPlay={false}
          preload="metadata"
          controls={false}
          disablePictureInPicture
        />

        {/* Company name overlay - shown when video is not playing */}
        {caseStudy && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <h2 className="font-michroma text-lg font-medium tracking-wide text-white uppercase">
              {caseStudy.company}
            </h2>
          </div>
        )}
      </div>

      {/* Company and year badge using Card component */}
      {caseStudy && (
        <div
          className={`absolute right-0 bottom-3 left-0 mx-4 w-1/3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <Card className="p-3 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-michroma truncate text-xs font-medium text-white">
                  {caseStudy.company}
                </h3>
                <p className="font-michroma text-[10px] tracking-wide text-white/60">
                  {caseStudy.date}
                </p>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className="font-michroma text-xs text-white/70 transition-all duration-300 hover:translate-x-0.5 hover:text-white">
                  →
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
