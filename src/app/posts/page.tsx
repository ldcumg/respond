"use client";

import { getUserInfo } from "@/services/auth/serverAction";
import { createPost } from "@/services/post/serverAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// 스키마 파일 분리 예정
const postSchema = z.object({
  content: z.string().trim().min(1, { message: "내용을 입력해주세요." })
});

const AddPostModal = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema)
  });
  const validateError = formState.errors.content;

  const user_id = "asfsdaf"
  
  // const dasv = async () => {
  //   const test = await getUserInfo()
  //   console.log(test)
  // }
  // dasv()
  const onSubmit = async (value: FieldValues) => {
    const { content } = value;
    console.log("실행");

    await createPost({ user_id, content });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea className="resize-none" {...register("content")} />
      {validateError && <p>{validateError.message as string}</p>}
      <button>게시물 작성하기</button>
    </form>
  );
};

export default AddPostModal;
