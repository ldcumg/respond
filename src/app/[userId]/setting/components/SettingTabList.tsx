import { Setting, TAB_LIST, tabListKr } from "@/types/setting";
import React from "react";
import { useSettingTabList } from "../hooks/useSettingTabList";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetUserIds } from "../hooks/useGetUserIds";

type Props = {
  setting: Setting;
};

const tabListCheckItems = [
  {
    id: TAB_LIST.board,
    label: tabListKr[TAB_LIST.board]
  },
  {
    id: TAB_LIST.playlist,
    label: tabListKr[TAB_LIST.playlist]
  },
  {
    id: TAB_LIST.schedule,
    label: tabListKr[TAB_LIST.schedule]
  },
  {
    id: TAB_LIST.chat,
    label: tabListKr[TAB_LIST.chat]
  }
] as const;

const SettingTabList = ({ setting }: Props) => {
  const { hostUserId, loginUserId } = useGetUserIds();

  const { tabListCheckList, handleCheckboxChange, isButtonEnabled, useTabListMutate } = useSettingTabList(setting);
  const tabListMutate = useTabListMutate();

  return (
    <div className="flex h-20 w-[70%] flex-col justify-between rounded-md border-2 border-black p-2">
      <div className="flex justify-between">
        <h2>탭 목록</h2>
        {isButtonEnabled && (
          <button
            className="bg-slate-200"
            onClick={() => tabListMutate({ userId: hostUserId, tabList: tabListCheckList })}>
            저장
          </button>
        )}
        {!isButtonEnabled && <button className="cursor-auto bg-red-400">저장</button>}
      </div>
      <div className="items-top flex space-x-2">
        {tabListCheckItems.map((item) => (
          <div key={item.id} onClick={() => handleCheckboxChange(item.id)}>
            <Checkbox id={item.id} checked={tabListCheckList.includes(item.id)} />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingTabList;
