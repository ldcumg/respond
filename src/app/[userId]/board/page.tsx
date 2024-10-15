"use client";

import CreatePost from "@/components/post/createPost";
import PostList from "@/components/post/postList";
import { useState } from "react";

type Props = {
  params: {
    userId: string;
  };
};

const PostsPage = ({ params }: Props) => {
  const { userId } = params;
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const handlePosting = () => {
    if (isPosting) {
      if (!confirm("게시물 작성을 취소하시겠습니까?")) return;
    }
    setIsPosting((prev) => !prev);
  };

  return (
    <>
      {isPosting ? (
        <>
          <h3>게시물 작성</h3>
          <button onClick={handlePosting}>X</button>
          <CreatePost setIsPosting={setIsPosting} />
        </>
      ) : (
        <>
          <h3>게시물</h3>
          <button onClick={handlePosting}>+</button>
          <PostList userId={userId} />
        </>
      )}
    </>
  );
};

export default PostsPage;
