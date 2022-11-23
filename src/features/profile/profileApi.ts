import { api } from "../../services/api";

export interface UserProfile {}

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    addProfile: build.mutation({
      query: (profileData) => ({
        url: "profiles/create",
        method: "POST",
        body: profileData,
      }),
    }),
    updateProfile: build.mutation({
      query: (body) => ({
        url: `profiles/update`,
        method: "PATCH",
        body: body,
      }),
    }),
    connectDevice: build.mutation({
      query: (body) => ({
        url: `users/devices`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useAddProfileMutation,
  useUpdateProfileMutation,
  useConnectDeviceMutation,
} = profileApi;
