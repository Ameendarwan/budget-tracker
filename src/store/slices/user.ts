import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../apis/user/types';

interface UserState {
  userDetails: User;
}

const initialState: UserState = {
  userDetails: JSON.parse(localStorage.getItem('user-details') || '{}') as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<User>) {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export const userReducer = userSlice.reducer;
