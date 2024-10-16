"use client";
import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import queryKey from "@/queries/queryKey";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Follow = () => {
  const { hostUserId, loginUserId } = useGetUserIds();

  const router = useRouter();

  if (hostUserId === loginUserId) {
    return <></>;
  }

  const handleFollow = () => {};

  // console.log("hostUserId", hostUserId);

  return (
    <div>
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
};

export default Follow;
