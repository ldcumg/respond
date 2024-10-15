"use client";
import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import queryKey from "@/queries/queryKey";
import { getFollow } from "@/server-action/followAction";
import { Follow } from "@/types/follow";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const FollowComponent = () => {
  // const { userId: hostUserId } = useParams<{ userId: string }>();
  const { hostUserId, loginUserId } = useGetUserIds();

  // if (!loginUserId) {
  //   return <></>;
  // }

  const { data: isFollowed } = useQuery<Follow | null>({
    queryKey: queryKey.follow(hostUserId, loginUserId),
    queryFn: () => getFollow({ toUserId: hostUserId, fromUserId: loginUserId }),
    enabled: !!loginUserId
  });
  // const router = useRouter();

  // console.log("isFollowed", isFollowed);

  if (hostUserId === loginUserId) {
    return <></>;
  }

  const handleFollow = () => {};

  console.log("hostUserId", hostUserId);

  return (
    <div>
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
};

export default FollowComponent;
