"use client";

import { useAllUsersStore } from "@/store/useUserInfoStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSearchBar = () => {
  const route = useRouter();
  const { allUsers } = useAllUsersStore((state) => state);
  const [searchInput, setSearchInput] = useState<string>("");

  // const allUsersNickname = allUsers.map((userInfo) => userInfo.nickname);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchedUser = allUsers.find((user) => user.nickname === searchInput);
    if (!searchedUser) {
      alert("해당 유저가 존재하지 않습니다.");
      return;
    }
    route.push(`/${searchedUser.id}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        placeholder="유저의 닉네임을 입력해주세요."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button>검색</button>
    </form>
  );
};

export default UserSearchBar;
