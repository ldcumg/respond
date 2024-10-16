"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";

type ThemeModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  setTheme: (theme: string) => void;
  theme: string;
};

const themeChange = async (color: string) => {
  const { data: loginUserId } = await browserClient.auth.getUser();
  const userId = loginUserId?.user?.id;

  const { data, error } = await browserClient.from("setting").update({ theme_name: color }).eq("user_id", userId);
  if (error) console.error("테마추가 오류 발생:", error);
  return data;
};

const ThemeModal = ({ setIsModalOpen, setTheme, theme }: ThemeModalProps) => {
  const queryClient = useQueryClient();

  const closeTheme = () => setIsModalOpen(false);

  //myTheme 데이터를 업데이트
  const themeChangeMutation = useMutation({
    mutationFn: themeChange,
    onSuccess: () => {
      queryClient.invalidateQueries(["myTheme"]);
    },
    onError: (error: Error) => {
      console.log("error.message", error.message);
    }
  });
  //업데이트 실행
  const handelThemeChange = async (newTheme: string) => {
    setTheme(newTheme);
    themeChangeMutation.mutate(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[40vh] w-[500px] rounded-[22px] border-[4px] border-black bg-white px-[20px] py-[40px]">
        <h2 className="absolute left-1/2 top-[-50px] flex -translate-x-1/2 transform items-center justify-center rounded-[8px] border-4 border-black bg-white px-[50px] py-[20px] text-[20px] font-semibold">
          홈피 테마 커스텀
        </h2>
        <button
          className="absolute right-[-25px] top-[-45px] rounded-full border-[4px] border-black bg-white p-1"
          onClick={closeTheme}>
          <X />
        </button>
        <div className="flex h-full w-full flex-col justify-center gap-[20px]">
          <div>
            <h2 className="py-[10px] text-[18px] font-bold">Colorful</h2>
            <ul className="flex gap-2 rounded-[22px] border-[4px] border-black p-[20px]">
              <li className="theme-colorchip bg-[#FFA1A1]" onClick={() => handelThemeChange("pink")}></li>
              <li className="theme-colorchip bg-[#FFFD8B]" onClick={() => handelThemeChange("yellow")}></li>
              <li className="theme-colorchip bg-[#C4FF94]" onClick={() => handelThemeChange("green")}></li>
              <li className="theme-colorchip bg-[#91C1D6]" onClick={() => handelThemeChange("blue")}></li>
            </ul>
          </div>
          <div>
            <h2 className="py-[10px] text-[18px] font-bold">Mono</h2>
            <ul className="flex gap-2 rounded-[22px] border-[4px] border-black p-[20px]">
              <li className="theme-colorchip bg-[#787878]" onClick={() => handelThemeChange("gray")}></li>
              <li className="theme-colorchip bg-[#212121]" onClick={() => handelThemeChange("dark")}></li>
              <li className="theme-colorchip bg-[#E6E6E6]" onClick={() => handelThemeChange("light")}></li>
              <li className="theme-colorchip bg-[#2c2163]" onClick={() => handelThemeChange("navy")}></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
