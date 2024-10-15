import { create } from "zustand";
import browserClient from "../utils/supabase/client";
import { AllUsersInfoStore } from "@/types/userInfo";

// 인증 상태 관리
interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  initializeAuth: () => Promise<void>;
}

// 사용자 정보 관리
interface UserInfo {
  id: string | null | undefined; // 이메일은 문자열 또는 null
  email: string | null; // 이메일은 문자열
  nickname: string | null; // 닉네임은 문자열
  setUser: (userInfo: {
    id: string | null;
    email: string | null;
    nickname: string | null;
  }) => void; // 사용자 정보 설정
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
  id: null,
  email: null,
  nickname: null,
  setUser: (userInfo) =>
    set(() => ({
      id: userInfo.id,
      email: userInfo.email,
      nickname: userInfo.nickname
    }))
}));

/** 모든 유저들의 정보 */
export const useAllUsersStore = create<AllUsersInfoStore>()((set) => ({
  allUsers: [],
  setAllUsers: (allUsers) =>
    set(() => ({
      allUsers
    }))
}));
