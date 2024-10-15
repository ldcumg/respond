"use client";
// import { useState, useEffect } from "react";
import { SpotifyTrack } from "@/types/playlist/Spotify";
import browserClient from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SpotifyListProps = {
  track: SpotifyTrack;
  track_id: string;
  track_name: string;
  album_image: string;
  artist_name: string;
  is_main: boolean;
};
type MyPlaylistAllProps = {
  myPlayList: SpotifyListProps[];
  setMyPlayList: SpotifyListProps[];
  isShowEdit: boolean;
  myPlayListData: SpotifyListProps[];
};
//1.삭제뮤테이션 재료 : 서버 지정아이디 삭제함수
const deleteTrackPlayList = async (trackId: string) => {
  const { data: loginUserId } = await browserClient.auth.getUser();
  const userId = loginUserId?.user?.id;

  //로그인한 유저의 플레이리스트에서 선택한 플리만 삭제
  const { data, error } = await browserClient.from("playlist").delete().eq("track_id", trackId).eq("user_id", userId);
  if (error) console.error("삭제중 오류 발생:", error);
  else console.log("트랙 삭제", data);
};

//1.업데이트뮤테이션 재료 : 서버상태 업데이트 함수
const upDateMainTrack = async (trackId: string) => {
  const { data: loginUserId } = await browserClient.auth.getUser();
  const userId = loginUserId?.user?.id;

  const { error: resetError } = await browserClient.from("playlist").update({ is_main: false }).eq("user_id", userId);

  if (resetError) {
    console.error("메인지정중 리셋과정에서 오류 발생:", resetError);
    return;
  }

  const { data, error: updateError } = await browserClient
    .from("playlist")
    .update({ is_main: true })
    .eq("track_id", trackId)
    .eq("user_id", userId);

  if (updateError) {
    console.error("메인지정중 오류 발생:", updateError);
  }
};
// myPlayList, setMyPlayList,
const MyPlayList = ({ myPlayListData, isShowEdit }: MyPlaylistAllProps) => {
  const queryClient = useQueryClient();

  /** 삭제이벤트 */
  //2.삭제뮤테이션
  const deletePlayListmutation = useMutation({
    mutationFn: deleteTrackPlayList,
    onSuccess: () => {
      if (window.confirm("내 플레이리스트에서 삭제하시겠습니까?")) {
        queryClient.invalidateQueries(["myPlayList"]);
      }
    },
    onError: (error: Error) => {
      console.log("error.message", error.message);
    }
  });

  //3.삭제뮤테이션 실행
  const handleDeletePlayList = async (trackId: string) => {
    deletePlayListmutation.mutate(trackId);
  };

  /** 메인노래 지정 이벤트 */
  //2.업뎃뮤테이션
  const updateMainmutation = useMutation({
    mutationFn: upDateMainTrack, //mutationFn : upDateMainTrack함수 실행
    onSuccess: (trackId: string) => {
      const updatedTracks = myPlayListData.map((track) =>
        track.track_id === trackId ? { ...track, is_main: true } : { ...track, is_main: false }
      );
      queryClient.invalidateQueries(["myPlayList"]);
      queryClient.invalidateQueries(["myMainPlay"]);
    }
  });

  //2.업뎃뮤테이션 실행
  const handleMainPlay = async (trackId: string) => {
    updateMainmutation.mutate(trackId);
  };
  console.log("myPlayListData", myPlayListData);
  return (
    <div>
      {myPlayListData.length > 0 ? (
        <div className="mt-[40px] grid grid-cols-3 gap-4">
          {myPlayListData.map((list) => (
            <div key={list.track_id} className="flex cursor-pointer flex-col items-center gap-[5px]">
              <img src={list.album_image} alt={list.track_name} className="border-[4px] border-black" />
              <h2 className="mx-h-[40px] mt-[8px] line-clamp-2 h-full text-[18px] font-[900] leading-[1.1]">
                {list.track_name}
              </h2>
              <p>{list.artist_name}</p>
              {isShowEdit && (
                <div className="flex gap-[5px]">
                  {list.is_main === true ? (
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
