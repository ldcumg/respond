import { useInfiniteQuery } from "@tanstack/react-query";
import queryKey from "../queryKeys";
import { getPostsPaginate } from "@/services/post/postsPaginate";

export const postQuery = ({ hostId }: { hostId: string }) => {
  return useInfiniteQuery({
    queryKey: [...queryKey.posts, hostId],
    queryFn: getPostsPaginate,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    }
  });
};
