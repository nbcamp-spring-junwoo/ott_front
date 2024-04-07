import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLogin = true;

      return state;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;

      return state;
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';
      state.isLogin = false;

      return state;
    },
  },
});

export type UserSliceType = {
  username: string;
  token: string;
  isLogin: boolean;
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
