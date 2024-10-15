import queryKey from "@/queries/queryKey";
import browserClient from "@/utils/supabase/client";
import { getLoginUserId } from "@/utils/supabase/user";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useGetUserIds = () => {
  const {userId:hostUserId} = useParams<{ userId:string; }>();
  
  const { data: loginUserId } = useQuery<string | null>({
    queryKey: queryKey.auth.loginUser,
    queryFn: async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession();

      if(session){

        const userInfo = session.user; // 사용자 정보 가져오기
        const { id } = userInfo;
        return id;
      }
      return null
    },
    staleTime:0
  });

  return{hostUserId, loginUserId};
  
}