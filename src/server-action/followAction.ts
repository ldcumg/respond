"use server";

import { Follow } from "@/types/follow";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

// const

const a = 1;

const postFollow = async ({ toUserId, fromUserId }: Partial<Follow>) => {};

const patchFollow = async ({ toUserId, fromUserId }: any) => {
  const { error } = await supabase
    .from("follow")
    .insert({ to_user_id: hostUserId, from_user_id: loginUserId })
    .eq("user_id", userId);

  if (error) {
    throw new Error("Follow update Error");
  }
};
