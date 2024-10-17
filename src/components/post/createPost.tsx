"use client";

import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import { POST_SCHEMA } from "@/constants/postSchema";
import { createPost, deletePost, imagePosting } from "@/services/post/serverAction";
import { useAllUsersStore } from "@/store/useUserInfoStore";
import browserClient from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { queryClient } from "../providers/RQProvider";
import queryKey from "@/hooks/queries/queryKeys";

type Props = {
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>;
  hostId: string;
};

const CreatePost = ({ setIsPosting, hostId }: Props) => {
  const { loginUserId: user_id } = useGetUserIds();
  const { allUsers } = useAllUsersStore((state) => state);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(POST_SCHEMA)
  });
  const { title: titleValidateError, content: contentValidateError } = formState.errors;

  // TODO 커스텀 훅으로 빼기
  const onSubmit = async (value: FieldValues) => {
    if (user_id) {
      const nickname = allUsers.find((user) => user.id === user_id)?.nickname;
      if (nickname) {
        const { title, content } = value;
        const { data: boardData, error } = await createPost({ user_id, nickname, title, content });

        if (error) {
          console.error(error);
          alert("게시물 작성을 실패했습니다.");
          return;
        }

        if (imageUrl) {
          const { id: board_id } = boardData[0];

          const { error: imageTableError } = await imagePosting({ user_id, board_id, imageUrl });

          if (imageTableError) {
            await deletePost(board_id);
            console.error(imageTableError);
            alert("이미지 업로드를 실패했습니다.");
            return;
          }
        }

        queryClient.invalidateQueries({ queryKey: [...queryKey.posts, hostId] });
        alert("게시물을 작성했습니다.");
        setIsPosting(false);
        return;
      }
    }
  };

  useEffect(() => {
    if (image) {
      (async function () {
        const randomImageName = crypto.randomUUID();
        const { data: bucketData, error: imageError } = await browserClient.storage
          .from("board_img")
          .upload(`post_img/${randomImageName}`, image);

        if (imageError) {
          console.error(imageError);
          alert("이미지 로드를 실패했습니다.");
          return;
        }
        const { path } = bucketData;

        const { publicUrl } = browserClient.storage.from("board_img").getPublicUrl(path).data;
        setImageUrl(publicUrl);
        return;
      })();
    } else {
      setImageUrl(undefined);
    }
  }, [image]);

  const handleRemoveImage = () => {
    if (confirm("이미지를 제거하시겠습니까?")) {
      setImage(null);
    }
    return;
  };

  return (
    <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-2/5 w-full items-center justify-around">
        <div className="flex flex-col gap-6">
          <p className="text-2xl font-semibold">썸네일 이미지 추가하기</p>
          <label className="text-l w-fit cursor-pointer border border-black px-5 py-3" htmlFor="file">
            이미지 추가
          </label>
          <input
            className="hidden"
            id="file"
            type="file"
            onChange={(e) => (e.target.files ? setImage(e.target.files[0]) : setImage(null))}
            multiple
          />
        </div>
        {image ? (
          <img onClick={handleRemoveImage} className={imgPreviewStyle} src={imageUrl} alt="이미지를 로딩 중" />
        ) : (
          <div className={`${imgPreviewStyle} rounded bg-gray-200`} />
        )}
      </div>
      <div className="flex h-2/5 w-full flex-col gap-4 border-y">
        <div className={`${inputAreaStyle} h-2/5`}>
          <label className={`${inputLabelStyle} items-center`}>게시물 제목</label>

          <div className="mt-3 flex h-full w-4/5 flex-col justify-center gap-1">
            <input className="h-1/2 w-full border pl-3" placeholder="게시물 제목" {...register("title")} />
            <p className={inputAlert}>{titleValidateError && (titleValidateError.message as string)}</p>
          </div>
        </div>
        <div className={`${inputAreaStyle} h-3/5`}>
          <label className={inputLabelStyle}>게시물 본문</label>
          <div className="flex h-full w-4/5 flex-col gap-1">
            <textarea
              className="h-3/4 w-full resize-none border pl-3 pt-3"
              placeholder="게시물 본문"
              {...register("content")}
            />
            <p className={inputAlert}>{contentValidateError && (contentValidateError.message as string)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="mt-5 rounded-full border-4 border-black px-6 py-3 font-bold hover:bg-black hover:text-white">
          게시물 작성하기
        </button>
      </div>
    </form>
  );
};

export default CreatePost;

const imgPreviewStyle = "h-[180px] w-[300px] flex items-center justify-center";

const inputLabelStyle = "flex h-full w-1/5 text-xl justify-center font-semibold";

const inputAreaStyle = "flex  w-full gap-4";

const inputAlert = "h-3 text-red-500 pl-3";
