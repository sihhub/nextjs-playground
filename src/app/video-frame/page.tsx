"use client";

import { useEffect, useState, useRef } from "react";
import useVideoFrame from "./useVideoFrame";
import axios from "axios";

export default function VideoFrame() {
  const { ref: videoRef } = useVideoFrame();

  useEffect(() => {
    const letrApi = axios.create({
      baseURL: process.env.NEXT_PUBLIC_LETR_API_URL,
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_LETR_API_KEY,
      },
    });

    letrApi
      .post("/video-fps", {
        translation_id: "c45800c4-5c72-44ee-b0f5-a44948b460e9",
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <video
      src={process.env.NEXT_PUBLIC_VIDEO_URL}
      autoPlay={false}
      ref={videoRef}
      onMouseOver={(e) => {
        e.currentTarget.controls = true;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.controls = false;
      }}
    />
  );
}
