export const defaultMember = {
  id: -1,
  username: '',
  nickname: '',
  boj_id: '',
  is_active: true,
  is_off: false,
  created_at: '',
  updated_at: '',
  deleted_at: null,
};

export const defaultPenalty = {
  id: -1,
  day: '',
  amount: '',
  is_penalty: false,
  manually_edited: false,
  member: defaultMember,
  admitted_solutions: [],
  not_admitted_solutions: [],
  coupons: [],
};
