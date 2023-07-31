export interface Movie {
  title: string;
  year: string;
  image: string;
  mobileImage: string;
  likes: string[];
  rank: {
    isRanked: boolean;
    rankNumber: number;
  };
  reviews: {
    username: string;
    userImage: string;
    review: string;
    title: string;
  }[];
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
