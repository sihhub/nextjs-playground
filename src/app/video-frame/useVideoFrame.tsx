"use client";

import { useEffect, useRef, useState } from "react";
import { getBrowserInfo } from "./utils";

declare global {
  interface HTMLVideoElement {
    captureStream(): MediaStream;
  }
}

export default function useVideoFrame() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const info = getBrowserInfo();
    const video = videoRef.current;

    if (video) {
      const handlePlay = () => {
        console.log("play");
        const stream = video.captureStream();
        const [track] = stream.getVideoTracks();
        const settings = track.getSettings();
        console.log("FPS (MediaStream API):", settings.frameRate);

        console.log(
          "총 프레임 수 (예측):",
          Math.round(video.duration * (settings?.frameRate ?? 30))
        );
      };
      video.addEventListener("play", handlePlay);

      return () => {
        video.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  return {
    ref: videoRef,
  };
}
