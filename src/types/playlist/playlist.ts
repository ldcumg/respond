// supabase
export type PlayList = {
  id: number;
  user_id: string;
  is_main: boolean;
  track_name: string;
  artist_name: string;
  track_id: string;
  album_image: string;
  created_at: Date;
};
