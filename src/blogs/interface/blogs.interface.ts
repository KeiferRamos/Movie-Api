export interface Blogs {
  title: string;
  bannerImage: string;
  contents: {
    htmlElement: string;
    value: string;
  }[];
  author: string;
  createdAt: string;
  updatedAt: string;
  trending: boolean;
}
