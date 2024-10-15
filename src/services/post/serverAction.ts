"use server";

import { ModifyPost, NewPost } from "@/types/post";
import { createClient } from "@/utils/supabase/server";

const postsBoard = "board";

/** supabase board 테이블에 게시물 추가 */
export const createPost = async (newPost: NewPost) => {
  const supabase = createClient();
  return await supabase.from(postsBoard).insert(newPost);
};

/** 해당 유저의 게시물 모두 불러오기 */
export const getPosts = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(postsBoard).select().eq("user_id", userId);
  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");
  return { data };
};

/** 게시물 수정 */
export const modifyPost = async ({ id, content }: ModifyPost) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(postsBoard).update({ content }).eq("id", id);
  console.log("error", error);
  console.log("data", data);
};

/** 게시물 삭제 */
export const deletePost = async (postId: string) => {
  const supabase = createClient();
  return await supabase.from(postsBoard).delete().eq("id", postId);
};

// 이미지