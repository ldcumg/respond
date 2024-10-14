"use client";

const PlaylistSearch = ({ setSearch }) => {
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
