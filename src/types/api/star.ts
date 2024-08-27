import { UserType } from './auth';
import { ProblemType } from './problem';

export interface StarType {
  id: number;
  problem: ProblemType;
  member: UserType;
  created_at: string;
  updated_at: string;
}

export interface PostStarReq {
  problem: number;
  member: number;
}

export type GetStarsRes = StarType[];
