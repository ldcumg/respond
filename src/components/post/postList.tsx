"use client";

import { postQuery } from "@/hooks/queries/post/usePostQuery";
import Link from "next/link";

type Props = {
  userId: string;
};

const PostList = ({ userId }: Props) => {
  const { data, error, fetchNextPage, hasNextPage, isPending, isError } = postQuery({ userId });
  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>오류가 발생했습니다.</div>;
  }

  const posts = data?.pages[0];

  return (
    <ol className="flex flex-col h-5/6 scroll-auto">
      {posts?.map((post) => {
        const createdDay = post.created_at.substring(0, 10);
        return (
          <Link
            href={`/${userId}/board/${post.id}`}
            key={post.id}
            className="mx-14 flex h-14 flex-row items-center justify-between border-b-2">
            <h6 className="text-xl">{post.title}</h6>
            <p>
              <small>{createdDay}</small>
            </p>
          </Link>
        );
      })}
      <button className="mt-1" onClick={() => fetchNextPage()}>더 보기</button>
    </ol>
  );
};

export default PostList;
