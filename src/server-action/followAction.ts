"use server";

import { Follow } from "@/types/follow";
import { createClient } from "@/utils/supabase/server";

type RequestFollow = {
  id: number;
  toUserId: string;
  fromUserId: string;
};

const getFollow = async ({ toUserId, fromUserId }: Omit<RequestFollow, "id">) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("follow")
    .select()
    .eq("to_user_id", toUserId)
    .eq("from_user_id", fromUserId)
    .returns<Follow[]>();

  if (error) {
    throw new Error("Follow select Error");
  }

  if (data.length < 1) {
    return null;
  }

  return data[0];
};

const postFollow = async ({ toUserId, fromUserId }: RequestFollow) => {
  const supabase = createClient();
  const { error } = await supabase.from("follow").insert({ to_user_id: toUserId, from_user_id: fromUserId });
  if (error) {
    throw new Error("Follow insert Error");
  }
};

const deleteFollow = async ({ id }: RequestFollow) => {
  const supabase = createClient();
  const { error } = await supabase.from("follow").delete().eq("id", id);

  if (error) {
    throw new Error("Follow delete Error");
  }
};

export { getFollow, postFollow, deleteFollow };
