import { AnalysisResponse, Expense, ExpenseQueryParams, ExpenseResponse } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { InvalidatePoleDataParams } from '@app/store';
import { baseQuery } from '../../utils';
import { notificationApi } from '../notification';

const invalidateNotification = async ({ dispatch, queryFulfilled }: InvalidatePoleDataParams) => {
  try {
    await queryFulfilled;
    dispatch(notificationApi.util.invalidateTags([{ type: 'Notification' }]));
  } catch (err) {
    console.error('Failed to invalidate pole data', err);
  }
};

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['Expense'],
  endpoints: builder => ({
    getAllExpenses: builder.query<ExpenseResponse, ExpenseQueryParams>({
      query: ({
        page = 1,
        limit = 10,
        search = '',
        sortOption = 'date_desc',
        sortOrder = 'asc',
        sortDate = '2024-06-13',
      }) => ({
        url: `expense`,
        params: {
          page,
          limit,
          search,
          sortOption,
          sortOrder,
          sortDate,
        },
      }),
      providesTags: ['Expense'],
    }),

    getExpenseAnalysis: builder.query<AnalysisResponse[], { range: string }>({
      query: ({ range }) => ({
        url: `expense/analysis`,
        params: {
          range,
        },
      }),
    }),

    createExpense: builder.mutation<void, { body: Partial<Expense> }>({
      query: ({ body }) => ({
        url: `expense`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Expense'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),

    updateExpense: builder.mutation<void, { expenseId: string; body: Partial<Expense> }>({
      query: ({ expenseId, body }) => ({
        url: `expense/${expenseId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Expense'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),

    deleteExpense: builder.mutation<void, { expenseId: string }>({
      query: ({ expenseId }) => ({
        url: `expense/${expenseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpenseAnalysisQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
