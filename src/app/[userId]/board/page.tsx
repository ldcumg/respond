"use client";

import CreatePost from "@/components/post/CreatePost";
import PostList from "@/components/post/PostList";
import { useState } from "react";
import { Plus, X } from "lucide-react";

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
        <div className="h-full p-[30px]">
          <div className="page-title-container !bg-[#f8f8f8]">
            <h1 className="page-title bg-[#f8f8f8]">게시물 추가</h1>
            <button onClick={handlePosting} className="circle-btn duration-3000">
              <X />
            </button>
          </div>
          <CreatePost hostId={userId} setIsPosting={setIsPosting} />
        </div>
      ) : (
        <div className="h-full p-[30px]">
          <div className="page-title-container mb-8 bg-[#f8f8f8]">
            <h1 className="page-title">게시물 모아보기</h1>
            <button onClick={handlePosting} className="circle-btn duration-3000">
              <Plus />
            </button>
          </div>
          <PostList hostId={userId} />
        </div>
      )}
    </>
  );
};

export default PostsPage;
