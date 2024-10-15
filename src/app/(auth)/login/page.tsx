"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/useUserInfoStore";
import browserClient from "../../../utils/supabase/client";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  console.log(setIsLoggedIn);

  useEffect(() => {
    const sessionCookie = async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession();
      if (session) {
        alert("이미 로그인된 사용자입니다!");
        setIsLoggedIn(true); // 로그인 상태 설정
        router.push("/"); // 이미 로그인되어 있을 경우 홈으로 이동
      } else {
        setIsLoggedIn(false); // 세션이 없으면 로그인 상태 false로 설정
      }
    };
    sessionCookie();
  }, [router, setIsLoggedIn]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const { error } = await browserClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
      console.error("로그인 오류:", error);
    } else {
      setError(null);
      const {
        data: { session }
      } = await browserClient.auth.getSession();

      document.cookie = `supabaseSession=${JSON.stringify(session)}; path=/; secure; SameSite=Lax`;
      setIsLoggedIn(true); // 로그인 상태 업데이트
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-3xl border-4 border-black bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-black tracking-wide">로그인</h2>
        <div className="flex flex-col gap-4">
          <input
            className="w-full rounded border p-2 hover:bg-slate-50"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded border p-2 hover:bg-slate-50"
            type="password"
            name="password"
            placeholder="비밀번호는 8글자 이상 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded border-4 border-black bg-black p-2 text-white hover:invert"
            onClick={handleLogin}>
            로그인
          </button>
        </div>
        {error && <p className="text-red-500">에러입니다: {error}</p>}
      </div>
    </div>
  );
};

export default Login;
