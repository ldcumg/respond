export type Post = {
  id: number;
  user_id: string;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
};

export type NewPost = Omit<Post, "id" | "created_at">;

export type ModifyPost = Pick<Post, "id" | "content">;
