"use client";

type PlaylistSearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
/* 지울예정
  React.Dispatch<> : 디스패치 함수(상태를 업데이트)의 타입을 정의
  React.SetStateAction<받을타입> : 상태 업데이트 함수가 받을 수 있는 인자의 타입을 정의
*/

const PlaylistSearch = ({ setSearch }: PlaylistSearchProps) => {
  return (
    <div className="w-full border-[1px] border-[#DBDBDB] bg-[#FAFAFA]">
      <input
        className="w-[90%] px-[20px] py-[10px] focus:outline-none"
        type="text"
        placeholder="제목 또는 가수명을 검색하세요."
        onChange={(e) => setSearch(e.target.value)}
      />
      <i>icon</i>
    </div>
  );
};

export default PlaylistSearch;
