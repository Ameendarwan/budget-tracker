import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BudgetTrend } from './types';
import { baseQuery } from '../../utils';

export const analysisApi = createApi({
  reducerPath: 'analysisApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['Analysis'],
  endpoints: builder => ({
    getAnalysis: builder.query<BudgetTrend[], { range: string }>({
      query: ({ range }) => ({
        url: `analysis/${range}`,
      }),
      providesTags: ['Analysis'],
    }),
  }),
});

export const { useGetAnalysisQuery } = analysisApi;
