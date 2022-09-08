import { api } from "../../services/api";

const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeamsSummary: build.query<any, void>({
      query: () => "teams/summary",
      providesTags: ["teams"],
    }),
    getOwnedTeams: build.query<any, void>({
      query: () => ({
        url: "owned/teams",
        method: "GET",
      }),
      providesTags: ["ownedTeams"],
    }),
    getMemberTeams: build.query<any, void>({
      query: () => ({
        url: "member/teams",
        method: "GET",
      }),
      providesTags: ["memberTeams"],
    }),
    listUsers: build.query<any, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createTeam: build.mutation({
      query: (data) => ({
        url: "teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teams", "ownedTeams"],
    }),
    addMembers: build.mutation({
      query: ({ teamId, data }) => ({
        url: `teams/${teamId}/invitations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teams", "ownedTeams"],
    }),
    removeMember: build.mutation({
      query: ({ teamId, memberId }) => ({
        url: `teams/${teamId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teams", "ownedTeams"],
    }),
    joinTeam: build.mutation({
      query: ({ teamId }) => ({
        url: `teams/${teamId}/join`,
        method: "PATCH",
      }),
      invalidatesTags: ["teams", "memberTeams", "invitedTeams"],
    }),
    getTeamInvitations: build.query<any, void>({
      query: () => ({
        url: `users/invitations/teams`,
        method: "GET",
      }),
      providesTags: ["invitedTeams"],
    }),
    getTeam: build.query({
      query: ({ id }) => `teams/${id}`,
    }),
    getUsers: build.query({
      query: ({ term }) => `search/users/${term}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamsSummaryQuery,
  useAddMembersMutation,
  useCreateTeamMutation,
  useGetMemberTeamsQuery,
  useGetOwnedTeamsQuery,
  useGetTeamInvitationsQuery,
  useJoinTeamMutation,
  useRemoveMemberMutation,
  useGetTeamQuery,
  useGetUsersQuery,
    useListUsersQuery,
    useLazyListUsersQuery
} = teamApi;
