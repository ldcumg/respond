import { Setting } from "@/types/setting";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  setting: Setting;
};

const testUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

const SettingShowList = ({ setting }: Props) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
        <p className="text-muted-foreground text-sm">You agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default SettingShowList;
