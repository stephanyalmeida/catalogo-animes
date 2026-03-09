export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string | null;
  score: number | null;
  episodes: number | null;

  streaming: {
    name: string;
    url: string;
  }[];
}

export interface JikanAnimeResponse {
  data: Anime[];
}