"use client";

import PlaylistAll from "@/components/playlist/PlaylistAll";
import React, { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import MyPlayList from "@/components/playlist/MyPlayList";
import MyPlayListEdit from "@/components/playlist/MyPlayListEdit";
import PlayListModalBtn from "@/components/playlist/PlayListModalBtn";
import { useQuery } from "@tanstack/react-query";
// import { SpotifyTrack } from "@/types/playlist/Spotify";
// type SpotifyListProps = {
//   track: SpotifyTrack;
//   track_id: string;
// };

const Playlist = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const [playList, setPlayList] = useState([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [myPlayList, setMyPlayList] = useState([]);

  const fetchSpotifyData = async () => {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST", //토큰 요청
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId ?? "",
        client_secret: clientSecret ?? ""
      })
    });

    if (!tokenRes.ok) throw new Error("토큰 가져오기 실패");

    const { access_token } = await tokenRes.json(); // 토큰 추출해서access_token 변수애 저장

    // Spotify API에 데이터 요청
    const spotifyRes = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbNxXF4SkHj9F", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!spotifyRes.ok) throw new Error("스포티파이 데이터 패치 실패");
    if (spotifyRes.ok) console.log("스포티파이 데이터 패치 성공");

    const data = await spotifyRes.json();
    return data.tracks.items;
  };

  const fetchPlayList = async () => {
    //Todo:유즈파람스로 갖고온 아이디값을 eq에 넣기
    const { data: loginUserId } = await browserClient.auth.getUser();
    const userId = loginUserId?.user?.id;
    const { data: play, error } = await browserClient.from("playlist").select("*").eq("user_id", userId);
    if (error) console.error("playlist 가져오기 오류:", error.message);
    return play;
  };

  const {
    data: spotifyList,
    isLoading: spotifyIsLoding,
    error: spotifyIsError
  } = useQuery({
    queryKey: ["spotifyData", clientId, clientSecret],
    queryFn: fetchSpotifyData
  });

  const {
    data: myPlayListData,
    isLoading: playListIsLoding,
    error: playListIsError
  } = useQuery({
    queryKey: ["myPlayList", clientId, clientSecret],
    queryFn: fetchPlayList
  });

  if (spotifyIsError || playListIsError) return <div>데이터 가져오기 오류...</div>;
  if (spotifyIsLoding || playListIsLoding) return <div>Loading...</div>;

  return (
    <div className="relative h-full w-full overflow-scroll">
      <div className="item-center sticky top-0 flex justify-between bg-white">
        <h1 className="pageTitle">플레이리스트</h1>
        <div className="flex items-center gap-[10px]">
          <PlayListModalBtn setIsShowModal={setIsShowModal} isShowModal={isShowModal} />
          <MyPlayListEdit setIsShowEdit={setIsShowEdit} isShowEdit={isShowEdit} />
        </div>
      </div>
      {isShowModal && (
        <PlaylistAll
          spotifyList={spotifyList}
          myPlayListData={myPlayListData}
          playlist={playList}
          setIsShowModal={setIsShowModal}
          // myPlayList={myPlayList}
        />
      )}
      <MyPlayList
        myPlayListData={myPlayListData}
        // setMyPlayList={setMyPlayList}
        // myPlayList={myPlayList}
        isShowEdit={isShowEdit}
      />
    </div>
  );
};

export default Playlist;