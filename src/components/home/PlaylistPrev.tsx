import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import { getPlaylist } from "@/app/[userId]/setting/server-action/playlistAction";
import queryKey from "@/queries/queryKey";
import { useUserInfoStore } from "@/store/useUserInfoStore";
import { PlayList } from "@/types/playlist/playlist";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import { Circle, CirclePlay } from "lucide-react";

const PlaylistPrev = () => {
  const { hostUserId, loginUserId } = useGetUserIds();

  const { data: playlist } = useQuery<PlayList[]>({
    queryKey: queryKey.playlist(hostUserId),
    queryFn: () => getPlaylist(hostUserId),
    enabled: !!hostUserId
  });

  if (!playlist) {
    return <></>;
  }

  if (playlist.length < 1) {
    return <>아직 추가된 음원이 없습니다.</>;
  }

  return (
    <ul className="flex flex-col gap-[20px]">
      {playlist.map((item) => (
        <li key={item.id} className="li-hover-container flex items-center gap-[100px]">
          <div className="relative w-[150px]">
            <div
              className={`hover-move relative rounded-full bg-center bg-no-repeat`}
              style={{ backgroundSize: "65%", backgroundImage: `url(${item.album_image})` }}>
              <Image src="/images/recordImg.png" alt="record" width={500} height={500} objectFit="cover" />
            </div>
            <img src={item.album_image} alt="" className="absolute inset-0" />
          </div>

          <p className="flex-1 text-[24px]">{item.track_name}</p>
          <p className="text-[20px] text-[#8b8b8b]">{item.artist_name}</p>
          <p>{item.is_main ? <CirclePlay className="w-[24px]" /> : <Circle />}</p>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistPrev;
