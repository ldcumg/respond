"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";
import PlayTrackPreview from "./PlayTrackPreview";
import { useQuery } from "@tanstack/react-query";

export type SpotifyMainTrack = {
  track_id: string;
  track_name: string;
  album_image: string;
  artist_name: string;
};

const Player = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const [accessToken, setAccessToken] = useState("");
  const [playState, setPlayState] = useState(false); //재생상태

  //스포티파이 재생 토큰
  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId ?? "",
            client_secret: clientSecret ?? ""
          })
        });

        if (!tokenRes.ok) {
          throw new Error("토큰 가져오기 실패");
        }

        const { access_token } = await tokenRes.json(); // 토큰 추출해서access_token 변수애 저장
        // console.log("access_token", access_token);

        setAccessToken(access_token);
      } catch (error) {
        throw error;
      }
    };
    fetchSpotifyData();
  }, [clientId, clientSecret]);

  //메인지정 mutation 함수
  const fetchMainPlay = async () => {
    const { data: loginUserId } = await browserClient.auth.getUser();
    const userId = loginUserId?.user?.id;
    const { data: mainPlay, error } = await browserClient
      .from("playlist")
      .select("*")
      .eq("user_id", userId)
      .eq("is_main", true);
    return mainPlay;
  };

  const {
    data: myMainPlay,
    isLoading: myMainPlayIsLoding,
    error: myMainPlayIsError
  } = useQuery({
    queryKey: ["myMainPlay", clientId, clientSecret],
    queryFn: fetchMainPlay
  });

  if (myMainPlayIsError) return <div>데이터 가져오기 오류...</div>;
  if (myMainPlayIsLoding) return <div>Loading...</div>;

  return (
    <div>
      {myMainPlay && myMainPlay.length > 0 ? (
        <div className="flex flex-col items-center gap-[10px]">
          <div
            className={`relative rounded-full bg-center bg-no-repeat ${playState ? "play" : "pause"}`}
            style={{ backgroundSize: "65%", backgroundImage: `url(${myMainPlay[0].album_image})` }}>
            <Image src="/images/recordImg.png" alt="record" width={500} height={500} objectFit="cover" />
          </div>
          <div className="mx-h-[80px] mt-[8px] h-full text-center text-[33px] font-[900] leading-[1.1]">
            {myMainPlay[0].track_name}
          </div>
          <div className="text-center text-[18px] font-[400] leading-[1.1] text-[#787878]">
            - {myMainPlay[0].artist_name}
          </div>
          <PlayTrackPreview
            trackId={myMainPlay[0].track_id}
            accessToken={accessToken}
            setPlayState={setPlayState}
            playState={playState}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[10px]">
          <div className={`relative rounded-full bg-[#F4F4F4] bg-center bg-no-repeat`}>
            <Image src="/images/recordImg.png" alt="record" width={500} height={500} objectFit="cover" />
          </div>
          <div className="mx-h-[80px] mt-[8px] h-full text-center text-[22px] font-[400] leading-[1.1]">
            BGM을 선택해주세요
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
