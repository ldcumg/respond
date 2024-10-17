"use client";

import { deletePost, getPostDetail } from "@/services/post/serverAction";
import { Post } from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    userId: string;
    postId: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const { userId, postId } = params;
  const route = useRouter();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    (async function () {
      const { data } = await getPostDetail({ postId });
      const targetPost = data.find((post) => post.id === Number(postId));
      setPost(targetPost);
    })();
  }, []);

  const handleDelete = async () => {
    if (confirm("게시물을 삭제하시겠습니까?")) {
      const { error } = await deletePost(postId);
      if (error) {
        alert("게시물 삭제에 실패했습니다.");
        return;
      }
      alert("게시물을 삭제했습니다.");
      route.replace(`/${userId}/board`);
      return;
    }
    alert("삭제를 취소했습니다.");
  };

  if (post) {
    const { title, content, created_at } = post;
    const createdDay = created_at.substring(0, 10);
    const imgUrl = post.board_img?.[0]?.img_url;
    return (
      <div className="relative h-full w-full p-10">
        <div className="page-title-container bg-[#f8f8f8]">
          <h1 className="page-title">{title}</h1>
          <button onClick={handleDelete}>삭제</button>
        </div>
        <p>
          <small>{createdDay}</small>
        </p>
        <div className="mx-20 flex h-[75%] flex-col items-center overflow-auto">
          {imgUrl && <img className="mx-auto mt-5 w-[60%]" src={imgUrl} />}
          <p className="mt-5 flex w-full justify-center">{content}</p>
        </div>
        <Link
          href={`/${userId}/board`}
          className="absolute bottom-1 right-1/2 translate-x-1/2 rounded-full border-4 border-black px-6 py-3 font-bold hover:bg-black hover:text-white mb-10">
          목록으로 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-2xl">게시물을 불러오는 중입니다...</p>
    </div>
  );
};

export default PostDetailPage;
