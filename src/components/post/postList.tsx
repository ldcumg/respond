"use client";

import { getPosts } from "@/services/post/serverAction";
import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";

// 임시
const userId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
// const nickname = "123";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts(userId).then(({ data }) => setPosts(data));
  }, []);

  return (
    <ol>
      {posts.map((post) => (
        <Link href={`/${userId}/board/${post.id}`} key={post.id}>
          <h6>{post.title}</h6>
          <p>{post.created_at}</p>
        </Link>
      ))}
    </ol>
  );
};

export default PostList;
