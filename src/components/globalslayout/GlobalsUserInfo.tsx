"use client";

import React, { useEffect } from "react";
import Player from "../playlist/Player";
import FollowComponent from "../home/FollowComponent";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import { getAllUsers } from "@/services/auth/serverAction";
import ThemeBtn from "../theme/ThemeBtn";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";

const GlobalsUserInfo = () => {
  const { setAllUsers } = useAllUsersStore((state) => state);
  const { userId } = useParams<{ userId: string }>(); //유저아이디 가져오기

  // 모든 유저 정보 zustand에 저장
  useEffect(() => {
    (async function () {
      getAllUsers().then(({ data }) => setAllUsers(data));
    })();
  }, []);

  //아이디정보찾기
  const fetchUserInfoData = async () => {
    const { data: userInfo, error } = await browserClient.from("user_info").select("*").eq("id", userId);
    return userInfo;
  };

  const {
    data: userInfoData,
    isLoading: isLoding,
    error: isError
  } = useQuery({
    queryKey: ["userInfoData"],
    queryFn: fetchUserInfoData,
    staleTime: 0
  });

  return (
    <div className="flex h-full flex-col justify-between">
      <Player />
      <FollowComponent />
      <div className="flex flex-col gap-[40px] px-[20px]">
        <div>
          {userInfoData && userInfoData.length > 0 && (
            <>
              <h2 className="mb-[10px] text-[25px] font-bold">{userInfoData[0].nickname}</h2>
              <p className="text-[16px]">{userInfoData[0].email}</p>
            </>
          )}
        </div>
        <div className="pb-[50px]">
          <ThemeBtn />
        </div>
      </div>
    </div>
  );
};

export default GlobalsUserInfo;
