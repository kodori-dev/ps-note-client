export type LevelType = 'unrated' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'ruby';

export interface Problem {
  id: number;
  name: string;
  boj_id: string;
  level: string;
  created_at: string;
  updated_at: string;
  is_solved: boolean;
  is_starred: boolean;
  stars: number;
}

export interface GetProblemsRes {
  count: number;
  next: string;
  previous: string;
  results: Problem[];
}
