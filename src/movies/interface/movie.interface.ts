export interface Movie {
  title: string;
  year: string;
  image: string;
  mobileImage: string;
  likes: string[];
  rank: number;
  reviews: {
    username: string;
    userImage: string;
    review: string;
    userId: string;
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
  similar: {
    image: string;
    featured: {
      type: boolean;
      default: false;
    };
    year: number;
    mobileImage: string;
    likes: string[];
    title: string;
    movieId: string;
    genres: string[];
    rank: number;
  }[];
}
