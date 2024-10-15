"use client";

import { getPosts } from "@/services/post/serverAction";
import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
};

const PostList = ({ userId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts(userId).then(({ data }) => setPosts(data));
  }, []);

  return (
    <ol className="flex flex-col">
      {posts.map((post) => {
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
      })}
    </ol>
  );
};

export default PostList;
