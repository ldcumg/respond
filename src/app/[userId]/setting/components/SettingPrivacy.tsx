"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSettingPrivacy } from "../hooks/useSettingPrivacy";
import { Setting } from "@/types/setting";
import { useGetUserIds } from "../hooks/useGetUserIds";

type Props = {
  setting: Setting;
};

const SettingPrivacy = ({ setting }: Props) => {
  const { hostUserId, loginUserId } = useGetUserIds();
  const { privacySelected, handlePrivacySelectedChange, isButtonEnabled, usePrivacyTypeMutate } =
    useSettingPrivacy(setting);
  const privacyTypeMutate = usePrivacyTypeMutate();

  return (
    <div className="flex h-20 w-[70%] flex-col justify-between rounded-md border-2 border-black p-2">
      <div className="flex justify-between">
        <h2>공개 범위</h2>
        {isButtonEnabled && (
          <button
            className="bg-slate-200"
            onClick={() => privacyTypeMutate({ userId: hostUserId, privacyType: privacySelected })}
          >
            저장
          </button>
        )}
        {!isButtonEnabled && <button className="cursor-auto bg-red-400">저장</button>}
      </div>

      <RadioGroup defaultValue={setting.privacy_type} className="flex" onValueChange={handlePrivacySelectedChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public">모두</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="followers" id="followers" />
          <Label htmlFor="followers">그냥 이웃</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mutualFollowers" id="mutualFollowers" />
          <Label htmlFor="mutualFollowers">서로 이웃</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private">비공개</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SettingPrivacy;
