"use client";

import { postQuery } from "@/hooks/queries/post/usePostQuery";
import Link from "next/link";

type Props = {
  userId: string;
};

const PostList = ({ userId }: Props) => {
  const { data, error, fetchNextPage, isPending, isError } = postQuery({ userId });
  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>오류가 발생했습니다.</div>;
  }

  const posts = data.pages.flat();

  return (
    <ol className="flex h-4/5 flex-col overflow-auto">
      {posts.map((post) => {
        const createdDay = post.created_at.substring(0, 10);
        return (
          <Link
            href={`/${userId}/board/${post.id}`}
            key={post.id}
            className="flex flex-row items-center justify-between border-b-2 py-3 hover:bg-gray-50">
            <h6 className="h-full text-xl">{post.title}</h6>
            <p>
              <small>{createdDay}</small>
            </p>
          </Link>
        );
      })}
      <button className="mt-4 hover:bg-gray-50" onClick={() => fetchNextPage()}>
        더 보기
      </button>
    </ol>
  );
};

export default PostList;
