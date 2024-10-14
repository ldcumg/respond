import { useAuthStore, useUserInfoStore } from "@/store/useUserInfoStore";
import { useEffect } from "react";
import browserClient from "@/utils/supabase/client"; // Supabase 클라이언트 가져오기

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

        // 데이터가 존재 시, 로그인 상태로 설정
        console.log("사용자 정보가 있습니다. 사용자는 로그인했습니다.", userInfo);
        setIsLoggedIn(true);
      } else {
        // 데이터가 존재하지 않으면, 로그아웃 상태로 설정
        console.log("사용자 정보가 없습니다. 사용자는 로그아웃했습니다.");
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn, setIsLoggedIn, setUser]); // 의존성 배열에 setIsLoggedIn과 setUser 추가

  return isLoggedIn;
};
