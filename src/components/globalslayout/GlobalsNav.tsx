"use client";

import { getSetting } from "@/app/setting/server-action/settingAction";
import queryKey from "@/queries/queryKey";
import { Setting, TAB_LIST, TabList } from "@/types/setting";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const hostUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
// const attendeeUserId = "방문자 userid";
const attendeeUserId = hostUserId;

const tabListExtends = {
  [TAB_LIST.board]: {
    id: TAB_LIST.board,
    href: "/board",
    name: "게시물"
  },
  [TAB_LIST.chat]: {
    id: TAB_LIST.chat,
    href: "/chat",
    name: "채팅"
  },
  [TAB_LIST.schedule]: {
    id: TAB_LIST.schedule,
    href: "/schedule",
    name: "스케줄 관리"
  },
  [TAB_LIST.playlist]: {
    id: TAB_LIST.playlist,
    href: "/playlist",
    name: "플레이리스트"
  }
} as const;

function getTabList(tabList: TabList[], hostUserId: string, attendeeUserId: string) {
  if (hostUserId === attendeeUserId) {
    return Object.keys(tabListExtends) as TabList[];
  }
  return tabList;
}

const GlobalsNav = () => {
  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(hostUserId)
  });

  /** 옆에 nav 스켈레톤 ? */
  if (!setting) {
    return (
      <nav>
        <ul className="flex flex-col gap-[10px] pt-[50px]">
          <Link href={"/"}>
            <li className="navBtn">홈</li>
          </Link>
        </ul>
      </nav>
    );
  }

  const tabList = getTabList(setting.tab_list, hostUserId, attendeeUserId);

  return (
    <nav>
      <ul className="flex flex-col gap-[10px] pt-[50px]">
        <Link href={"/"}>
          <li className="navBtn">홈</li>
        </Link>
        {tabList.map((tab) => (
          <Link key={tab} href={tabListExtends[tab].href}>
            <li className="navBtn">{tabListExtends[tab].name}</li>
          </Link>
        ))}
        {/* TODO: host userId와 접속자 userId가 같을 경우 만 내 설정 보여야함 일단 주석처리*/}
        {/* {hostUserId === attendeeUserId && (
          <Link href={"/setting"}>
            <li className="navBtn">내 설정</li>
          </Link>
        )} */}
        <Link href={"/setting"}>
          <li className="navBtn">내 설정</li>
        </Link>
      </ul>
    </nav>
  );
};

export default GlobalsNav;
