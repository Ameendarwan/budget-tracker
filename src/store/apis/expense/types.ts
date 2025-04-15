import { User } from '../user/types';

export interface Expense {
  id?: number;
  title: string;
  totalExpenditure?: number;
  price: number;
  date: string;
  userId?: User;
}

export type SortOption = 'date_desc' | 'date_asc' | 'price_desc' | 'price_asc';

export interface ExpenseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOption?: SortOption;
  sortOrder?: 'asc' | 'desc';
  sortDate?: string;
}

export interface ExpenseResponse {
  page: number;
  totalPages: number;
  total: number;
  expenses: Expense[];
}

export interface AnalysisResponse {
  month: string;
  total: number;
}
