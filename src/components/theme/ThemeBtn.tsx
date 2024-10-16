"use client";

import React, { useState, useEffect } from "react";
import ThemeModal from "./ThemeModal";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

const ThemeBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const { userId } = useParams<{ userId: string }>(); //유저아이디 가져오기
  const loginUser = useGetUserInfo();
  const loginUserId: string = loginUser?.id ?? "";

  const openTheme = () => setIsModalOpen(true);

  const fetchMainTheme = async () => {
    const { data, error } = await browserClient.from("setting").select("theme_name").eq("user_id", userId).single();
    return data;
  };

  //myTheme 데이터를 가져오기
  const {
    data: myTheme,
    isLoading,
    error
  } = useQuery({
    queryKey: ["myTheme"],
    queryFn: fetchMainTheme,
    staleTime: 0 //값 매번 가져오기 or queryKey ["myTheme"],+userId를 줘서 각각 패치되도록?
  });

  useEffect(() => {
    if (myTheme) {
      localStorage.clear(); // 로컬 스토리지 비우기
      const themeName = myTheme.theme_name;
      setTheme(themeName);
      document.body.className = themeName;
      localStorage.getItem(themeName); //로컬 스토리지 테마값 가져오기
    }
  }, [userId, myTheme]); //유저아이디가 변경되거나, 가져온 테마값이 변경될때

  if (error) return <div>데이터 가져오기 오류...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {loginUserId === userId ? (
        <>
          <button onClick={openTheme} className="cursor-pointer bg-[#F4F4F4] px-[15px] py-[10px] hover:bg-[#e1e1e1]">
            내 홈피 꾸미기
          </button>
          {isModalOpen && <ThemeModal setIsModalOpen={setIsModalOpen} theme={theme} setTheme={setTheme} />}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ThemeBtn;
