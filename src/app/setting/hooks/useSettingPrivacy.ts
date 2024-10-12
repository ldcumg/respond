import { PrivacyType, Setting } from "@/types/setting";
import { useEffect, useState } from "react";
import { patchPrivacy } from "../server-action/settingAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKey from "@/queries/queryKey";

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

  const handlePatchPrivacy = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: patchPrivacy,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.setting.setting });
      },
      onMutate: () => {
        setIsButtonEnabled(false);
      }
    });

    return mutate;
  };

  return { privacySelected, isButtonEnabled, handlePrivacySelectedChange, handlePatchPrivacy };
};
