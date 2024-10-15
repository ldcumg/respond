import Link from "next/link";
import React from "react";

const GlobalsNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-[10px] pt-[50px]">
        <Link href={"/"}>
          <li className="navBtn">홈</li>
        </Link>
        <Link href={"/playlist"}>
          <li className="navBtn">게시물</li>
        </Link>
        <Link href={"/playlist"}>
          <li className="navBtn">채팅</li>
        </Link>
        <Link href={"/schedule"}>
          <li className="navBtn">스케줄 관리</li>
        </Link>
        <Link href={"/playlist"}>
          <li className="navBtn">플레이리스트</li>
        </Link>
        <Link href={"/setting"}>
          <li className="navBtn">내 설정</li>
        </Link>
      </ul>
    </nav>
  );
};

export default GlobalsNav;
