"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import Follow from "../home/Follow";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";

const GlobalsUserInfo = () => {
  const { setAllUsers } = useAllUsersStore((state) => state);

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUsers(data));
    })();
  }, []);

  return (
    <div>
      <Player />
      <Follow />
    </div>
  );
};

export default GlobalsUserInfo;
