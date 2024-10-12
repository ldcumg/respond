"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpotifyTrack } from "@/types/playlist/Spotify";
// import { supabase } from "@/utils/supabase/client";
import { createClient } from "@supabase/supabase-js";
import PlaylistSearch from "./PlaylistSearch";
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const browserClient = createClient(supabaseUrl, supabaseKey);

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
      const { data, error } = await browserClient.from("playlist").insert({
        track_id: track.id,
        track_name: track.name,
        artist_name: track.artists[0].name
        // album_image: track.album.images[0]?.url
      });
      if (error) console.error("Error adding item:", error);
      else console.log("track added", data);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  //검색어 따른 필터링리스트
  const filterPlaylist = playlist.filter((list) => list.track.name.toLowerCase().includes(search.toLowerCase()));

  //팝업창 닫기이벤트
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <div className="borderline absolute left-1/2 top-1/2 flex h-[600px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[5px] overflow-scroll">
      <button onClick={handleCloseModal} className="absolute right-[15px] top-[10px]">
        닫기
      </button>
      <PlaylistSearch setSearch={setSearch} />
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
  );
};

export default PlaylistAll;
