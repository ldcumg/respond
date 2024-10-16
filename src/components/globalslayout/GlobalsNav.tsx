"use client";

import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import usePrivacyState from "@/app/[userId]/setting/hooks/usePrivacyState";
import { getSetting } from "@/app/[userId]/setting/server-action/settingAction";
import queryKey from "@/queries/queryKey";
import { Setting, TAB_LIST, TabList } from "@/types/setting";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

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
  // 만약 페이지 주인도 탭 설정에 따른 탭만 노출되게하려면 이 조건 지우면 됨
  if (hostUserId === attendeeUserId) {
    return Object.keys(tabListExtends) as TabList[];
  }
  return tabList;
}

const GlobalsNav = () => {
  const { hostUserId, loginUserId } = useGetUserIds();

  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(hostUserId)
  });
  const privacyState = usePrivacyState(setting);

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

  if (!loginUserId) {
    return <></>;
  }
  const tabList = getTabList(setting.tab_list, hostUserId, loginUserId);
  const NAV_BASE_URL = `/${hostUserId}`;

  return (
    <nav>
      <ul className="flex flex-col gap-[10px] pt-[50px]">
        <Link href={NAV_BASE_URL}>
          <li className="navBtn">홈</li>
        </Link>
        {privacyState && hostUserId !== loginUserId && (
          <>
            {tabList.map((tab) => (
              <Link key={tab} href={`${NAV_BASE_URL}${tabListExtends[tab].href}`}>
                <li className="navBtn">{tabListExtends[tab].name}</li>
              </Link>
            ))}
          </>
        )}
        {hostUserId === loginUserId && (
          <>
            {tabList.map((tab) => (
              <Link key={tab} href={`${NAV_BASE_URL}${tabListExtends[tab].href}`}>
                <li className="navBtn">{tabListExtends[tab].name}</li>
              </Link>
            ))}
            <Link href={`${NAV_BASE_URL}/setting`}>
              <li className="navBtn">내 설정</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default GlobalsNav;
