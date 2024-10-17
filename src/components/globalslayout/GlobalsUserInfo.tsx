"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import FollowComponent from "../home/FollowComponent";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";
import ThemeBtn from "../theme/ThemeBtn";
import { useParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import useOnAuthStateChange from "@/hooks/useOnAuthStateChange";
import ModifyNicknameBtn from "../auth/ModifyNicknameBtn";

const GlobalsUserInfo = () => {
  const { setAllUsers } = useAllUsersStore((state) => state);

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUsers(data));
    })();
  }, []);
  useOnAuthStateChange();

  return (
    <div>
      <Player />
      <FollowComponent />

          <ModifyNicknameBtn />
      <ThemeBtn />
    </div>
  );
};

export default GlobalsUserInfo;
