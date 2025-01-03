"use server";

import { ModifyPost, NewPost, PostImage } from "@/types/post";
import { createClient } from "@/utils/supabase/server";

const board = "board";

/** supabase board 테이블에 게시물 추가 */
export const createPost = async (newPost: NewPost) => {
  const supabase = createClient();

  return await supabase.from(board).insert(newPost).select();
};

/** 사진 추가하기 */
export const imagePosting = async ({ user_id, board_id, imageUrl }: PostImage) => {
  const supabase = createClient();

  return await supabase.from("board_img").insert({ user_id, board_id, img_url: imageUrl });
};

/** 해당 게시물의 정보 요청하기 */
export const getPostDetail = async ({ postId }: { postId: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase.from(board).select(`*,board_img(img_url)`).eq("id", postId);
  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");

  return { data };
};

/** 게시물 수정 */
export const modifyPost = async ({ id, content }: ModifyPost) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(board).update({ content }).eq("id", id);
};

/** 게시물 삭제 */
export const deletePost = async (postId: string) => {
  const supabase = createClient();
  return await supabase.from(board).delete().eq("id", postId);
};
