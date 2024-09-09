import { UserType } from './auth';
import { ProblemType } from './problem';

export type LanguageType = 'c' | 'c++' | 'python' | 'java' | 'javascript' | 'kotlin' | 'rust';

export interface SolutionType {
  id: number;
  member: UserType;
  problem: ProblemType;
  comment: string;
  source_lang: LanguageType;
  source_code: string;
  is_correct_answer: boolean;
  submitted_at: string;
  imported_from_notion: boolean;
  is_fully_parsed: boolean;
  notion_page_id: string;
  is_boj_verified: boolean | null;
  boj_solution_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_label: string;
  score_label: string;
}

export interface PostSolReq {
  member: number;
  problem: number;
  comment: string;
  source_lang: LanguageType;
  source_code: string;
  submitted_at: string;
  star: boolean;
  is_correct_answer: boolean;
}

export interface PostSolRes {
  id: number;
  member: number;
  problem: number;
  comment: string;
  source_lang: LanguageType;
  source_code: string;
  submitted_at: string;
  is_correct_answer: boolean;
}

export interface GetSolsRes {
  count: number;
  next: null | string;
  previous: null | string;
  results: SolutionType[];
}
