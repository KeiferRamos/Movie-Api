export interface User {
  username: string;
  password: string;
  contactNumber: string;
  email: string;
  role: string;
  permissions: string[];
  activities: {
    method: string;
    model: string;
    id: string;
    summary: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
