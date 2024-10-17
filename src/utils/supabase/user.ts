"use server";

import { createClient } from "./server";
const supabase = createClient();

/** 로그인 유저 id */
const getLoginUserId = async () => {
  const { data: loginUserId } = await supabase.auth.getUser();
  const userId = loginUserId?.user?.id;

  return userId;
};

export { getLoginUserId };
