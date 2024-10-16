import browserClient from "@/utils/supabase/client";

const board = "board";

export const getPostsPaginate = async (a) => {
  const { queryKey, pageParam } = a;
  console.log("a", a);

  const [_, userId] = queryKey;

  let page = -1;
  const { data: prePosts } = pageParam;
  if (!pageParam && prePosts.length < 15) {
    console.log("걸림")
    return { data: [] };
  }
  page += 1;
  console.log("page", page);

  const { data, error } = await browserClient
    .from(board)
    .select(`*,board_img(img_url)`)
    .eq("user_id", userId)
    .range(1 * 0, 1 * 0 + 3);
  // .range(15 * page, 15 * page + 14);
  if (error) throw new Error("게시물을 불러오는 데 실패했습니다.");

  console.log("data", data);
  return { data };
};
