import { MemberSchema, SolutionSchema, UpdateSolutionSchema, UserUpdateMemberSchema } from '../../../models';

export interface PatchType {
  //member
  [key: `/members/${string}`]: {
    req: UserUpdateMemberSchema;
    res: MemberSchema;
  };

  //solution
  [key: `/solutions/${string}`]: {
    req: UpdateSolutionSchema;
    res: SolutionSchema;
  };
}
