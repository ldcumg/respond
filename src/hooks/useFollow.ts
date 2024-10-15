import queryKey from "@/queries/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useFollow = () => {
  const [isFollowEnabled, setIsFollowEnabled] = useState(true);
  const b = 1;

  const useToggleFollowMutate = () => {
    // const queryClient = useQueryClient();
    // const { mutate } = useMutation({
    //   mutationFn: patchShowList,
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: queryKey.follow });
    //   },
    //   onMutate: () => {
    //     setIsButtonEnabled(false);
    //   }
    // });
  };
};
