export type NewPost = {
  user_id: string;
  nickname: string;
  title: string;
  content: string;
};

export type Post = {
  id: number;
  user_id: string;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
};

export type ModifyPost = {
  postId: number;
  content: string;
};
