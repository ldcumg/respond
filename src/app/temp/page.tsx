"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

// 분리?
const postSchema = z
  .object({
    content: z.string({ message: "입력" }).min(1, { message: "내용을 입력해주세요." })
  })
  .refine(({ content }) => content.trim().length > 0);

const TempPage = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema)
  });
  const validateError = formState.errors.content;

  const onSubmit = (value: FieldValues) => {
    const { content } = value;
    console.log(content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea className="resize-none" {...register("content")} />
      {validateError && <span>{validateError.message as string}</span>}
      <button>게시물 작성하기</button>
    </form>
  );
};

export default TempPage;
