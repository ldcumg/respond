"use server";

import { createClient } from "@/utils/supabase/server";

export const getAllUsers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("user_info").select();
  if (error) throw new Error("유저 목록을 불러오지 못 했습니다.");
  return { data };
};

export const getIsLogin = async () => {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return !!session;
};

/** 닉네임 변경 */
export const modifyNickname = async () => {
  const supabase = createClient();

  return await supabase.from("countries").update({ name: "Australia" }).eq("id", 1);
};
