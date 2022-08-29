import { api } from "../../services/api";
import { User } from "./authSlice";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
  device_name: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile_number: string;
  birth_date: string;
  password: string;
}

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (params) => ({
        url: "users/register",
        method: "POST",
        body: params,
      }),
    }),
    loginWithPassword: build.mutation<LoginResponse, LoginRequest>({
      query: (authBody) => ({
        url: "users/login",
        method: "POST",
        body: authBody,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginWithPasswordMutation, useRegisterUserMutation } =
  authApi;
