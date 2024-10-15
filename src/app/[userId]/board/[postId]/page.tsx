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

const PostDetailPage = ({ params }: Props) => {
  const { userId, postId } = params;
  const route = useRouter();
  const [post, setPost] = useState<Post>();

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
    const { title, content, created_at } = post;
    const imgUrl = post.board_img?.[0]?.img_url;
    console.log("img_url", imgUrl);
    return (
      <>
        <h3>{title}</h3>
        <button>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <p>{created_at}</p>
        {imgUrl && <img src={imgUrl} />}
        <p>{content}</p>
        <Link href={`/${userId}/board`}>목록으로 가기</Link>
      </>
    );
  }

  return <h3>목록을 불러오는 중입니다.</h3>;
};

export default PostDetailPage;
