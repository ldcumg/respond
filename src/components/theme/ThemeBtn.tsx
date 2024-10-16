"use client";

import React, { useState, useEffect } from "react";
import ThemeModal from "./ThemeModal";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";
import { useParams } from "next/navigation";

const ThemeBtn = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const { userId } = useParams<{ userId: string }>(); //유저아이디 가져오기

  const openTheme = () => setIsModalOpen(true);

  const fetchMainTheme = async () => {
    const { data, error } = await browserClient.from("setting").select("theme_name").eq("user_id", userId).single();
    console.log(data);
    return data;
  };

  //myTheme 데이터를 가져오기
  const {
    data: myTheme,
    isLoading,
    error
  } = useQuery({
    queryKey: ["myTheme", clientId, clientSecret],
    queryFn: fetchMainTheme
  });
  console.log("myTheme", myTheme);
  useEffect(() => {
    if (myTheme) {
      const themeName = myTheme.theme_name;
      setTheme(themeName);
      document.body.className = theme;
    }
  }, []);
  console.log("theme", theme);
  return (
    <div>
      <button onClick={openTheme} className="cursor-pointer bg-[#F4F4F4] px-[15px] py-[10px] hover:bg-[#e1e1e1]">
        내 홈피 꾸미기
      </button>
      {isModalOpen && <ThemeModal setIsModalOpen={setIsModalOpen} theme={theme} setTheme={setTheme} />}
    </div>
  );
};

export default ThemeBtn;
