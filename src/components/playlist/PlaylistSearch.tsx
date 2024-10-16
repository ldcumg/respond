"use client";
import { Search } from "lucide-react";

type PlaylistSearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const PlaylistSearch = ({ setSearch }: PlaylistSearchProps) => {
  return (
    <div className="flex w-full items-center border-[1px] border-[#DBDBDB] bg-[#FAFAFA]">
      <input
        className="w-[90%] bg-[#FAFAFA] px-[20px] py-[10px] focus:outline-none"
        type="text"
        placeholder="제목 또는 가수명을 검색하세요."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search className="w-[10%]" />
    </div>
  );
};

export default PlaylistSearch;
