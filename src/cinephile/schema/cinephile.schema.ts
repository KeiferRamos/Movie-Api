import mongoose from 'mongoose';

export const CinephileSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  likes: [String],
  userImage: String,
  bookmark: [
    {
      title: String,
      image: String,
      genres: [String],
      movieId: String,
      year: Number,
    },
  ],
});
