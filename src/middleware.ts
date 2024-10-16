import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useGetUserIds } from "./app/[userId]/setting/hooks/useGetUserIds";
import { createClient } from "./utils/supabase/server";
import { getSetting } from "./app/[userId]/setting/server-action/settingAction";
import { TAB_LIST } from "./types/setting";

async function getLoginUserId() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user?.id;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const [_, hostUserId, menu, invalidPage] = pathname.split("/");

  const [loginUserId, setting] = await Promise.all([getLoginUserId(), getSetting(hostUserId)]);

  // 로그인 안한 사람이 페이지에 접근하려하면 login으로 보냄
  if (!loginUserId) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  // 이상한 경로로 접근한 경우 /{userId}/{tab}/{이후URL}
  if (!!invalidPage) {
    console.log("invalidPage invalidPage invalidPage invalidPage", invalidPage);
    return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
  }

  // 경로에 menu가 있는 경우
  if (!!menu) {
    // 로그인 유저 !== 페이지 주인
    if (hostUserId !== loginUserId) {
      const tabList = setting.tab_list as string[];

      // 탭 목록(설정)에 없는 탭 들어가려하는놈 퇴치
      if (!tabList.includes(menu)) {
        return NextResponse.redirect(new URL(`/${hostUserId}`, request.url));
      }
    } else {
      const tabList = Object.values(TAB_LIST) as string[];
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
