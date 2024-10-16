import React from "react";
import { Plus } from "lucide-react";

type PlaylistModalBtnProps = {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

const PlayListModalBtn = ({ setIsShowModal, isShowModal }: PlaylistModalBtnProps) => {
  /** 노래추가리스트 팝업창 이벤트 */
  const handleShowModal = () => {
    setIsShowModal((prevState: boolean) => !prevState);
  };

  return (
    <button
      onClick={handleShowModal}
      className={`circle-btn duration-3000 ${isShowModal ? "rotate-45 bg-[#000] text-[#fff]" : "rotate-0 bg-[#fff] text-[#000]"}`}
    >
      <Plus />
    </button>
  );
};

export default PlayListModalBtn;
