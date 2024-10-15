"use client";

import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

type PreviewProps = {
  accessToken: string;
  trackId: string;
  playState: boolean;
  setPlayState: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayTrackPreview = ({ accessToken, trackId, playState, setPlayState }: PreviewProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.1); // 초기 볼륨

  const handlePlayPreview = async () => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await res.json();
      console.log("data", data);
      const previewUrl = data.preview_url;
      console.log("previewUrl", previewUrl);
      if (previewUrl) {
        // 기존 오디오 정지 및 새 오디오 설정
        if (audio) {
          audio.pause();
        }
        const newAudio = new Audio(previewUrl);
        newAudio.loop = true;
        newAudio.volume = volume; // 초기 볼륨 설정
        newAudio.play();

        if (playState) {
          newAudio.pause();
        } else {
          newAudio.play();
        }
        setAudio(newAudio); // 오디오 객체를 상태에 저장
        setPlayState((prev) => !prev);
      } else {
        alert("미리보기 URL을 사용할 수 없습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div>
      <button
        className={`flex h-[50px] w-[50px] transform items-center justify-center rounded-full border-[4px] border-black text-[14px]`}
        onClick={handlePlayPreview}>
        {playState ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

export default PlayTrackPreview;
