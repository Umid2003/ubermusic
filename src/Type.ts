export type SongsProps = {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  active: boolean;
};
export type CurrentSongProps = {
  name: string;
  cover: string;
  artist: string;
  audio: string;
};

export type SongInfoProps = {
  current: number | undefined;
  duration: number | undefined;
};
