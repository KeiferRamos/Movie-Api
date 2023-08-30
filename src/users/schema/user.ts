import * as mongoose from 'mongoose';

const StringSchema = {
  type: String,
  default: '',
};

export const User = new mongoose.Schema({
  username: StringSchema,
  password: StringSchema,
  contactNumber: StringSchema,
  email: StringSchema,
  role: {
    type: String,
    default: 'dev',
  },
  permissions: [String],
  activities: [
    {
      type: new mongoose.Schema(
        {
          method: String,
          model: String,
          id: String,
          summary: String,
        },
        { timestamps: true },
      ),
    },
  ],
});
