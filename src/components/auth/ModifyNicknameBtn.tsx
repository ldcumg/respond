"use client";

import { useState } from "react";
import ModifyNicknameModal from "./ModifyNicknameModal";

const ModifyNicknameBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer bg-[#F4F4F4] px-[15px] py-[10px] hover:bg-[#e1e1e1]">
        내 정보 수정
      </button>
      {isModalOpen && <ModifyNicknameModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default ModifyNicknameBtn;
