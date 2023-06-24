import * as mongoose from 'mongoose';

export const Activity = new mongoose.Schema(
  {
    type: String,
    summary: String,
    id: String,
    user: String,
    action: String,
  },
  { timestamps: true },
);
