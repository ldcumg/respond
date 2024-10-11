"use client"

import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useSettingPrivacy } from '../hooks/useSettingPrivacy'

const SettingPrivacy = ({data}:any) => {
  const {privacySelected,handlePrivacySelectedChange, isButtonEnabled } = useSettingPrivacy();

  console.log('data', data);


  return (    
  <div className='flex flex-col justify-between w-[70%] h-20 border-2 border-black rounded-md p-2'>
    <div className='flex justify-between'>
      <h2>공개 범위</h2>
      {!isButtonEnabled && <button className='bg-red-400'>저장</button>}
      {isButtonEnabled && <button className='bg-slate-200'>저장</button>}





      
    </div>

    <RadioGroup defaultValue={privacySelected} className='flex' onValueChange={handlePrivacySelectedChange}>
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
  )
}

export default SettingPrivacy