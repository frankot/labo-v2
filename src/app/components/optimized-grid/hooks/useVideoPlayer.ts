import { useRef } from "react";

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  };

  const pause = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  return {
    videoRef,
    play,
    pause,
  };
}
