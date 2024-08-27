export type LevelType = 'unrated' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'ruby';

export interface TagType {
  id: number;
  name: string;
  boj_tag_id: string;
}
export interface ProblemType {
  id: number;
  name: string;
  boj_id: string;
  level: string;
  created_at: string;
  updated_at: string;
  is_solved: boolean;
  is_starred: boolean;
  stars: number;
  tags: TagType[];
  lebel: string;
  url: string;
}

export interface GetProblemsRes {
  count: number;
  next: string;
  previous: string;
  results: ProblemType[];
}

export interface GetProblemRes extends ProblemType {}
