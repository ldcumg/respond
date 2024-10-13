"use server";

import serverClient from "@/utils/supabase/server";

export const getUserInfo = async () => {
  const {
    data: { user }
  } = await serverClient.auth.getUser();

  return user
};
