import { Setting, ShowList } from "@/types/setting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { patchShowList } from "../server-action/settingAction";
import queryKey from "@/queries/queryKey";

export const useSettingShowList = (setting: Setting) => {
  const [showListCheckList, setShowListCheckList] = useState<ShowList[]>(setting.show_list);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  /** 체크시 이전 값 비교해서 state에 담거나, 제거 */
  const handleCheckboxChange = (id: ShowList) => {
    setShowListCheckList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  /** DB에 저장되어 있는 값과 같을 경우 저장 버튼 비활성화 (다르면 활성화) */
  useEffect(() => {
    if (
      setting.show_list.length === showListCheckList.length &&
      setting.show_list.every((item) => showListCheckList.includes(item))
    ) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  }, [showListCheckList]);

  /** 저장 버튼 클릭 시 DB 업데이트  */
  const useShowListMutate = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: patchShowList,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.setting.setting });
      },
      onMutate: () => {
        setIsButtonEnabled(false);
      }
    });

    return mutate;
  };

  return { showListCheckList, handleCheckboxChange, isButtonEnabled, useShowListMutate };
};
