import * as mongoose from 'mongoose';

export const Genre = new mongoose.Schema({
  name: String,
  mobileImage: String,
  image: String,
  description: String,
  icon: String,
});
