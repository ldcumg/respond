import { create } from "zustand";
import browserClient from "../utils/supabase/client";

// 인증 상태 관리
interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  initializeAuth: () => Promise<void>;
}

// 사용자 정보 관리
interface UserInfo {
  email: string | null | undefined;
  nickname: string | null | undefined;
  setUser: (userInfo: { email: string | null | undefined; nickname: string | null | undefined }) => void; // 사용자 정보 설정
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  initializeAuth: async () => {
    const {
      data: { session }
    } = await browserClient.auth.getSession();
    if (session) {
      set({ isLoggedIn: true });
    } else {
      set({ isLoggedIn: false });
    }
  }
}));

export const useUserInfoStore = create<UserInfo>()((set) => ({
  email: null,
  nickname: null,
  setUser: (userInfo) =>
    set(() => ({
      email: userInfo.email,
      nickname: userInfo.nickname
    }))
}));
