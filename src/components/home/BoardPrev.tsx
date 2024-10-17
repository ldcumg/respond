import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import PostList from "../post/PostList";

const BoardPrev = () => {
  const { hostUserId } = useGetUserIds();
  return <PostList userId={hostUserId} />;
};

export default BoardPrev;
