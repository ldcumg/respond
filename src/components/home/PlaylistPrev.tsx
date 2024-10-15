import { getPlaylist } from "@/app/[userId]/setting/server-action/playlistAction";
import queryKey from "@/queries/queryKey";
import {  useUserInfoStore } from "@/store/useUserInfoStore";
import { PlayList } from "@/types/playlist/playlist";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const hostUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
// const attendeeUserId = "방문자 userid";

const PlaylistPrev = () => {
  // 접속한 유저의 id로 요청하면 안되고, useParams의 id로 요청해얗마
  const { id: userId } = useUserInfoStore();

  const { data: playlist } = useQuery<PlayList[]>({
    queryKey: queryKey.playlist(hostUserId),
    queryFn: () => getPlaylist(hostUserId),
    enabled: !!userId
  });

  if (!playlist) {
    return <></>;
  }

  if (playlist.length < 1) {
    return <>아직 추가된 음원이 없습니다.</>;
  }

  return (
    <ul>
      {playlist.map((item) => (
        <li key={item.id} className="flex">
          <p>{`${item.is_main ? "메인" : "X"}`}</p>
          <div className="w-10">
            <img src={item.album_image} alt="" />
          </div>
          <p>{item.artist_name}</p>
          <p>{item.track_name}</p>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistPrev;
