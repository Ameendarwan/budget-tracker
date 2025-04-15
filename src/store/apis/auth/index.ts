import { ChangePasswordPayload, LoginPayload, LoginResponse, ResetPasswordPayload, SignUpPayload } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: [],
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, { body: LoginPayload }>({
      query: ({ body }) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation<void, { body: SignUpPayload }>({
      query: ({ body }) => ({
        url: `auth/signup`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, { body: ResetPasswordPayload }>({
      query: ({ body }) => ({
        url: `auth/reset-password`,
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<void, { body: ChangePasswordPayload }>({
      query: ({ body }) => ({
        url: `auth/change-password`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi;
