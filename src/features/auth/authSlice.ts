import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface User {
  name: string;
  email: string;
  profileCreated: boolean;
  fitnessDeviceAttached: boolean;
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
    authProfileCreated: (state: AuthState) => {
      state.user.profileCreated = true;
    },
  },
});

export const { login, logout, authProfileCreated } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
