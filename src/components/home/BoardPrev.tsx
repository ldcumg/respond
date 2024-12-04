import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import PostList from "@/components/post/postList";

const BoardPrev = () => {
  const { hostUserId } = useGetUserIds();
  return <PostList hostId={hostUserId} />;
};

export default BoardPrev;
