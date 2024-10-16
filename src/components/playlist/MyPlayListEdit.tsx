import React from "react";
import { SquarePen } from "lucide-react";

type PlaylistEditProps = {
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEdit: boolean;
};

const MyPlayListEdit = ({ setIsShowEdit, isShowEdit }: PlaylistEditProps) => {
  /** 노래리스트 삭제버튼 활성화 */
  const handleShowEditBtn = () => {
    setIsShowEdit((prevState) => !prevState);
  };

  return (
    <button
      onClick={handleShowEditBtn}
      className={`duration-3000 flex h-[50px] w-[50px] transform items-center justify-center rounded-full border-[4px] border-black text-[14px] transition-transform ease-in-out ${isShowEdit ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"}`}
    >
      {isShowEdit ? <SquarePen color="white" /> : <SquarePen color="black" />}
    </button>
  );
};

export default MyPlayListEdit;
