"use client";

import { useRouter } from "next/navigation";
import browserClient from "../utils/supabase/client";
import { useLoggedIn } from "../hooks/useLoggedIn";
import React from "react";

const LogOutButton = () => {
  const { isLoggedIn } = useLoggedIn(); // 훅을 사용하여 로그인 상태 가져오기
  const router = useRouter();

  const handleLogout = async () => {
    await browserClient.auth.signOut(); // Supabase에서 로그아웃 수행
    document.cookie = "supabaseSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 쿠키 삭제
    router.push("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <button
      type="button"
      className={`w-full rounded border-4 ${isLoggedIn ? "border-red-600 bg-red-600" : "border-black bg-black"} p-2 text-white hover:invert`}
      onClick={isLoggedIn ? handleLogout : () => router.push("/login")}>
      {isLoggedIn ? "로그아웃" : "로그인"}
    </button>
  );
};

export default LogOutButton;
