import queryKey from "@/queries/queryKey";
import browserClient from "@/utils/supabase/client";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetUserIds = () => {
  const { userId: hostUserId } = useParams<{ userId: string }>();
  const [loginUserId, setLoginUserId] = useState<string | null | undefined>("");

  const { data: loginUserIdQuery } = useQuery<string | null>({
    queryKey: queryKey.auth.loginUser,
    queryFn: async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession();

      if (session) {
        const userInfo = session.user; // 사용자 정보 가져오기
        const { id } = userInfo;
        return id;
      }
      return null;
    },

    staleTime: 0
  });

  const a = 1;

  useEffect(() => {
    setLoginUserId(loginUserIdQuery);
  }, [loginUserIdQuery]);

  return { hostUserId, loginUserId };
};
