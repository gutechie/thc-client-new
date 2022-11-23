export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  points: number;
  teams_count: number;
  teams: Team[];
  challenges_count: number;
  challenges: Challenge[];
}

export interface Team {
  id: number;
  name: string;
  description: string;
  logo_file_name: string;
  logo_file_path: string;
  owner: User;
  users: User[];
  members: User[];
  users_count: number;
  pivot: UserTeam;
  user_status: InvitationStatus;
}

export interface Challenge {
  id: number;
  title: string;
  pivot: UserChallenge;
}

export interface UserChallenge {
  user_id: number;
  challenge_id: number;
  status: InvitationStatus;
}

export interface UserTeam {
  user_id: number;
  team_id: number;
  status: InvitationStatus;
}

export enum InvitationStatus {
  INVITED = "invited",
  JOINED = "joined",
  REMOVED = "removed",
}
