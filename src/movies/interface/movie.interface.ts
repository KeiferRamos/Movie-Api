export interface Movie {
  title: string;
  year: string;
  image: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
  };
  rank: {
    isRanked: boolean;
    rankNumber: number;
  };
  featured: boolean;
  cast: {
    name: string;
    asCharacter: string;
    image: {
      originalname: string;
      buffer: Buffer;
      mimetype: string;
    };
  }[];
  plot: string;
  genres: string[];
  similar: string[];
}
