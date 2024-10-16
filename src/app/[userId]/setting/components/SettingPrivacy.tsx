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
  const { hostUserId } = useGetUserIds();
  const { privacySelected, handlePrivacySelectedChange, isButtonEnabled, usePrivacyTypeMutate } =
    useSettingPrivacy(setting);
  const privacyTypeMutate = usePrivacyTypeMutate();

  return (
    <div className="settingBox">
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold">공개 범위</h2>
        {isButtonEnabled && (
          <button
            className="bg-[#F4F4F4] px-[10px] py-[5px] hover:bg-[#e4e3e3]"
            onClick={() => privacyTypeMutate({ userId: hostUserId, privacyType: privacySelected })}>
            저장
          </button>
        )}
        {!isButtonEnabled && (
          <button className="cursor-auto bg-[#d3d3d3] px-[10px] py-[5px] text-[#9a9a9a]">저장</button>
        )}
      </div>

      <RadioGroup
        defaultValue={setting.privacy_type}
        className="flex gap-[50px]"
        onValueChange={handlePrivacySelectedChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public" className="text-[16px]">
            모두
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="followers" id="followers" />
          <Label htmlFor="followers" className="text-[16px]">
            그냥 이웃
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mutualFollowers" id="mutualFollowers" />
          <Label htmlFor="mutualFollowers" className="text-[16px]">
            서로 이웃
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private" className="text-[16px]">
            비공개
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SettingPrivacy;
