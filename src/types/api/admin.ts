import { MemberSchema, PenaltySchema } from '../../../models';

export interface InternalPenaltyType {
  member: MemberSchema;
  penalties: PenaltySchema[];
  penalty_amount: string;
  is_deposit: boolean;
}

export interface AdminPageRes {
  start_date: string;
  end_date: string;
  member_penalties: InternalPenaltyType[];
}
