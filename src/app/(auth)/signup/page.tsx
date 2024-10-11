"use client";

import browserClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NAME_REGEX = /^[가-힣a-zA-Z]{2,20}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9_]{2,15}$/;

interface FormData {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!NAME_REGEX.test(formData.name)) {
      newErrors.name = "이름은 2~20자의 한글 또는 영문자여야 합니다.";
    }

    if (!NICKNAME_REGEX.test(formData.nickname)) {
      newErrors.nickname = "닉네임은 2~15자의 한글, 영문자, 숫자, _만 허용됩니다.";
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "유효한 이메일을 입력하세요.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      try {
        const { error } = await browserClient.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              nickname: formData.nickname
            }
          }
        });

        if (error) {
          setErrors({ email: "회원가입 오류: " + error.message });
          console.error("회원가입 오류:", error);
          return;
        }

        alert("회원가입 완료! 로그인 페이지로 이동합니다.");
        setFormData({ name: "", nickname: "", email: "", password: "", confirmPassword: "" });
        router.push("/login");
      } catch (error) {
        console.error("회원가입 오류:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-3xl border-4 border-black bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-black tracking-wide">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            <input
              className={`w-full rounded border p-2 hover:bg-slate-50 ${isSubmitted && errors.name ? "border-red-500" : "border-gray-300"}`}
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleChange}
            />
            {isSubmitted && errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              className={`w-full rounded border p-2 hover:bg-slate-50 ${isSubmitted && errors.nickname ? "border-red-500" : "border-gray-300"}`}
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              value={formData.nickname}
              onChange={handleChange}
            />
            {isSubmitted && errors.nickname && <p className="text-red-500">{errors.nickname}</p>}

            <input
              className={`w-full rounded border p-2 hover:bg-slate-50 ${isSubmitted && errors.email ? "border-red-500" : "border-gray-300"}`}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={formData.email}
              onChange={handleChange}
            />
            {isSubmitted && errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              className={`w-full rounded border p-2 hover:bg-slate-50 ${isSubmitted && errors.password ? "border-red-500" : "border-gray-300"}`}
              type="password"
              name="password"
              placeholder="비밀번호는 8글자 이상 입력해주세요."
              value={formData.password}
              onChange={handleChange}
            />
            {isSubmitted && errors.password && <p className="text-red-500">{errors.password}</p>}

            <input
              className={`w-full rounded border p-2 hover:bg-slate-50 ${isSubmitted && errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {isSubmitted && errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

            <button type="submit" className="w-full rounded border-4 border-black bg-black p-2 text-white hover:invert">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
