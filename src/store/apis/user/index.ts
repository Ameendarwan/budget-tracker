import { User, UsersQueryParams, UsersResponse } from './types';
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

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['User'],
  endpoints: builder => ({
    getAllUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: ({ page = 1, limit = 10, search = '', sortField = 'createdAt', sortOrder = 'asc' }) => ({
        url: `user`,
        params: {
          page,
          limit,
          search,
          sortField,
          sortOrder,
        },
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query<User, { userId: string }>({
      query: ({ userId }) => ({
        url: `user/${userId}`,
      }),
      providesTags: ['User'],
    }),

    createUser: builder.mutation<void, { body: Partial<User> }>({
      query: ({ body }) => ({
        url: `user`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),

    uploadProfilePicture: builder.mutation<void, { body: FormData }>({
      query: ({ body }) => ({
        url: `user/upload-profile-pic`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),

    updateUser: builder.mutation<void, { userId: string; body: Partial<User> }>({
      query: ({ userId, body }) => ({
        url: `user/${userId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),

    deleteUser: builder.mutation<void, { userId: string }>({
      query: ({ userId }) => ({
        url: `user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
      onQueryStarted(args, api) {
        invalidateNotification(api);
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUploadProfilePictureMutation,
  useDeleteUserMutation,
} = userApi;
