import React from "react";

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
      className={`duration-3000 h-[50px] w-[50px] transform rounded-full border-[4px] border-black text-[14px] transition-transform ease-in-out hover:bg-[#000] hover:text-[#fff] ${isShowEdit ? "bg-[#000] text-[#fff]" : "bg-[#fff] text-[#000]"}`}>
      {isShowEdit ? <p>편집중</p> : <p>편집</p>}
    </button>
  );
};

export default MyPlayListEdit;
