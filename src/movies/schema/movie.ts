import * as mongoose from 'mongoose';

const StringSchema = {
  type: String,
  default: '',
};

export const Movie = new mongoose.Schema({
  title: StringSchema,
  year: Number,
  image: StringSchema,
  mobileImage: StringSchema,
  trailer: StringSchema,
  featured: {
    type: Boolean,
    default: false,
  },
  likes: [String],
  reviews: [
    {
      type: new mongoose.Schema(
        {
          username: String,
          userImage: String,
          userId: String,
          review: String,
        },
        { timestamps: true },
      ),
    },
  ],
  cast: [
    {
      name: StringSchema,
      asCharacter: StringSchema,
      image: StringSchema,
    },
  ],
  rank: {
    isRanked: {
      type: Boolean,
      default: false,
    },
    rankNumber: {
      type: Number,
      default: 0,
    },
  },
  genres: [StringSchema],
  plot: StringSchema,
  similar: [
    {
      image: StringSchema,
      featured: {
        type: Boolean,
        default: false,
      },
      year: Number,
      mobileImage: StringSchema,
      likes: [String],
      title: StringSchema,
      movieId: StringSchema,
      genres: [StringSchema],
      rank: {
        isRanked: {
          type: Boolean,
          default: false,
        },
        rankNumber: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
});
