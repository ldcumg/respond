"use client";

import React from "react";
import SettingPrivacy from "./components/SettingPrivacy";
import { getSetting } from "./server-action/settingAction";
import { useQuery } from "@tanstack/react-query";
import { Setting } from "@/types/setting";
import queryKey from "@/queries/queryKey";

const testUserId = "588a4dea-b95a-4836-b6bc-10dbafa4a81f";

// initialData:{
//   id:0,
//   user_id:"",
//   theme_name:"",
//   show_list:[],
//   tab_list:[],
//   privacy_type: "public",
//   created_at:null,
// }

const page = () => {
  const { data: setting } = useQuery<Setting>({
    queryKey: queryKey.setting.setting,
    queryFn: () => getSetting(testUserId)
  });

  if (!setting) {
    return <></>;
  }

  return (
    <div>
      <SettingPrivacy setting={setting}></SettingPrivacy>
    </div>
  );
};

export default page;
