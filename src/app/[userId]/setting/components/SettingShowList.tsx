import { Setting, SHOW_LIST, showListKr } from "@/types/setting";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettingShowList } from "../hooks/useSettingShowList";

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

const testUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

const SettingShowList = ({ setting }: Props) => {
  const { showListCheckList, handleCheckboxChange, isButtonEnabled, useShowListMutate } = useSettingShowList(setting);
  const showListMutate = useShowListMutate();

  return (
    <div className="flex h-20 w-[70%] flex-col justify-between rounded-md border-2 border-black p-2">
      <div className="flex justify-between">
        <h2>미리보기 목록</h2>
        {isButtonEnabled && (
          <button
            className="bg-slate-200"
            onClick={() => showListMutate({ userId: testUserId, showList: showListCheckList })}>
            저장
          </button>
        )}
        {!isButtonEnabled && <button className="cursor-auto bg-red-400">저장</button>}
      </div>
      <div className="items-top flex space-x-2">
        {showListCheckItems.map((item) => (
          <div key={item.id} onClick={() => handleCheckboxChange(item.id)}>
            <Checkbox id={item.id} checked={showListCheckList.includes(item.id)} />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingShowList;
