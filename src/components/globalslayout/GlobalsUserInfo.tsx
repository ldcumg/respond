"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";

const GlobalsUserInfo = () => {
  const setAllUserInfo = useAllUsersStore((state) => state.setAllUsers);

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUserInfo(data));
    })();
  }, []);

  return (
    <div>
      <Player />
    </div>
  );
};

export default GlobalsUserInfo;
