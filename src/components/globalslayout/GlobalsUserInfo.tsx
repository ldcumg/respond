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
  const { userId } = useParams<{ userId: string }>(); //유저아이디 가져오기
  const loginUser = useGetUserInfo();
  const loginUserId: string = loginUser?.id ?? "";

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
      {loginUserId === userId ? (
        <div>
          <ModifyNicknameBtn />
          <ThemeBtn />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GlobalsUserInfo;
