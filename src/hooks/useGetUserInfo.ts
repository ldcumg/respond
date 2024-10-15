import queryKey from "@/queries/queryKey";
import browserClient from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  const { data: userInfo } = useQuery<User | null>({
    queryKey: queryKey.auth.loginUser,
    queryFn: async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession();

      if (session) {
        const userInfo = session.user; // 사용자 정보 가져오기
        return userInfo;
      }
      return null;
    },
    staleTime: 0
  });

  return userInfo;
};
