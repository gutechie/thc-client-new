import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Profile {
  app_id?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  birthday: string;
  profile?: Profile;
}
interface AuthState {
  authenticated: boolean;
  token?: string;
  user?: User;
}

const initialState: AuthState = {
  authenticated: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    logout: (state: AuthState) => {
      state.authenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
