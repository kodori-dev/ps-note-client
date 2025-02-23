import {
  CreateSolutionSchema,
  LoginRequestSchema,
  LoginSchema,
  MemberSchema,
  ProblemStarRequestSchema,
  SignupRequestSchema,
  SolutionSchema,
  UseCouponRequestSchema,
} from '../../../models';

export interface PostType {
  //auth
  '/auth/login': {
    req: LoginRequestSchema;
    res: LoginSchema;
  };
  '/auth/logout': {
    req: null;
    res: null;
  };
  '/auth/signup': {
    req: SignupRequestSchema;
    res: MemberSchema;
  };

  // problem star
  '/problem-stars': {
    req: ProblemStarRequestSchema;
    res: void;
  };

  // solution
  '/solutions': {
    req: CreateSolutionSchema;
    res: SolutionSchema;
  };

  //coupon
  '/coupons/use': {
    req: UseCouponRequestSchema;
    res: void;
  };

  //vacation
  '/vacations': {
    req: {
      memo: string;
      start_date: string;
      end_date: string;
    };
    res: any;
  };
}
