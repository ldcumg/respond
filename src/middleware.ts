import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useGetUserIds } from "./app/[userId]/setting/hooks/useGetUserIds";
import { createClient } from "./utils/supabase/server";
import { getSetting } from "./app/[userId]/setting/server-action/settingAction";
import { PRIVACY_TYPE, Setting, TAB_LIST } from "./types/setting";
import { getFollow } from "./server-action/followAction";

async function getLoginUserId() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log("getLoginUserId user", user);

  return user?.id;
}

async function getHasAccessToPrivacyTab(setting: Setting, hostUserId: string, loginUserId: string) {
  const [loginToHostFollow, hostToLoginFollow] = await Promise.all([
    getFollow({ toUserId: hostUserId, fromUserId: loginUserId }),
    getFollow({ toUserId: loginUserId, fromUserId: hostUserId })
  ]);

  const privacyType = setting.privacy_type;
  const isFollower = !!loginToHostFollow;
  const isMutualFollower = !!loginToHostFollow && !!hostToLoginFollow;

  // 공개 범위가 private
  if (privacyType === PRIVACY_TYPE.private) {
    return false;
  } else if (privacyType === PRIVACY_TYPE.followers) {
    return isFollower;
  } else if (privacyType === PRIVACY_TYPE.mutualFollowers) {
    return isMutualFollower;
  }
  return true;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const [_, hostUserId, menu, invalidPage] = pathname.split("/");

  const [loginUserId, setting] = await Promise.all([getLoginUserId(), getSetting(hostUserId)]);

  console.log("middleware loginUserId", loginUserId);

  if (!loginUserId) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  const hasAccessToPrivacyTab = await getHasAccessToPrivacyTab(setting, hostUserId, loginUserId);

  // 로그인 안한 사람이 페이지에 접근하려하면 login으로 보냄

  // 이상한 경로로 접근한 경우 /{userId}/{tab}/{이후URL}
  if (!!invalidPage) {
    // return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
  }

  // 경로에 menu가 있는 경우
  if (!!menu) {
    // 로그인 유저 !== 페이지 주인
    if (hostUserId !== loginUserId) {
      // 공개범위 권한 없는놈은 아무 탭도 못들어감
      if (!hasAccessToPrivacyTab) {
        return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
      }

      // 탭 목록(설정)에 없는 탭 들어가려하는놈 퇴치
      const tabList = setting.tab_list as string[];
      if (!tabList.includes(menu)) {
        return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
      }
    } else {
      console.log("pathname", pathname);
      // 하지만 주인에 한해서 모든 탭에 접근 가능 (단 TAB_LIST[] + setting만)
      const tabList = Object.values(TAB_LIST) as string[];
      tabList.push("setting"); // TAB_LIST에 setting 안들어가있음
      // 존재하지 않는 탭 목록에 들어가려하는 놈 퇴치 (setting/playlist/board/chat 제외한 나머지)
      if (!tabList.includes(menu)) {
        return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(/.*)?"]
  // matcher: ["/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(/.*)?"] // uuid 정규식 (/{userId}/*)
};
