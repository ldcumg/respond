"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import FollowComponent from "../home/FollowComponent";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";
import ThemeBtn from "../theme/ThemeBtn";
import { useParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

const GlobalsUserInfo = () => {
  const { setAllUsers } = useAllUsersStore((state) => state);

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUsers(data));
    })();
  }, []);
  return (
    <div className="flex h-full flex-col justify-between">
      <Player />
      <FollowComponent />
      <div className="flex flex-col gap-[40px] px-[20px]">
        <div>
          <h2 className="mb-[10px] text-[25px] font-bold">사용자이름</h2>
          <p className="text-[16px]">email@email.com</p>
        </div>
        <div className="flex justify-between gap-[10px] pb-[50px]">
          <ThemeBtn /> {/* <- 내 정보수정 컴포넌트로 바꿔주세요 */}
          <ThemeBtn />
        </div>
      </div>
    </div>
  );
};

export default GlobalsUserInfo;
