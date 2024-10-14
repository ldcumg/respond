"use server";

import { PlayList } from "@/types/playlist/playlist";
import { Setting } from "@/types/setting";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const getPlaylist = async (userId: string) => {
  const { data, error } = await supabase.from("playlist").select().eq("user_id", userId).returns<PlayList[]>();
  // const { data, error } = await supabase.from("setting").select().eq("user_id", userId).returns<Setting[]>();

  if (error) {
    throw new Error("playlist select Error");
  }

  console.log("userId", userId);
  console.log("data", data);

  return data;
};

export { getPlaylist };
