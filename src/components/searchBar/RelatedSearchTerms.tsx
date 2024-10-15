"use client";

import { useAllUsersStore } from "@/store/useUserInfoStore";
import { useRouter } from "next/navigation";

type Props = {
  searchInputValue: string;
};

const RelatedSearchTerms = ({ searchInputValue }: Props) => {
  const route = useRouter();
  const { allUsers } = useAllUsersStore((state) => state);

  return (
    <ul className="z-50 flex max-h-44 w-[300px] flex-col overflow-auto bg-gray-50">
      {allUsers
        .filter((user) => user.nickname.toLowerCase().includes(searchInputValue.toLowerCase()))
        .map((user) => (
          <li
            className="w-full cursor-pointer py-3 pl-3 hover:bg-gray-200"
            onClick={() => route.push(`/${user.id}`)}
            key={user.id}>
            {user.nickname}
          </li>
        ))}
    </ul>
  );
};

export default RelatedSearchTerms;
