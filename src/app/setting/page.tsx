import React from "react";
import SettingPrivacy from "./components/SettingPrivacy";
import { createClient } from "@/utils/supabase/server";
import { Setting } from "@/types/setting";

const page = async () => {
  const supabase = createClient();
  const { data: setting, error: isSettingError } = await supabase
    .from("setting")
    .select()
    .eq("user_id", "588a4dea-b95a-4836-b6bc-10dbafa4a81f");

  if (isSettingError) {
    return <></>;
  }

  console.log("data", setting);
  return (
    <div>
      <SettingPrivacy setting={setting}></SettingPrivacy>
    </div>
  );
};

export default page;
