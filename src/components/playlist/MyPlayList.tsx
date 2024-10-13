"use client";

// import React, { useEffect, useState } from "react";
import { SpotifyTrack } from "@/types/playlist/Spotify";
import browserClient from "@/utils/supabase/client";
import React, { useState } from "react";

type SpotifyListProps = {
  track: SpotifyTrack;
  track_id: string;
  track_name: string;
  album_image: string;
  artist_name: string;
};
type MyPlaylistAllProps = {
  myPlayList: SpotifyListProps[];
  isShowEdit: boolean;
  setIsMainPlay: React.Dispatch<React.SetStateAction<boolean>>;
  isMainPlay: boolean;
};

const MyPlayList = ({ myPlayList, isShowEdit, setIsMainPlay, isMainPlay }: MyPlaylistAllProps) => {
  const [mainTrackId, setMainTrackId] = useState<string | null>(null);
  const [mainTrack, setMainTrack] = useState({});

  /** 삭제이벤트 */
  const handleDeletePlayList = async (trackId: string) => {
    try {
      const { data: loginUserId } = await browserClient.auth.getUser();
      const userId = loginUserId?.user?.id;

      //로그인한 유저의 플레이리스트에서 선택한 플리만 삭제
      const { data, error } = await browserClient
        .from("playlist")
        .delete()
        .eq("track_id", trackId)
        .eq("user_id", userId);
      if (error) console.error("삭제중 오류 발생:", error);
      else {
        console.log("트랙 삭제", data);
        alert("트랙 삭제 완료"); //토스트로 추후 변경
      }
    } catch (error) {
      console.error("그 외 에러:", error);
    }
  };

  /** 메인노래 지정 이벤트 */
  const handleMainPlay = async (trackId: string) => {
    try {
      const { data: loginUserId } = await browserClient.auth.getUser();
      const userId = loginUserId?.user?.id;
      //메인지정한 트랙 업데이트 - 지정한거 true / 그외 false
      const updatedTracks = myPlayList.map((track) =>
        track.id === trackId ? { ...track, is_main: true } : { ...track, is_main: false }
      );
      //로그인한 유저의 플레이리스트에서 선택한 플리만 삭제
      const { data, error } = await browserClient
        .from("playlist")
        .update({ is_main: isMainPlay })
        .eq("track_id", trackId)
        .eq("user_id", userId);
      if (error) console.error("메인지정중 오류 발생:", error);
      else {
        console.log("메인 지정", data);
        alert("메인 지정 완료"); //토스트로 추후 변경
        setIsMainPlay(true);
        setMainTrackId(trackId);
        setMainTrack(updatedTracks);
      }
    } catch (error) {
      console.error("그 외 에러:", error);
    }
  };

  //   console.log("myPlayList", myPlayList);
  return (
    <div>
      {myPlayList.length > 0 ? (
        <div className="mt-[40px] grid grid-cols-3 gap-4">
          {myPlayList.map((list) => (
            <div key={list.track_id} className="flex cursor-pointer flex-col items-center gap-[5px]">
              <img src={list.album_image} alt={list.track_name} className="border-[4px] border-black" />
              <h2 className="mx-h-[40px] mt-[8px] line-clamp-2 h-full text-[18px] font-[900] leading-[1.1]">
                {list.track_name}
              </h2>
              <p>{list.artist_name}</p>
              {isShowEdit && (
                <div className="flex gap-[5px]">
                  {mainTrackId === list.track_id && isMainPlay ? (
                    <button className="btn !bg-black !text-white" onClick={() => handleMainPlay(list.track_id)}>
                      메인노래
                    </button>
                  ) : (
                    <button
                      className="btn border-[2px] border-black !bg-white !text-black"
                      onClick={() => handleMainPlay(list.track_id)}>
                      지정
                    </button>
                  )}

                  <button className="btn" onClick={() => handleDeletePlayList(list.track_id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>나만의 플레이리스트를 추가해보세요.</p>
      )}
    </div>
  );
};

export default MyPlayList;
