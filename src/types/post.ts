export type Post = {
  id: number;
  user_id: string;
  nickname: string;
  title: string;
  content: string;
  img_url?: string | null;
};

export type NewPost = Omit<Post, "id" | "img_url?">;

export type PostImage = {
  user_id: string;
  board_id: number;
  bucketData: {
    path: string;
    id: string;
    fullPath: string;
  };
};

export type ModifyPost = Pick<Post, "id" | "content">;
