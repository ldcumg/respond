"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpotifyTrack } from "@/types/playlist/Spotify";
// import PlayList from "@/types/playlist/playList";
import browserClient from "@/utils/supabase/client";
import PlaylistSearch from "./PlaylistSearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

type SpotifyListProps = {
  track: SpotifyTrack;
  track_id: string;
};
type PlaylistAllProps = {
  playlist: SpotifyListProps[];
  myPlayList: SpotifyListProps[];
  spotifyList: SpotifyListProps[];
  myPlayListData: SpotifyListProps[];
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type InvalidateQueryFilters = {
  queryKey: string[];
};
/** supabase 플레이리스트 추가 */
//1.뮤테이션 재료만들고
const addTrackPlayList = async (track: SpotifyTrack) => {
  const { data: user, error: authError } = await browserClient.auth.getUser();
  if (authError) {
    console.error("사용자 인증 오류:", authError);
    return;
  }
  if (!user) {
    console.error("로그인한 유저가 없습니다.");
    return;
  }
  const { data, error } = await browserClient.from("playlist").insert({
    track_id: track.id,
    track_name: track.name,
    artist_name: track.artists[0].name,
    user_id: user?.user?.id,
    album_image: track.album.images[0]?.url
  });
  if (error) {
    console.error("추가중 오류 발생:", error);
  }
  return data;
};

const PlaylistAll = ({ spotifyList, playlist, setIsShowModal, myPlayListData }: PlaylistAllProps) => {
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();

  //2.뮤테이션 만들고
  const addPlayListMutation = useMutation({
    mutationFn: addTrackPlayList,
    onSuccess: () => {
      alert("플레이리스트에 추가되었습니다");
      const filtersQueryKey: InvalidateQueryFilters = { queryKey: ["myPlayList"] };
      queryClient.invalidateQueries(filtersQueryKey);
    },
    onError: (error: Error) => {
      console.log("error.message", error.message);
    }
  });

  /** 플레이리스트 추가이벤트 */
  //3.뮤테이션 실행하기
  const handleAddPlayList = async (track: SpotifyTrack) => {
    if (!myPlayListData.some((list) => list.track_id === track.id)) {
      addPlayListMutation.mutate(track);
    } else {
      alert("이미 플레이리스트에 존재하는 트랙입니다.");
    }
  };

  //검색어 따른 필터링리스트(제목,가수이름)
  const filterPlaylist = spotifyList.filter(
    (list: SpotifyListProps) =>
      list.track.name.toLowerCase().includes(search.toLowerCase()) ||
      list.track.artists[0].name.toLowerCase().includes(search.toLowerCase())
  );

  //팝업창 닫기이벤트
  const handleCloseModal = () => {
    setIsShowModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="relative">
      <div className="borderline fixed left-1/2 top-1/2 flex h-[600px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[5px] overflow-scroll !pt-0">
        <div className="sticky top-[0px] flex flex-col items-end bg-[#fff] pt-[20px]">
          <button onClick={handleCloseModal} className="cursor-pointer py-[10px]">
            <X />
          </button>
          <PlaylistSearch setSearch={setSearch} />
        </div>
        <div className="flex flex-col gap-[10px] border-[1px] border-[#DBDBDB] bg-[#FAFAFA] p-[20px]">
          {filterPlaylist.length === 0 ? (
            <span className="text-[13px] text-[#5C5C5C]">{`"${search}"에 대한 노래를 찾을 수 없습니다.`}</span>
          ) : (
            (search ? filterPlaylist : spotifyList).map((list: SpotifyListProps) => (
              <div key={list.track.id} className="flex items-center gap-[10px]">
                <Image src={list.track.album.images[0].url} alt={list.track.name} width="100" height="100" />
                <div className="flex-1">
                  <div>{list.track.name}</div>
                  <div>{list.track.artists[0].name}</div>
                </div>
                <button className="btn h-[40px]" onClick={() => handleAddPlayList(list.track)}>
                  +
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistAll;
