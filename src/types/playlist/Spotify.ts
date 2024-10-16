export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist;
  id: string;
  name: string;
  uri: string;
};

export type SpotifyAlbum = {
  // artists: SpotifyArtist[];
  id: string;
  images: SpotifyAlbumImage[];
  name: string;
  total_tracks: number;
};

export type SpotifyArtist = {
  0: {
    id: string;
    name: string;
  };
};

export type SpotifyAlbumImage = {
  url: string;
  width: number;
  height: number;
};
