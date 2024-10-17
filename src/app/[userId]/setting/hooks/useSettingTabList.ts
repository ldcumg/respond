import { Setting, TabList } from "@/types/setting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { patchTabList } from "../server-action/settingAction";
import queryKey from "@/queries/queryKey";

export const useSettingTabList = (setting: Setting) => {
  const [tabListCheckList, setTabListCheckList] = useState<TabList[]>(setting.tab_list);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  /** 체크시 이전 값 비교해서 state에 담거나, 제거 */
  const handleCheckboxChange = (id: TabList) => {
    setTabListCheckList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  /** DB에 저장되어 있는 값과 같을 경우 저장 버튼 비활성화 (다르면 활성화) */
  useEffect(() => {
    if (
      setting.tab_list.length === tabListCheckList.length &&
      setting.tab_list.every((item) => tabListCheckList.includes(item))
    ) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  }, [tabListCheckList]);

  /** 저장 버튼 클릭 시 DB 업데이트  */
  const useTabListMutate = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: patchTabList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.setting.setting });
      },
      onMutate: () => {
        setIsButtonEnabled(false);
      }
    });

    return mutate;
  };

  return { tabListCheckList, handleCheckboxChange, isButtonEnabled, useTabListMutate };
};
