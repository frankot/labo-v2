import React, { useState, useEffect, useRef } from "react";
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
  isHovered = false,
  caseStudy,
  cardState = "normal",
}: VideoFrameProps) {
  const { videoRef } = useVideoPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if this is a placeholder item
  const isPlaceholder =
    !video ||
    video === "" ||
    video === undefined ||
    caseStudy?.id?.startsWith("placeholder-");

  // Safety checks to ensure video is valid
  const isValidVideoUrl = Boolean(
    video && typeof video === "string" && video.startsWith("http"),
  );

  // Use the slug directly from CMS data
  const getRealizacjaSlug = (caseStudy: Realizacja): string => {
    return caseStudy.slug || caseStudy.id;
  };

  // Lazy load: only set video src when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isPlaceholder || !isValidVideoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPlaceholder, isValidVideoUrl]);

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

  // Autoplay videos once src is set (isInView)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaceholder || !isValidVideoUrl || !isInView) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadedmetadata", playVideo, { once: true });
    }
  }, [videoRef, isPlaceholder, isValidVideoUrl, isInView]);

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
    <>
      {!isPlaceholder ? (
        <Link
          href={`/realizacje/${getRealizacjaSlug(caseStudy!)}`}
          className="block h-full w-full"
        >
          <div
            ref={containerRef}
            className={`relative h-full w-full overflow-hidden rounded-lg border-6 border-black ${className} cursor-pointer`}
          >
            <div
              className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={getVideoStyles()}
            >
              {!isValidVideoUrl ? (
                // Placeholder content for missing data
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <div className="p-6 text-center">
                    <div className="mb-4 text-4xl text-gray-400">📄</div>
                    <h3 className="font-michroma mb-2 text-sm font-medium text-gray-600">
                      Data Missing
                    </h3>
                    <p className="font-michroma max-w-[200px] text-xs text-gray-500">
                      {caseStudy?.client
                        ? `Video missing for ${caseStudy.client}`
                        : "Add more content in Hygraph CMS to fill this position"}
                    </p>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={isInView ? video : undefined}
                  loop
                  muted
                  playsInline
                  autoPlay={false}
                  preload={isInView ? "metadata" : "none"}
                  controls={false}
                  disablePictureInPicture
                >
                  <track kind="captions" />
                </video>
              )}

              {/* Company name overlay - shown when video is not playing */}
              {caseStudy && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <h2 className="font-michroma text-lg font-medium tracking-wide text-white uppercase">
                    {caseStudy.client}
                  </h2>
                </div>
              )}
            </div>

            {/* Title badge using Card component */}
            {caseStudy && (
              <div
                className={`absolute right-0 bottom-3 left-0 mx-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <Card className="pointer-events-none p-3 backdrop-blur-2xl">
                  <div className="flex items-center justify-center">
                    <h3 className="font-michroma text-center text-xs font-medium text-white">
                      {caseStudy.title}
                    </h3>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="block h-full w-full">
          <div
            className={`relative h-full w-full overflow-hidden rounded-lg border-6 border-black ${className}`}
          >
            <div
              className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={getVideoStyles()}
            >
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <div className="p-6 text-center">
                  <div className="mb-4 text-4xl text-gray-400">📄</div>
                  <h3 className="font-michroma mb-2 text-sm font-medium text-gray-600">
                    {caseStudy?.title || "Data Missing"}
                  </h3>
                  <p className="font-michroma max-w-[200px] text-xs text-gray-500">
                    {caseStudy?.client
                      ? `Video missing for ${caseStudy.client}`
                      : "Add more content in Hygraph CMS to fill this position"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
