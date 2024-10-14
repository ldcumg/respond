import { getPlaylist } from "@/app/setting/server-action/playlistAction";
import queryKey from "@/queries/queryKey";
import { useAuthStore } from "@/store/useUserInfoStore";
import { PlayList } from "@/types/playlist/playlist";
import browserClient from "@/utils/supabase/client";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const hostUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
// const attendeeUserId = "방문자 userid";

const PlaylistPrev = () => {
  const { data: userId } = useQuery<string | undefined>({
    queryKey: queryKey.auth.loginUser,
    queryFn: () => getLoginUserId()
  });
  // const { isLoggedIn } = useAuthStore();
  const auth = useAuthStore();

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
