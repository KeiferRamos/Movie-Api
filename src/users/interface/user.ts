export interface User {
  username: string;
  password: string;
  contactNumber: string;
  email: string;
  role: string;
  image: string;
  bio: string;
  address: {
    blockNumber: string;
    Street: string;
    Barangay: string;
    City: string;
    Province: string;
  };
  fullName: {
    firstName: string;
    lastName: string;
    middleName: string;
  };
}
