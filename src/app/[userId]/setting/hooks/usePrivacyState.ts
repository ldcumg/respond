import queryKey from "@/queries/queryKey";
import { Follow } from "@/types/follow";
import { PRIVACY_TYPE, Setting } from "@/types/setting";
import { useQuery } from "@tanstack/react-query";
import { useGetUserIds } from "@/app/[userId]/setting/hooks/useGetUserIds";
import { getFollow } from "@/server-action/followAction";

/** 공개 범위설정에 따른 공개 여부 (false가 반환되면 보이지 않음) */
const usePrivacyState = (setting: Setting | undefined): boolean => {
  const { hostUserId, loginUserId } = useGetUserIds();

  // 접속자(로그인유저)가 호스트 팔로우

  console.log("loginUserId", loginUserId);
  console.log("hostUserId", hostUserId);
  const { data: loginToHostFollow } = useQuery<Follow | null>({
    queryKey: queryKey.follow(hostUserId, loginUserId),
    queryFn: () => getFollow({ toUserId: hostUserId, fromUserId: loginUserId }),
    enabled: !!loginUserId
  });

  // 호스트가 접속자 팔로우
  const { data: hostToLoginFollow } = useQuery<Follow | null>({
    queryKey: queryKey.follow(loginUserId, hostUserId),
    queryFn: () => getFollow({ toUserId: loginUserId, fromUserId: hostUserId }),
    enabled: !!loginUserId
  });

  if (!setting) {
    return false;
  }

  const privacyType = setting.privacy_type;
  const isFollower = !!loginToHostFollow;
  const isMutualFollower = !!loginToHostFollow && !!hostToLoginFollow;

  console.log("privacyType", privacyType);
  console.log("isFollower", isFollower);
  console.log("isMutualFollower", isMutualFollower);
  // debugger;

  // 공개 범위가 private
  if (privacyType === PRIVACY_TYPE.private) {
    return false;
  } else if (privacyType === PRIVACY_TYPE.followers) {
    return isFollower;
  } else if (privacyType === PRIVACY_TYPE.mutualFollowers) {
    return isMutualFollower;
  }

  return true;
};

export default usePrivacyState;
