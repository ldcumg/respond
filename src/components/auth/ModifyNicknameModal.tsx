"use client";

import { modifyNickname } from "@/services/auth/serverAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  setTheme: (theme: string) => void;
  theme: string;
};

const POST_SCHEMA = z.object({
  newNickname: z.string().trim().min(1, { message: "닉네임을 입력해주세요." })
});

const ModifyNicknameModal = ({ setIsModalOpen, setTheme, theme }: Props) => {
  const closeTheme = () => setIsModalOpen(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(POST_SCHEMA)
  });
  const { newNickname: newNicknameValidate } = formState.errors;

  const onSubmit = async (value: FieldValues) => {
    console.log("value", value);
    const { error } = await modifyNickname();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[40vh] w-[500px] rounded-[22px] border-[4px] border-black bg-white px-[20px] py-[40px]">
        <h2 className="absolute left-1/2 top-[-50px] flex -translate-x-1/2 transform items-center justify-center rounded-[8px] border-4 border-black bg-white px-[50px] py-[20px] text-[20px] font-semibold">
          닉네임 변경
        </h2>
        <button
          className="absolute right-[-25px] top-[-45px] rounded-full border-[4px] border-black bg-white p-1"
          onClick={closeTheme}>
          <X />
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 rounded-[22px] border-[4px] border-black p-[20px]">
            <input {...register("nickname")} />
          </div>
          <p>{newNicknameValidate && (newNicknameValidate.message as string)}</p>
          <button>닉네임 변경하기</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyNicknameModal;
