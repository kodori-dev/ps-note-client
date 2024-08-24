interface User {
  id: number;
  username: string;
  nickname: string;
  boj_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PostSignUpReq {
  username: string;
  password: string;
  nickname: string;
  boj_id: string;
}

export interface PostSignUpRes extends User {}

export interface PostLoginReq {
  username: string;
  password: string;
}

export type GetMembersRes = User[];

export interface GetMemberForIdRes extends User {}
