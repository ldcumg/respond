"use client"
import queryKey from '@/queries/queryKey';
import { getLoginUserId } from '@/utils/supabase/user';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const Follow = () => {
  const {userId:hostUserId} = useParams<{ userId:string; }>();
  const { data: loginUserId } = useQuery<string | undefined>({
    queryKey: queryKey.auth.loginUser,
    queryFn: () => getLoginUserId()
  });
  const router = useRouter()

  if(hostUserId === loginUserId){
    return <></>
  }



  console.log('hostUserId', hostUserId);

  return (
    <div>Follow</div>
  )
}

export default Follow