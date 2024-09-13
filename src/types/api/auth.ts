export interface UserType {
  id: number;
  username: string | null;
  nickname: string;
  boj_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_active: boolean;
  is_off: boolean;
}

export interface PostSignUpReq {
  username: string;
  password: string;
  nickname: string;
  boj_id: string;
}

export interface PostSignUpRes extends UserType {}

export interface PostLoginReq {
  username: string;
  password: string;
}

export type GetMembersRes = UserType[];

export interface GetMemberForIdRes extends UserType {}

export interface PatchMembersReq {
  username: string;
  password: string;
  nickname: string;
  boj_id: string;
  is_active: boolean;
  is_off: boolean;
}

export interface PatchMembersRes extends PatchMembersReq {
  id: number;
}
