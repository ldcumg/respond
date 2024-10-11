
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const { error } = await browserClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.error("아이디 입력 오류:", error);
    } else {
      setError(null);
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="w-96 rounded-3xl bg-white p-8 border-4 border-black shadow-md">
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
        className="w-full rounded bg-black border-4 border-black p-2 text-white hover:invert"
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
