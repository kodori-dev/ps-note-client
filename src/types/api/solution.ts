export interface PostSolReq {
  member: number;
  problem: number;
  comment: string;
  source_lang: string;
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
  source_lang: string;
  source_code: string;
  submitted_at: string;
  is_correct_answer: boolean;
}
