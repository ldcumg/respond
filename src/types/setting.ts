export type Setting = {
  id: number;
  user_id: string;
  theme_name: string;
  show_list: ShowList[];
  tab_list: TabList[];
  privacy_type: PrivacyType;
  created_at: Date;
};

export type PrivacyType = keyof typeof PRIVACY_TYPE;
export type ShowList = keyof typeof SHOW_LIST;
export type TabList = keyof typeof TAB_LIST;

export enum PRIVACY_TYPE {
  public = "public",
  followers = "followers",
  mutualFollowers = "mutualFollowers",
  private = "private"
}

/** SHOW_LIST, TAB_LIST의 내용이 같지만 각각 선언했습니다.
 * 나중에 내용이 달라질 수 있고, 알아보기 편할 것 같아서입니다.
 */
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

export enum TAB_LIST {
  board = "board",
  playlist = "playlist",
  schedule = "schedule",
  chat = "chat"
}

export const tabListKr = {
  [TAB_LIST.board]: "게시판",
  [TAB_LIST.playlist]: "플레이리스트",
  [TAB_LIST.schedule]: "스케줄",
  [TAB_LIST.chat]: "채팅"
};
