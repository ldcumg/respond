"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpotifyTrack } from "@/types/playlist/Spotify";
import browserClient from "@/utils/supabase/client";
import PlaylistSearch from "./PlaylistSearch";

type SpotifyListProps = {
  track: SpotifyTrack;
};
type PlaylistAllProps = {
  playlist: SpotifyListProps[];
  setIsShowModal: (value: boolean) => void;
};

const PlaylistAll = ({ playlist, setIsShowModal }: PlaylistAllProps) => {
  // console.log("playlist", playlist);
  const [search, setSearch] = useState<string>("");
  // console.log("search", search);
  const handleAddPlayList = async (track: SpotifyTrack) => {
    try {
      // 현재 로그인된 사용자 user_id
      const { data: user } = await browserClient.auth.getUser();
      if (!user) {
        console.error("로그인한 유저가 없습니다.");
        return;
      }
      console.log("user", user);
      console.log("user.id", user.user.id);
      const { data, error } = await browserClient.from("playlist").insert({
        track_id: track.id,
        track_name: track.name,
        artist_name: track.artists[0].name,
        user_id: user.user.id,
        album_image: track.album.images[0]?.url
      });
      if (error) console.error("추가중 오류 발생:", error);
      else console.log("트랙 추가", data);
    } catch (error) {
      console.error("그 외 에러:", error);
    }
  };

  //검색어 따른 필터링리스트(제목,가수이름)
  const filterPlaylist = playlist.filter(
    (list) =>
      list.track.name.toLowerCase().includes(search.toLowerCase()) ||
      list.track.artists[0].name.toLowerCase().includes(search.toLowerCase())
  );

  //팝업창 닫기이벤트
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <div className="relative">
      <div className="borderline fixed left-1/2 top-1/2 flex h-[600px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[5px] overflow-scroll !pt-0">
        <div className="sticky top-[0px] flex flex-col items-end bg-[#fff] pt-[20px]">
          <button onClick={handleCloseModal} className="">
            닫기icon
          </button>
          <PlaylistSearch setSearch={setSearch} />
        </div>
        <div className="flex flex-col gap-[10px] border-[1px] border-[#DBDBDB] bg-[#FAFAFA] p-[20px]">
          {filterPlaylist.length === 0 ? (
            <span className="text-[13px] text-[#5C5C5C]">{`"${search}"에 대한 노래를 찾을 수 없습니다.`}</span>
          ) : (
            (search ? filterPlaylist : playlist).map((list: SpotifyListProps) => (
              <div key={list.track.id} className="flex">
                <Image src={list.track.album.images[0].url} alt={list.track.name} width="100" height="100" />
                <div className="flex-1">
                  <div>{list.track.name}</div>
                  <div>{list.track.artists[0].name}</div>
                  <button className="btn" onClick={() => handleAddPlayList(list.track)}>
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistAll;
