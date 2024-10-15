"use client";

import { deletePost, getPosts } from "@/services/post/serverAction";
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

// 임시
// const nickname = "123";

const PostDetailPage = ({ params }: Props) => {
  const { userId, postId } = params;
  const route = useRouter();
  const [post, setPost] = useState<Post>();

  const asagg = 3;

  useEffect(() => {
    (async function () {
      const { data } = await getPosts(userId);
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
    const { title, nickname, content } = post;
    return (
      <>
        <h3>{title}</h3>
        <button>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <p>{nickname}</p>
        <p>{content}</p>
        <Link href={`/${userId}/board`}>목록으로 가기</Link>
      </>
    );
  }

  return <h3>목록을 불러오는 중입니다.</h3>;
};

export default PostDetailPage;
