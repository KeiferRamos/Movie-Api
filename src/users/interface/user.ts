export interface User {
  firstName: string;
  lastName: string;
  password: string;
  contactNumber: string;
  email: string;
  role: string;
  image: string;
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
