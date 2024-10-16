"use client";
import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import { useFollow } from "@/hooks/useFollow";
import React, { useEffect } from "react";

const FollowComponent = () => {
  const { hostUserId, loginUserId } = useGetUserIds();
  const { follow, isFollowed, useFollowPostMutate, useFollowDeleteMutate } = useFollow();
  const postMutate = useFollowPostMutate();
  const deleteMutate = useFollowDeleteMutate();

  if (hostUserId === loginUserId) {
    return <></>;
  }

  const followId = follow ? follow.id : 0;

  return (
    <>
      {!isFollowed && (
        <button onClick={() => postMutate({ toUserId: hostUserId, fromUserId: loginUserId })}>follow</button>
      )}
      {isFollowed && <button onClick={() => deleteMutate({ id: followId })}>unFollow</button>}
    </>
  );
};

export default FollowComponent;
