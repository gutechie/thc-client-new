import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Profile {
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

export interface Device {
  fitness_device_id?: string;
  scopes?: any;
  id_token?: string;
  token_type?: string;
  access_token?: string;
  refresh_token?: string;
  access_token_expiration_date?: any;
  token_additional_parameters?: any;
  authorize_additional_parameters?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  birthday: string;
  profile?: Profile;
  device?: Device
}
interface AuthState {
  authenticated: boolean;
  token?: string;
  user?: User;
}

const initialState: AuthState = {
  authenticated: false,
  token: null,
  user: {
    name: "Amit Kumar Dubey",
    id: "1",
    mobile: '8291835865',
    email: "guttume@gmail.com",
    birthday: '1986-09-15',
    device: {
      fitness_device_id: "1"
    }
  },
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
    setUserDevice: (state: AuthState, action: PayloadAction<Device>) => {
      state.user.device = action.payload;
    },
  },
});

export const { login, logout, setUserProfile, setUserDevice } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
