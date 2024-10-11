export type Setting = {
  id:number;
  user_id:string;
  theme_name:string;
  show_list:string[];
  tab_list:string[];
  privacy_type: PrivacyType;
  created_at:Date;
}

export type PrivacyType = keyof typeof PRIVACY_TYPE;

export enum PRIVACY_TYPE {
  public = "public",
followers = "followers",
mutualFollowers = "mutualFollowers",
private = "private",
}