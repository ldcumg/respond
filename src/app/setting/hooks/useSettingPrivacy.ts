import { PrivacyType, Setting } from "@/types/setting";
import { useEffect, useState } from "react";
import { patchPrivacy } from "../server-action/settingAction";

const userId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

export const useSettingPrivacy = (setting: Setting) => {
  const [privacySelected, setPrivacySelected] = useState<PrivacyType>(setting.privacy_type);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePrivacySelectedChange = (value: PrivacyType): void => {
    setPrivacySelected(value);
  };

  useEffect(() => {
    if (privacySelected === setting.privacy_type) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  }, [privacySelected]);

  const handlePatchPrivacy = (privacyType: PrivacyType) => {
    try {
      patchPrivacy({ userId, privacyType });
      handlePrivacySelectedChange(privacyType);
    } catch (e) {
      console.error(e);
    }
  };

  return { privacySelected, isButtonEnabled, handlePrivacySelectedChange, handlePatchPrivacy };
};
