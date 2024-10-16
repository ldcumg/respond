import { useInfiniteQuery } from "@tanstack/react-query";
// import queryKey from "../queryKeys";
import { getPostsPaginate } from "@/services/post/postsPaginate";

export const postQuery = ({ userId }) => {
  return useInfiniteQuery({
    queryKey: ["posts", userId],
    queryFn: getPostsPaginate,
    initialPageParam: null,
    getNextPageParam: (prePosts) => prePosts
  });
};
