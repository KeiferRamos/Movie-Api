import * as mongoose from 'mongoose';

const StringSchema = {
  type: String,
  default: '',
};

export const Movie = new mongoose.Schema({
  title: StringSchema,
  year: StringSchema,
  image: {
    name: StringSchema,
    data: StringSchema,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  cast: [
    {
      name: StringSchema,
      asCharacter: StringSchema,
      image: {
        name: StringSchema,
        data: StringSchema,
      },
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
  similar: [StringSchema],
});
