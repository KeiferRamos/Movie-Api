export interface Movie {
  title: string;
  year: string;
  image: string;
  mobileImage: string;
  rank: {
    isRanked: boolean;
    rankNumber: number;
  };
  featured: boolean;
  trailer: string;
  cast: {
    name: string;
    asCharacter: string;
    image: string;
  }[];
  plot: string;
  genres: string[];
  similar: [
    {
      image: string;
      title: string;
    },
  ];
}
