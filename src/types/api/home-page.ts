import { MemberSchema, PenaltySchema, ProblemSchema } from '../../../models';
export interface HomePageRes {
  members: MemberSchema[];
  today_problems: ProblemSchema[];
  current_week_starred_problems: ProblemSchema[];
  penalties: PenaltySchema[];
  penalty_map: {
    [k: string]: PenaltySchema[];
  };
}
