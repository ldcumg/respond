"use client";

import { createPost } from "@/services/post/serverAction";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema)
  });
  const { title: titleValidateError, content: contentValidateError } = formState.errors;

  const onSubmit = async (value: FieldValues) => {
    const { title, content } = value;
    const { error } = await createPost({ user_id, nickname, title, content });

    if (error) {
      console.error(error);
      alert("게시물 작성을 실패했습니다.");
      return;
    }
    alert("게시물을 작성했습니다.");
    setIsPosting(false);
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />
      {titleValidateError && <p>{titleValidateError.message as string}</p>}
      <textarea className="resize-none" {...register("content")} />
      {contentValidateError && <p>{contentValidateError.message as string}</p>}
      <button>게시물 작성하기</button>
    </form>
  );
};

export default CreatePost;
