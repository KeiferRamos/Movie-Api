export interface Cinephile {
  username: string;
  password: string;
  email: string;
  likes: string[];
  userImage: string;
  bookmark: {
    title: string;
    image: string;
    genres: string[];
    movieId: string;
    year: number;
  }[];
}
