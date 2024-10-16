"use client";

import queryKey from "@/queries/queryKey";
import { Setting, SHOW_LIST, TabList as ShowList } from "@/types/setting";
import { useQuery } from "@tanstack/react-query";
import { getSetting } from "./setting/server-action/settingAction";
import { useEffect, useState } from "react";
import BoardPrev from "@/components/home/BoardPrev";
import ChatPrev from "@/components/home/ChatPrev";
import PlaylistPrev from "@/components/home/PlaylistPrev";
import SchedulePrev from "@/components/home/SchedulePrev";
import HomeSkelton from "./setting/components/HomeSkelton";
import React from "react";
import { useGetUserIds } from "./setting/hooks/useGetUserIds";
import usePrivacyState from "./setting/hooks/usePrivacyState";

const tabListExtends = {
  [SHOW_LIST.board]: {
    id: SHOW_LIST.board,
    href: "/board",
    name: "게시물",
    component: BoardPrev
  },
  [SHOW_LIST.chat]: {
    id: SHOW_LIST.chat,
    href: "/chat",
    name: "채팅",
    component: ChatPrev
  },
  [SHOW_LIST.schedule]: {
    id: SHOW_LIST.schedule,
    href: "/schedule",
    name: "스케줄 관리",
    component: SchedulePrev
  },
  [SHOW_LIST.playlist]: {
    id: SHOW_LIST.playlist,
    href: "/playlist",
    name: "플레이리스트",
    component: PlaylistPrev
  }
} as const;

const HomePage = () => {
  const { hostUserId, loginUserId } = useGetUserIds();

  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(hostUserId),
    staleTime: 0 * 1000
  });

  // TODO: ActiveComponent 지정하는 더 좋은 방법 ?
  const [activeTab, setActiveTab] = useState<ShowList | undefined>(setting?.show_list[0]);
  const privacyState = usePrivacyState(setting);

  useEffect(() => {
    setActiveTab(setting?.show_list[0]);
  }, [setting]);

  if (!setting || !activeTab) {
    return <HomeSkelton />;
  }

  if (!hostUserId || !loginUserId) {
    return <></>;
  }

  const ActiveComponent = tabListExtends[activeTab].component;

  const handleTabChange = (show: ShowList) => {
    setActiveTab(show);
  };

  // const showList = getTabList(setting.show_list, hostUserId, loginUserId);
  const showList = setting.show_list;

  return (
    <div className="flex h-full flex-col overflow-hidden p-[30px]">
      <div className="mb-[40px] flex">
        <h1 className="pageTitle">나의 홈피</h1>
      </div>
      {privacyState && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <nav className="">
            <ul className="flex gap-[5px]">
              {showList.map((show) => (
                <div key={show} onClick={() => handleTabChange(show)}>
                  <li className="tabBtn">{tabListExtends[show].name}</li>
                </div>
              ))}
            </ul>
          </nav>
          <main className="borderline no-radius w-full flex-1 overflow-auto p-[30px]">
            {activeTab && <ActiveComponent />}
          </main>
        </div>
      )}
      {!privacyState && <>볼 권한이 없어요</>}
    </div>
  );
};

export default HomePage;
