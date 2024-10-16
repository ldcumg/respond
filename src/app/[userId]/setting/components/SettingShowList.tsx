import { Setting, SHOW_LIST, showListKr } from "@/types/setting";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettingShowList } from "../hooks/useSettingShowList";
import { useGetUserIds } from "../hooks/useGetUserIds";

type Props = {
  setting: Setting;
};

const showListCheckItems = [
  {
    id: SHOW_LIST.board,
    label: showListKr[SHOW_LIST.board]
  },
  {
    id: SHOW_LIST.playlist,
    label: showListKr[SHOW_LIST.playlist]
  },
  {
    id: SHOW_LIST.schedule,
    label: showListKr[SHOW_LIST.schedule]
  },
  {
    id: SHOW_LIST.chat,
    label: showListKr[SHOW_LIST.chat]
  }
] as const;

const SettingShowList = ({ setting }: Props) => {
  const { showListCheckList, handleCheckboxChange, isButtonEnabled, useShowListMutate } = useSettingShowList(setting);
  const { hostUserId, loginUserId } = useGetUserIds();
  const showListMutate = useShowListMutate();

  return (
    <div className="settingBox">
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold">미리보기 목록</h2>
        {isButtonEnabled && (
          <button
            className="bg-[#F4F4F4] px-[10px] py-[5px]"
            onClick={() => showListMutate({ userId: hostUserId, showList: showListCheckList })}>
            저장
          </button>
        )}
        {!isButtonEnabled && (
          <button className="cursor-pointer bg-[#F4F4F4] px-[10px] py-[5px] hover:bg-[#e4e3e3]">저장</button>
        )}
      </div>
      <div className="items-top flex items-center gap-[42px] space-x-2">
        {showListCheckItems.map((item) => (
          <div key={item.id} className="flex items-center gap-[8px]" onClick={() => handleCheckboxChange(item.id)}>
            <Checkbox id={item.id} checked={showListCheckList.includes(item.id)} />
            <label htmlFor={item.label} className="text-[16px]">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingShowList;
