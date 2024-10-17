"use client";
import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import { useFollow } from "@/hooks/useFollow";
import React, { useEffect } from "react";
import { UserRoundX, UserPlus } from "lucide-react";

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
        <button
          className="flex cursor-pointer items-center justify-center gap-[5px] overflow-hidden rounded-full border-[4px] border-black bg-[#fff] px-[10px] py-[5px] text-[18px] font-bold"
          onClick={() => postMutate({ toUserId: hostUserId, fromUserId: loginUserId })}>
          <UserPlus size={18} color="#000000" strokeWidth={3} />
          Follow
        </button>
      )}
      {isFollowed && (
        <button
          className="flex cursor-pointer items-center justify-center gap-[5px] overflow-hidden rounded-full border-[4px] border-black bg-[#000] px-[10px] py-[5px] text-[18px] font-bold text-[#fff]"
          onClick={() => deleteMutate({ id: followId })}>
          <UserRoundX size={18} color="#fff" strokeWidth={3} />
          Unfollow
        </button>
      )}
    </>
  );
};

export default FollowComponent;
