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
  image: StringSchema,
  bio: String,
  role: {
    type: String,
    default: 'developer',
  },
  address: {
    blockNumber: StringSchema,
    Street: StringSchema,
    Barangay: StringSchema,
    City: StringSchema,
    Province: StringSchema,
  },
  fullName: {
    firstName: StringSchema,
    lastName: StringSchema,
    middleName: StringSchema,
  },
  permissions: [String],
});
