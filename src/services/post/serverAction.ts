"use server";

import { ModifyPost, NewPost } from "@/types/post";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const postsBoard = "board";

export const createPost = async (newPost: NewPost) => {
  return await supabase.from(postsBoard).insert(newPost).select();
};

export const getMyPosts = async (user_id: string) => {
  const { data, error } = await supabase.from(postsBoard).select().eq("user_id", user_id);
  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");
  return data;
};

export const getPostDetail = async ({postId}:{postId?:number}) => {
  // const column = postId ?? "*";
  const { data, error } = await supabase.from(postsBoard).select().eq("id", postId);
  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");
  return data;
};

export const modifyPost = async ({ postId, content }: ModifyPost) => {
  const { data, error } = await supabase.from(postsBoard).update({ content }).eq("id", postId);
  console.log("error", error);
  console.log("data", data);
};

export const deletePost = async () => {
  const { error } = await supabase.from(postsBoard).delete().eq("some_column", "someValue");
  console.log("error", error);
};


