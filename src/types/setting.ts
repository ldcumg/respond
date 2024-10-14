export type Setting = {
  id: number;
  user_id: string;
  theme_name: string;
  show_list: ShowList[];
  tab_list: string[];
  privacy_type: PrivacyType;
  created_at: Date;
};

export type PrivacyType = keyof typeof PRIVACY_TYPE;
export type ShowList = keyof typeof SHOW_LIST;

export enum PRIVACY_TYPE {
  public = "public",
  followers = "followers",
  mutualFollowers = "mutualFollowers",
  private = "private"
}

export enum SHOW_LIST {
  board = "board",
  playlist = "playlist",
  schedule = "schedule",
  chat = "chat"
}

export const showListKr = {
  [SHOW_LIST.board]: "게시판",
  [SHOW_LIST.playlist]: "플레이리스트",
  [SHOW_LIST.schedule]: "스케줄",
  [SHOW_LIST.chat]: "채팅"
};
