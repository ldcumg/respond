"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";

const Player = () => {
  const [mainTrack, setMainTrack] = useState();
  useEffect(() => {
    const fetchPlayList = async () => {
      const { data: loginUserId } = await browserClient.auth.getUser();
      const userId = loginUserId?.user?.id;
      const { data: mainPlay, error } = await browserClient
        .from("playlist")
        .select("*")
        .eq("user_id", userId)
        .eq("is_main", true);
      if (error) console.error("playlist 가져오기 오류:", error.message);
      else {
        // console.log("playlist 데이터:", play);
        setMainTrack(mainPlay);
      }
    };
    fetchPlayList();
  }, []);
  console.log("mainTrack", mainTrack);
  return (
    <div>
      {mainTrack && mainTrack.length > 0 && (
        <div className="flex flex-col items-center gap-[10px]">
          <div
            className="relative rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${mainTrack[0].album_image})` }}>
            <Image src="/images/recordImg.png" alt="record" width={500} height={500} objectFit="cover" />
          </div>
          <div className="mx-h-[80px] mt-[8px] h-full text-center text-[33px] font-[900] leading-[1.1]">
            {mainTrack[0].track_name}
          </div>
          <div className="text-center text-[22px] font-[400] leading-[1.1] text-[#787878]">
            - {mainTrack[0].artist_name}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
