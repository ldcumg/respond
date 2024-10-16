"use client";

import React from "react";
import SettingPrivacy from "./components/SettingPrivacy";
import { getSetting } from "./server-action/settingAction";
import { useQuery } from "@tanstack/react-query";
import { Setting } from "@/types/setting";
import queryKey from "@/queries/queryKey";
import SettingShowList from "./components/SettingShowList";
import SettingTabList from "./components/SettingTabList";
import { getLoginUserId } from "@/utils/supabase/user";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";

const testUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

const page = () => {
  const { userId: hostUserId } = useParams<{ userId: string }>();
  const router = useRouter();

  const { data: loginUserId } = useQuery<string | null>({
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

  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(hostUserId),
    enabled: !!loginUserId
  });

  if (!setting) {
    return <></>;
  }

  if (loginUserId !== hostUserId) {
    const href = `/${hostUserId}/`;
    router.replace(href);
  }

  return (
    <div>
      <SettingPrivacy setting={setting}></SettingPrivacy>
      <SettingShowList setting={setting}></SettingShowList>
      <SettingTabList setting={setting}></SettingTabList>
    </div>
  );
};

export default page;
