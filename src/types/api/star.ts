import { User } from './auth';
import { Problem } from './problem';

export interface PostStarReq {
  problem: number;
  member: number;
}

export interface StarType {
  id: number;
  problem: Problem;
  member: User;
  created_at: string;
  updated_at: string;
}

export type GetStarsRes = StarType[];
