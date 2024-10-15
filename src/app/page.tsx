"use client";

import queryKey from "@/queries/queryKey";
import { Setting, SHOW_LIST, TabList as ShowList } from "@/types/setting";
import { useQuery } from "@tanstack/react-query";
import { getSetting } from "./[userId]/setting/server-action/settingAction";
import { useEffect, useState } from "react";
import BoardPrev from "@/components/home/BoardPrev";
import ChatPrev from "@/components/home/ChatPrev";
import PlaylistPrev from "@/components/home/PlaylistPrev";
import SchedulePrev from "@/components/home/SchedulePrev";
import HomeSkelton from "./[userId]/setting/components/HomeSkelton";
import React from "react";
import LogOutButton from "../components/LogOutButton";
import { useAuthStore } from "../store/useUserInfoStore";

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

const hostUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";
const attendeeUserId = "방문자 userid";

function getTabList(showList: ShowList[], hostUserId: string, attendeeUserId: string) {
  if (hostUserId === attendeeUserId) {
    return Object.keys(tabListExtends) as ShowList[];
  }
  return showList;
}

const HomePage = () => {
  const { isLoggedIn } = useAuthStore();

  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(hostUserId)
  });

  // TODO: ActiveComponent 지정하는 더 좋은 방법 ?
  // const [activeTab, setActiveTab] = useState<ShowList>(SHOW_LIST.board);
  const [activeTab, setActiveTab] = useState<ShowList | undefined>(setting?.show_list[0]);

  useEffect(() => {
    setActiveTab(setting?.show_list[0]);
  }, [setting]);

  if (!setting || !activeTab) {
    return <HomeSkelton />;
  }

  const ActiveComponent = tabListExtends[activeTab].component;

  const handleTabChange = (show: ShowList) => {
    setActiveTab(show);
  };

  const showList = getTabList(setting.show_list, hostUserId, attendeeUserId);
  return (
    <div className="h-full pb-10">
      <LogOutButton isLoggedIn={isLoggedIn} />
      <nav className="">
        <ul className="flex gap-[10px] pl-[50px]">
          {showList.map((show) => (
            <div key={show} onClick={() => handleTabChange(show)}>
              <li className="tabBtn">{tabListExtends[show].name}</li>
            </div>
          ))}
        </ul>
      </nav>
      <main className="borderline h-full w-full overflow-hidden">{activeTab && <ActiveComponent />}</main>
    </div>
  );
};

export default HomePage;
