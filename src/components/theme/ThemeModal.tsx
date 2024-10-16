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
        <ul className="flex gap-2 rounded-[22px] border-[4px] border-black p-[20px]">
          <li className="h-[80px] w-[80px] rounded-[8px] bg-[green]" onClick={() => handelThemeChange("green")}></li>
          <li className="h-[80px] w-[80px] rounded-[8px] bg-[yellow]" onClick={() => handelThemeChange("yellow")}></li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeModal;
