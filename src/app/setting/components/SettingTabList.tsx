import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const SettingTabList = () => {
  
  return (
    <div className='flex flex-col justify-between w-full h-20'>
      <div>
        <h2>공개 범위</h2>
      </div>

<RadioGroup defaultValue="option-one" className='flex'>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">모두</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-t2wo" id="option-t2wo" />
    <Label htmlFor="option-t2wo">그냥 이웃</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-t3wo" id="option-t3wo" />
    <Label htmlFor="option-t3wo">서로 이웃</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-t4wo" id="option-t4wo" />
    <Label htmlFor="option-t4wo">비공개</Label>
  </div>
</RadioGroup>
    </div>


  )
}

export default SettingTabList