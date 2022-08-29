import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Profile {
  app_id?: string;
  gender?: string;
  height?: string;
  weight?: string;
  fitness_club?: string;
  company_name?: string;
  department?: string;
  building_society?: string;
  pin_code?: string;
  city?: string;
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
    setUserProfile: (state: AuthState, action: PayloadAction<Profile>) => {
      state.user.profile = action.payload;
    },
    setAppId: (state: AuthState, action: PayloadAction<string>) => {
      state.user.profile.app_id = action.payload;
    },
  },
});

export const { login, logout, setUserProfile, setAppId } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
