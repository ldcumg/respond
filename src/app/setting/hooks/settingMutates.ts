import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPrivacy } from "../server-action/settingAction";
import queryKey from "@/queries/queryKey";

const usePatchPrivacy = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: patchPrivacy,
    onSuccess: () => {
      alert("성공"), queryClient.invalidateQueries({ queryKey: queryKey.setting.setting });
    }
  });

  return mutate;
  // try {
  //   patchPrivacy({ userId, privacyType });
  //   handlePrivacySelectedChange(privacyType);
  // } catch (e) {
  //   console.error(e);
  // }
};

export { usePatchPrivacy };
