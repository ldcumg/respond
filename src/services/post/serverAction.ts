"use server";

import serverClient from "@/utils/supabase/server";

type Post = {
  user_id: string;
  content: string;
};

export const createPost = async (post: Post) => {
  const { data, error } = await serverClient.from("board").insert(post).select();
  console.log("error", error);
  console.log("data", data);

  return data;
};

type ModifyPost = {
  postId: number;
  content: string;
};

export const modifyPost = async ({ postId, content }: ModifyPost) => {
  const { data, error } = await serverClient.from("board").update({ content }).eq("id", postId).select();
  console.log("error", error);
  console.log("data", data);
};

export const deletePost = async () => {
  const { error } = await serverClient.from("board").delete().eq("some_column", "someValue");
  console.log("error", error);
};
