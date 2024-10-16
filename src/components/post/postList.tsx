"use client";

import { postQuery } from "@/hooks/queries/post/usePostQuery";
import { getPostDetail } from "@/services/post/serverAction";
import Link from "next/link";

type Props = {
  userId: string;
};

const PostList = ({ userId }: Props) => {
  const { data, error, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, status } = postQuery({ userId });
  console.log("data", data);
  if (isPending) {
    return <div>로딩 중...</div>;
  }

  // const { data: posts } = data?.pages[0];
  // console.log("posts", posts);

  // const ref  = useInView(
  // {
  // threshold: 1,
  // onChange: (inView) => {
  //   if (!inView || !hasNextPage || isFetchingNextPage) return;
  //   fetchNextPage();
  // }
  // }
  // );

  return (
    <ol className="flex flex-col">
      {/* {posts?.map((post) => {
        const createdDay = post.created_at.substring(0, 10);
        return (
          <Link
            href={`/${userId}/board/${post.id}`}
            key={post.id}
            className="flex h-11 flex-row items-center justify-between border-b-2">
            <h6 className="text-xl">{post.title}</h6>
            <p>
              <small>{createdDay}</small>
            </p>
          </Link>
        );
      })} */}
      <button onClick={() => fetchNextPage()}>더 보기</button>
    </ol>
  );
};

export default PostList;
