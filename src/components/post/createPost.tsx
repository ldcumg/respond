"use client";

import { createPost } from "@/services/post/serverAction";
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
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postSchema)
  });
  const { title: titleValidateError, content: contentValidateError } = formState.errors;

  // const [files, setFiles] = useState<File[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>();

  const onSubmit = async (value: FieldValues) => {
    if (selectedImage) {
      console.log(selectedImage);

      const randomImageName = crypto.randomUUID();
      const { data: bucketData, error } = await browserClient.storage
        .from("board_img")
        .upload(`post_img/${randomImageName}`, selectedImage);

      const {data: urlData} = browserClient.storage.from("board_img").getPublicUrl(bucketData.path);
      console.log("urlData", urlData);

      
    }

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

  // const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) setSelectedImage(e.target.files[0]);
  // console.log(e.target.files[0]);
  // const fileList = e.target.files;
  // console.log("fileList", fileList);
  // if (fileList) {
  //   const filesArray = Array.from(fileList);
  //   filesArray.forEach((file) => {
  //     handleAddImages(file);
  //   });
  // }
  // };

  // const handleAddImages = async (file: File) => {
  //   const newFileName = crypto.randomUUID();
  //   const { data, error } = await browserClient.storage.from("board_img").upload(`products/${newFileName}`, file);

  // if (error) {
  //   console.log("파일이 업로드 되지 않습니다.", error);
  //   return;
  // }

  // const res = browserClient.storage.from("board_img").getPublicUrl(data.path);
  // setFiles((prevFiles) => [file, ...prevFiles]);
  // setUploadedFileUrl((prev: any) => [...prev, res.data.publicUrl]);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" onChange={(e) => e.target.files && setSelectedImage(e.target.files[0])} multiple />
      <img
        src="https://acmtusazfkgoniskwtmu.supabase.co/storage/v1/object/public/board_img/post_img/e012e7ad-f8ae-4086-ad93-b22578700a09"
        alt="미리보기 이미지"
        width={45}
        height={45}
      />
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
