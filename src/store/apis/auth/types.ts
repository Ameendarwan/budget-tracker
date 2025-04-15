import { User } from '../user/types';

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  budgetLimit: number;
  confirmPassword: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  password: string;
  userId: string;
}
