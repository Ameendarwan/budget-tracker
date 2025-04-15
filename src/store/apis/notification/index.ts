import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Notification } from './types';
import { baseQuery } from '../../utils';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['Notification'],
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], { userId: string }>({
      query: ({ userId }) => ({
        url: `notification/${userId}`,
      }),
      providesTags: ['Notification'],
    }),

    createUser: builder.mutation<void, { body: Notification }>({
      query: ({ body }) => ({
        url: `notification`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationsQuery, useCreateUserMutation } = notificationApi;
