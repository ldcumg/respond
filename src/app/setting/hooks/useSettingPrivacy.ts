import { PrivacyType } from "@/types/setting";
import { useState } from "react";

export const useSettingPrivacy = () => {
  const [privacySelected, setPrivacySelected] = useState<PrivacyType>("public");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePrivacySelectedChange = (value: PrivacyType) => {
    setPrivacySelected(value);

    if (value === "public") {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  };

  return { privacySelected, handlePrivacySelectedChange, isButtonEnabled };
};
