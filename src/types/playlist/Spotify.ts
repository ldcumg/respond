export type SpotifyTrack = {
  album: SpotifyAlbum[];
  artists: SpotifyArtist[];
  id: string;
  name: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  href: string;
  id: string;
  images: SpotifyAlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
};

export type SpotifyArtist = {
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

export type SpotifyAlbumImage = {
  url: string;
  width: number;
  height: number;
};
