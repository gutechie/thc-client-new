import { api } from "../../services/api";

const challengeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChallengesSummary: build.query<any, void>({
      query: () => ({
        url: "challenges/summary",
        method: "GET",
      }),
      providesTags: ["challenges"],
    }),
    getOwnedChallenges: build.query<any, void>({
      query: () => ({
        url: "owned/challenges",
        method: "GET",
      }),
      providesTags: ["ownedChallenges"],
    }),
    getMemberChallenges: build.query<any, void>({
      query: () => ({
        url: "member/challenges",
        method: "GET",
      }),
      providesTags: ["memberChallenges"],
    }),
    createChallenge: build.mutation({
      query: (data) => ({
        url: "challenges",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["challenges", "ownedChallenges"],
    }),
    addMembersToChallenge: build.mutation({
      query: ({ challengeId, data }) => ({
        url: `challenges/${challengeId}/invitations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["challenges", "ownedChallenges"],
    }),
    removeMemberFromChallenge: build.mutation({
      query: ({ challengeId, memberId }) => ({
        url: `challenges/${challengeId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["challenges", "ownedChallenges"],
    }),
    joinChallenge: build.mutation({
      query: ({ challengeId }) => ({
        url: `challenges/${challengeId}/join`,
        method: "PATCH",
      }),
      invalidatesTags: ["challenges", "memberChallenges", "invitedChallenges"],
    }),
    getChallengeInvitations: build.query<any, void>({
      query: () => ({
        url: `users/invitations/challenges`,
        method: "GET",
      }),
      providesTags: ["invitedChallenges"],
    }),
    getChallenge: build.query({
      query: ({ id }) => `challenges/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChallengesSummaryQuery,
  useAddMembersToChallengeMutation,
  useCreateChallengeMutation,
  useGetMemberChallengesQuery,
  useGetOwnedChallengesQuery,
  useGetChallengeInvitationsQuery,
  useJoinChallengeMutation,
  useRemoveMemberFromChallengeMutation,
  useGetChallengeQuery,
} = challengeApi;
