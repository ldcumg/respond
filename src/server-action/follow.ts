"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const patchFollow = async ({ hostUserId, loginUserId }:any) => {
  const { error } = await supabase.from("follow").insert({ to_user_id:hostUserId, from_user_id:loginUserId }).eq("user_id", userId);

  if (error) {
    throw new Error("Follow update Error");
  }
};