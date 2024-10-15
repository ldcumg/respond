"use client";

import { createPost, imagePosting } from "@/services/post/serverAction";
import browserClient from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// 임시
const user_id = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
const nickname = "123";
// 스키마 파일 분리 예정
const postSchema = z.object({
  title: z.string().trim().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().trim().min(1, { message: "내용을 입력해주세요." })
});

type Props = {
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePost = ({ setIsPosting }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string | undefined>(undefined);
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema)
  });
  const { title: titleValidateError, content: contentValidateError } = formState.errors;

  // NOTE 커스텀 훅으로 빼기
  const onSubmit = async (value: FieldValues) => {
    const { title, content } = value;
    const { data: boardData, error } = await createPost({ user_id, nickname, title, content });

    if (error) {
      console.error(error);
      alert("게시물 작성을 실패했습니다.");
      return;
    }

    if (image) {
      const { id: board_id } = boardData[0];

      const randomImageName = crypto.randomUUID();
      const { data: bucketData, error: imageError } = await browserClient.storage
        .from("board_img")
        .upload(`${nickname}/${randomImageName}`, image);

      if (imageError) {
        console.error(imageError);
        alert("이미지 업로드를 실패했습니다.");
        return;
      }
      const { path } = bucketData;

      const { publicUrl } = browserClient.storage.from("board_img").getPublicUrl(path).data;
      setImgPreviewUrl(publicUrl);

      const { error: imageTableError } = await imagePosting({ user_id, board_id, publicUrl });

      if (imageTableError) {
        console.error(imageTableError);
        alert("이미지 업로드를 실패했습니다.");
        return;
      }
    }

    alert("게시물을 작성했습니다.");
    setIsPosting(false);
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" onChange={(e) => e.target.files && setImage(e.target.files[0])} multiple />
      <img src={imgPreviewUrl} alt="미리보기 이미지" width={45} height={45} />
      <label>게시물 제목</label>
      <input {...register("title")} />
      {titleValidateError && <p>{titleValidateError.message as string}</p>}
      <label>게시물 본문</label>
      <textarea className="resize-none" {...register("content")} />
      {contentValidateError && <p>{contentValidateError.message as string}</p>}
      <button>게시물 작성하기</button>
    </form>
  );
};

export default CreatePost;
