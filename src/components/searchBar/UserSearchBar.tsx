"use client";

import { useAllUsersStore } from "@/store/useUserInfoStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import RelatedSearchTerms from "./RelatedSearchTerms";

const UserSearchBar = () => {
  const route = useRouter();
  const { allUsers } = useAllUsersStore((state) => state);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const relatedTermsRef = useRef<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchedUser = allUsers.find((user) => user.nickname === searchInputValue);
    if (!searchedUser) {
      alert("해당 유저가 존재하지 않습니다.");
      return;
    }
    route.push(`/${searchedUser.id}`);
    setSearchInputValue("");
  };

  const autoClose = () => {
    if (!relatedTermsRef.current) {
      setFocusInput(false);
    }
  };

  return (
    <>
      <form className="flex h-10 w-[300px] items-center justify-around border bg-gray-50 px-3" onSubmit={handleSearch}>
        <input
          className="grow bg-gray-50"
          placeholder="유저의 닉네임을 입력해주세요."
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          onFocus={() => setFocusInput(true)}
          onBlur={autoClose}
        />
        <button className="text-gray-600">
          <Search />
        </button>
      </form>
      {focusInput && <RelatedSearchTerms searchInputValue={searchInputValue} relatedTermsRef={relatedTermsRef} />}
    </>
  );
};

export default UserSearchBar;
