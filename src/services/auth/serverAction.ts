"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getUserInfo = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};

export const getIsLogin = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return !!session;
};
