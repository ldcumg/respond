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
    <div className="settingBox">
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold">탭 목록</h2>
        {isButtonEnabled && (
          <button
            className="bg-[#F4F4F4] px-[10px] py-[5px] hover:bg-[#e4e3e3]"
            onClick={() => tabListMutate({ userId: hostUserId, tabList: tabListCheckList })}>
            저장
          </button>
        )}
        {!isButtonEnabled && (
          <button className="cursor-auto bg-[#d3d3d3] px-[10px] py-[5px] text-[#9a9a9a]">저장</button>
        )}
      </div>
      <div className="flex items-center gap-[42px] space-x-2">
        {tabListCheckItems.map((item) => (
          <div key={item.id} className="flex items-center gap-[8px]" onClick={() => handleCheckboxChange(item.id)}>
            <Checkbox id={item.id} checked={tabListCheckList.includes(item.id)} />
            <label htmlFor={item.label} className="text-[16px]">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingTabList;
