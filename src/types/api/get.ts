import {
  CouponSchema,
  HolidaySchema,
  MemberSchema,
  PaginatedProblemSchema,
  PaginatedSolutionSchema,
  PenaltySchema,
  ProblemSchema,
  PsNoteServerAppsCoreViewsV2CouponGetRequest,
  PsNoteServerAppsCoreViewsV2HolidayGetRequest,
  PsNoteServerAppsCoreViewsV2MemberGetRequest,
  PsNoteServerAppsCoreViewsV2PenaltyGetRequest,
  PsNoteServerAppsCoreViewsV2ProblemGetRequest,
  PsNoteServerAppsCoreViewsV2ProblemSearchProblemsRequest,
  PsNoteServerAppsCoreViewsV2SolutionGetRequest,
  SolutionSchema,
} from "../../../models";

export interface VacationSchema {
  id: number;
  member: MemberSchema;
  start_date: string;
  end_date: string;
  memo: string;
}

interface BodyGetType {
  req: void;
}

interface BaseGetType {
  //auth
  "/me": {
    res: MemberSchema;
    query: undefined;
  };

  //member
  "/members": {
    res: MemberSchema[];
    query: PsNoteServerAppsCoreViewsV2MemberGetRequest;
  };
  [key: `/members/${string}`]: {
    res: MemberSchema;
    query: undefined;
  };

  //problem
  "/problems": {
    res: PaginatedProblemSchema;
    query: PsNoteServerAppsCoreViewsV2ProblemGetRequest;
  };
  [key: `/problems/${number}`]: {
    res: ProblemSchema;
    query: undefined;
  };
  "/problems/search": {
    res: PaginatedProblemSchema;
    query: PsNoteServerAppsCoreViewsV2ProblemSearchProblemsRequest;
  };

  //penalty
  "/penalties": {
    res: PenaltySchema[];
    query: PsNoteServerAppsCoreViewsV2PenaltyGetRequest;
  };

  //solution
  [key: `/solutions/${string}`]: {
    res: SolutionSchema;
    query: undefined;
  };
  "/solutions": {
    res: PaginatedSolutionSchema;
    query: PsNoteServerAppsCoreViewsV2SolutionGetRequest;
  };

  //coupon
  "/coupons": {
    res: CouponSchema[];
    query: PsNoteServerAppsCoreViewsV2CouponGetRequest;
  };

  //holiday
  "/holidays": {
    res: HolidaySchema[];
    query: PsNoteServerAppsCoreViewsV2HolidayGetRequest;
  };

  //vacation
  "/vacations": {
    res: VacationSchema[];
    query: {
      start_date: string;
      end_date: string;
    };
  };
}

export type GetType = {
  [K in keyof BaseGetType]: BaseGetType[K] & BodyGetType;
};
