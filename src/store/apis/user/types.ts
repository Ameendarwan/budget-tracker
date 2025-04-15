import { Role } from '@app/types';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;

  // Optional profile details (can be excluded from list view)
  fullName?: string;
  fatherName?: string;
  gender?: 'Male' | 'Female' | string;
  education?: string;
  streetAddress?: string;
  completeAddress?: string;
  dob?: string;
  zipCode?: string;
  budgetLimit?: number;
  city?: string;
  jobTitle?: string;
  aboutMe?: string;
  profilePic?: string;
  website?: string;
}

export interface UsersResponse {
  page: number;
  totalPages: number;
  total: number;
  users: User[];
}
export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}
