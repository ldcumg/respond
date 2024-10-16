import type { PostQuery } from "@/types/post";
import browserClient from "@/utils/supabase/client";

const boardTable = "board";

/** 게시물 10개씩 불러오기 */
export const getPostsPaginate = async ({ queryKey, pageParam }: PostQuery) => {
  const [_, userId] = queryKey;

  const { data, error } = await browserClient
    .from(boardTable)
    .select(`*,board_img(img_url)`)
    .eq("user_id", userId)
    .range(10 * pageParam, 10 * pageParam + 9);

  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");

  return data;
};
