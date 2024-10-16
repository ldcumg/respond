"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ModifyNicknameModal from "./ModifyNicknameModal";

const ModifyNicknameBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const { userId } = useParams<{ userId: string }>(); //유저아이디 가져오기

  const openTheme = () => setIsModalOpen(true);

  return (
    <div>
      <button onClick={openTheme} className="cursor-pointer bg-[#F4F4F4] px-[15px] py-[10px] hover:bg-[#e1e1e1]">
        내 정보 수정
      </button>
      {isModalOpen && <ModifyNicknameModal setIsModalOpen={setIsModalOpen} theme={theme} setTheme={setTheme} />}
    </div>
  );
};

export default ModifyNicknameBtn;
