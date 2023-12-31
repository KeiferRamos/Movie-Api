import mongoose from 'mongoose';

export const Blogs = new mongoose.Schema(
  {
    title: String,
    bannerImage: String,
    contents: [{ htmlElement: String, value: String }],
    author: String,
    trending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
