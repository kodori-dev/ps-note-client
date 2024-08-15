export interface PostSignUpReq {
  username: string;
  password: string;
  nickname: string;
  boj_id: string;
}

export interface PostSignUpRes {
  id: number;
  username: string;
  nickname: string;
  boj_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PostLoginReq {
  username: string;
  password: string;
}
