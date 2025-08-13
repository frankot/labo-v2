import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { Realizacja } from "../../../lib/realizacje-data";
import Card from "../ui/card";

interface VideoFrameProps {
  video: string;
  className?: string;
  isMobile?: boolean;
  isHovered?: boolean;
  caseStudy?: Realizacja;
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
  
  // Check if this is a placeholder item
  const isPlaceholder = !video || video === "" || video === undefined || caseStudy?.id?.startsWith('placeholder-');
  
  // Log video URL for debugging
  console.log(`VideoFrame for ${caseStudy?.client || 'unknown'}: video URL = ${video || 'MISSING'}`);
  
  // Safety checks to ensure video is valid
  const isValidVideoUrl = Boolean(video && typeof video === 'string' && video.startsWith('http'));

  // Function to map case study client to realizacja ID (now just use the ID directly)
  const getRealizacjaId = (client: string, id: string): string => {
    // Direct mapping or fallback to ID
    const clientMapping: { [key: string]: string } = {
      "CORAB S.A.": "corab-intersolar-2024",
      "Klient prywatny": "dom-konstancin",
      "TechCorp Sp. z o.o.": "biuro-srodmiescie",
      // Add more mappings as needed
    };
    return clientMapping[client] || id;
  };

  // Track video playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaceholder) return;

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
  }, [videoRef, isPlaceholder]);

  // Handle play/pause for both desktop and mobile
  React.useEffect(() => {
    if (isPlaceholder) return;
    
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
  }, [isHovered, isMobile, play, pause, isPlaceholder]);

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
        {isPlaceholder || !isValidVideoUrl ? (
          // Placeholder content for missing data
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div className="text-center p-6">
              <div className="mb-4 text-4xl text-gray-400">📄</div>
              <h3 className="font-michroma text-sm font-medium text-gray-600 mb-2">
                Data Missing
              </h3>
              <p className="font-michroma text-xs text-gray-500 max-w-[200px]">
                {caseStudy?.client ? 
                  `Video missing for ${caseStudy.client}` : 
                  'Add more content in Hygraph CMS to fill this position'}
              </p>
            </div>
          </div>
        ) : (
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
        )}

        {/* Company name overlay - shown when video is not playing or for placeholders */}
        {caseStudy && !isPlaceholder && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <h2 className="font-michroma text-lg font-medium tracking-wide text-white uppercase">
              {caseStudy.client}
            </h2>
          </div>
        )}
      </div>

      {/* Company and year badge using Card component - only for real content */}
      {caseStudy && !isPlaceholder && (
        <div
          className={`absolute right-0 bottom-3 left-0 mx-4 w-1/3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <Link href={`/realizacje/${getRealizacjaId(caseStudy.client, caseStudy.id)}`}>
            <Card className="cursor-pointer p-3 backdrop-blur-2xl transition-colors hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-michroma truncate text-xs font-medium text-white">
                    {caseStudy.client}
                  </h3>
                  <p className="font-michroma text-[10px] tracking-wide text-white/60">
                    {caseStudy.year}
                  </p>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <span className="font-michroma text-xs text-white/70 transition-all duration-300 hover:translate-x-0.5 hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
