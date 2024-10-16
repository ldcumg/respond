import { useInfiniteQuery } from "@tanstack/react-query";
import queryKey from "../queryKeys";
import { getPostsPaginate } from "@/services/post/postsPaginate";

export const postQuery = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [...queryKey.posts, userId],
    queryFn: getPostsPaginate,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    }
  });
};
