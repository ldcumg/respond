import { useEffect, useState } from "react";
import browserClient from "../utils/supabase/client";
import { useAuthStore, useUserInfoStore } from "../store/useUserInfoStore";
import { User } from "@supabase/supabase-js";

export const useLoggedIn = () => {
  const { setIsLoggedIn } = useAuthStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { setUser } = useUserInfoStore();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession(); // 세션 정보 가져오기

      if (session) {
        const userInfo = session.user; // 사용자 정보 가져오기

        const email = userInfo?.email || null; // 이메일 가져오기, 없으면 null
        const nickname = userInfo?.user_metadata?.nickname || null; // 닉네임 가져오기, 없으면 null

        // Zustand useUserInfoStore에 저장
        setUser({ email, nickname });
        setIsLoggedIn(true);
      } else {
        // 데이터가 존재하지 않으면, 로그아웃 상태로 설정
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn, setIsLoggedIn, setUser]); // 의존성 배열에 setIsLoggedIn과 setUser 추가

  return isLoggedIn;
};
