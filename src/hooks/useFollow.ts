import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import queryKey from "@/queries/queryKey";
import { deleteFollow, getFollow, postFollow } from "@/server-action/followAction";
import { Follow } from "@/types/follow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFollow = () => {
  const { hostUserId, loginUserId } = useGetUserIds();
  const { data: follow } = useQuery<Follow | null>({
    queryKey: queryKey.follow(hostUserId, loginUserId),
    queryFn: () => getFollow({ toUserId: hostUserId, fromUserId: loginUserId }),
    enabled: !!loginUserId
  });
  const [isFollowed, setIsFollowed] = useState(!!follow);

  useEffect(() => {
    setIsFollowed(!!follow);
  }, [follow]);

  const useFollowPostMutate = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: postFollow,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.follow(hostUserId, loginUserId) });
      },
      onMutate: () => {
        setIsFollowed(true);
      }
    });

    return mutate;
  };

  const useFollowDeleteMutate = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: deleteFollow,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKey.follow(hostUserId, loginUserId) });
      },
      onMutate: () => {
        setIsFollowed(false);
      }
    });
    return mutate;
  };

  return { follow, isFollowed, useFollowPostMutate, useFollowDeleteMutate };
};
