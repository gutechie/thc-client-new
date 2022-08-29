import { api } from "../../services/api";

export interface UserProfile {

}

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    addProfile: build.mutation({
      query: (profileData) => ({
        url: "profiles/create",
        method: "POST",
        body: profileData,
      }),
    }),
    updateApp: build.mutation({
      query: (body) => ({
        url: `profiles/update`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const { useAddProfileMutation, useUpdateAppMutation } = profileApi;
