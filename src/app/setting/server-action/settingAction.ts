"use server";
import { createClient } from "@/utils/supabase/server";
import { PrivacyType, Setting, ShowList } from "@/types/setting";
const supabase = createClient();

const getSetting = async (userId: string) => {
  const { data: setting, error: isSettingError } = await supabase
    .from("setting")
    .select()
    .eq("user_id", userId)
    .returns<Setting[]>();

  if (isSettingError) {
    throw new Error("setting select Error");
  }

  return setting[0];
};

const patchPrivacy = async ({ userId, privacyType }: { userId: string; privacyType: PrivacyType }) => {
  const { error } = await supabase.from("setting").update({ privacy_type: privacyType }).eq("user_id", userId);

  if (error) {
    throw new Error("privacy_type update Error");
  }
};

const patchShowList = async ({ userId, showList }: { userId: string; showList: ShowList[] }) => {
  const { error } = await supabase.from("setting").update({ show_list: showList }).eq("user_id", userId);

  if (error) {
    throw new Error("show_list update Error");
  }
};

export { getSetting, patchPrivacy, patchShowList };
