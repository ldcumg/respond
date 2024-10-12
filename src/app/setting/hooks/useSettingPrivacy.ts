import { PrivacyType, Setting } from "@/types/setting";
import { useEffect, useState } from "react";
import { patchPrivacy } from "../server-action/settingAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKey from "@/queries/queryKey";

const userId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

export const useSettingPrivacy = (setting: Setting) => {
  const [privacySelected, setPrivacySelected] = useState<PrivacyType>(setting.privacy_type);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  /** radio 버튼 클릭 핸들러 함수 */
  const handlePrivacySelectedChange = (value: PrivacyType): void => {
    setPrivacySelected(value);
  };

  /** 기존 설정값과 같을 경우 저장 버튼 비활성화 */
  useEffect(() => {
    if (privacySelected === setting.privacy_type) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  }, [privacySelected]);

  /** 저장 버튼 클릭 시 DB 업데이트  */
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
