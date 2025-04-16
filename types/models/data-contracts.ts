/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** SolutionOrderingEnum */
export enum SolutionOrderingEnum {
  Id = "id",
  ValueId = "-id",
  SourceLang = "source_lang",
  ValueSourceLang = "-source_lang",
  SubmittedAt = "submitted_at",
  ValueSubmittedAt = "-submitted_at",
}

/** ProblemOrderingEnum */
export enum ProblemOrderingEnum {
  Id = "id",
  ValueId = "-id",
  Stars = "stars",
  ValueStars = "-stars",
  Solutions = "solutions",
  ValueSolutions = "-solutions",
}

/** ErrorCode */
export enum ErrorCode {
  E000 = "E000",
  E001 = "E001",
  E002 = "E002",
  E0021 = "E002",
  E003 = "E003",
  E004 = "E004",
  E005 = "E005",
  E006 = "E006",
  E007 = "E007",
  E008 = "E008",
  E009 = "E009",
  E010 = "E010",
  E011 = "E011",
  E012 = "E012",
  E013 = "E013",
  E015 = "E015",
  E016 = "E016",
  E017 = "E017",
  E997 = "E997",
  E998 = "E998",
  E999 = "E999",
}

/** LoginSchema */
export interface LoginSchema {
  /** Username */
  username: string;
}

/** ErrorSchema */
export interface ErrorSchema {
  code: ErrorCode;
  /** Message */
  message: string;
  /** Details */
  details?: any;
}

/** LoginRequestSchema */
export interface LoginRequestSchema {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/** MemberSchema */
export interface MemberSchema {
  /** Id */
  id: number;
  /** Username */
  username: string | null;
  /** Nickname */
  nickname: string | null;
  /** Boj Id */
  boj_id: string | null;
  /** Is Active */
  is_active: boolean;
  /** Is Off */
  is_off: boolean;
  /** Is Admin */
  is_admin: boolean;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Deleted At */
  deleted_at: string | null;
}

/** SignupRequestSchema */
export interface SignupRequestSchema {
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Nickname */
  nickname: string;
  /** Boj Id */
  boj_id: string;
}

/** UserUpdateMemberSchema */
export interface UserUpdateMemberSchema {
  /** Original Password */
  original_password: string;
  /** Password */
  password?: string | null;
  /** Boj Id */
  boj_id?: string | null;
}

/** ProblemQuerySchema */
export interface ProblemQuerySchema {
  /** Query */
  query?: string | null;
  /** Oj Id */
  oj_id?: string | null;
  /** Submitted At */
  submitted_at?: string | null;
  /** Submitted At  Start */
  submitted_at__start?: string | null;
  /** Submitted At  End */
  submitted_at__end?: string | null;
  /** Ordering */
  ordering?: ("id" | "-id" | "stars" | "-stars" | "solutions" | "-solutions")[];
  /** Is Starred */
  is_starred?: boolean | null;
}

/** PaginatedProblemSchema */
export interface PaginatedProblemSchema {
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Size */
  size: number;
  /** Items */
  items: ProblemSchema[];
}

/** ProblemSchema */
export interface ProblemSchema {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Oj Id */
  oj_id: string;
  /** Level */
  level: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Label */
  label: string;
  /** Url */
  url: string;
  /** Is Solved */
  is_solved: boolean | null;
  /** Is Starred */
  is_starred: boolean | null;
  /** Stars */
  stars: number;
  /** Solutions */
  solutions: number;
  /** Tags */
  tags: ProblemTagSchema[];
  /** Oj Type */
  oj_type: string;
}

/** ProblemTagSchema */
export interface ProblemTagSchema {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Oj Tag Id */
  oj_tag_id: string | null;
  /** Oj Type */
  oj_type: string;
}

/** ProblemStarRequestSchema */
export interface ProblemStarRequestSchema {
  /** Problem Id */
  problem_id: number;
  /** Star */
  star: boolean;
}

/** PenaltyQuerySchema */
export interface PenaltyQuerySchema {
  /**
   * Member Is Active
   * @default true
   */
  member_is_active?: boolean | null;
  /** Member Is Off */
  member_is_off?: boolean | null;
  /** Member Id */
  member_id?: number | null;
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

/** CouponSchema */
export interface CouponSchema {
  /** Id */
  id: number;
  /** Name */
  name: string;
  member: MemberSchema;
  /** Used At */
  used_at: string | null;
  /** Valid From */
  valid_from: string | null;
  /** Valid To */
  valid_to: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** PenaltySchema */
export interface PenaltySchema {
  /** Id */
  id: number;
  /**
   * Day
   * @format date
   */
  day: string;
  /** Amount */
  amount: number | string;
  /** Is Penalty */
  is_penalty: boolean;
  /** Manually Edited */
  manually_edited: boolean;
  member: MemberSchema;
  /** Admitted Solutions */
  admitted_solutions: SolutionSchema[];
  /** Not Admitted Solutions */
  not_admitted_solutions: SolutionSchema[];
  /** Coupons */
  coupons: CouponSchema[];
}

/** SolutionSchema */
export interface SolutionSchema {
  /** Id */
  id: number;
  member: MemberSchema;
  problem: ProblemSchema;
  /** Comment */
  comment: string | null;
  /** Source Lang */
  source_lang: string;
  /** Source Code */
  source_code: string;
  /** Is Correct Answer */
  is_correct_answer: boolean;
  /**
   * Submitted At
   * @format date
   */
  submitted_at: string;
  /** Imported From Notion */
  imported_from_notion: boolean;
  /** Is Fully Parsed */
  is_fully_parsed: boolean | null;
  /** Notion Page Id */
  notion_page_id: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Deleted At */
  deleted_at: string | null;
  /** Status Label */
  status_label: string;
  /** Score Label */
  score_label: string;
  /** Oj Verification Tried At */
  oj_verification_tried_at: string | null;
  /** Is Oj Verified */
  is_oj_verified: boolean | null;
  /** Oj Solution Id */
  oj_solution_id: string | null;
  /** Oj Submitted At */
  oj_submitted_at: string | null;
  /** Oj Score Label */
  oj_score_label: string | null;
}

/** UpdateSolutionSchema */
export interface UpdateSolutionSchema {
  /** Comment */
  comment?: string | null;
  /** Source Code */
  source_code?: string | null;
  /** Source Lang */
  source_lang?: string | null;
  /** Is Correct Answer */
  is_correct_answer?: boolean | null;
  /** Submitted At */
  submitted_at?: string | null;
  /**
   * Star
   * @default false
   */
  star?: boolean;
}

/** SolutionQuerySchema */
export interface SolutionQuerySchema {
  /**
   * Page
   * @default 1
   */
  page?: number;
  /**
   * Size
   * @default 30
   */
  size?: number;
  /** Member Id */
  member_id?: number | null;
  /** Problem Id */
  problem_id?: number | null;
  /** Ordering */
  ordering?: (
    | "id"
    | "-id"
    | "source_lang"
    | "-source_lang"
    | "submitted_at"
    | "-submitted_at"
  )[];
}

/** PaginatedSolutionSchema */
export interface PaginatedSolutionSchema {
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Size */
  size: number;
  /** Items */
  items: SolutionSchema[];
}

/** CreateSolutionSchema */
export interface CreateSolutionSchema {
  /** Problem Id */
  problem_id: number;
  /** Comment */
  comment: string;
  /** Source Code */
  source_code: string;
  /** Source Lang */
  source_lang: string;
  /** Is Correct Answer */
  is_correct_answer: boolean;
  /** Submitted At */
  submitted_at?: string | null;
  /**
   * Star
   * @default false
   */
  star?: boolean;
}

/** CouponQuerySchema */
export interface CouponQuerySchema {
  /** Day */
  day?: string | null;
  /** Member Id */
  member_id?: number | null;
  /** Usable */
  usable?: boolean | null;
}

/** UseCouponRequestSchema */
export interface UseCouponRequestSchema {
  /** Coupon Id */
  coupon_id: number;
  /** Use Date */
  use_date?: string | null;
}

/** HolidaySchema */
export interface HolidaySchema {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /**
   * Date
   * @format date
   */
  date: string;
}

/** VacationSchema */
export interface VacationSchema {
  /** Id */
  id: number;
  member: MemberSchema;
  /**
   * Start Date
   * @format date
   */
  start_date: string;
  /**
   * End Date
   * @format date
   */
  end_date: string;
  /** Memo */
  memo: string | null;
}

/** VacationCreateSchema */
export interface VacationCreateSchema {
  /**
   * Start Date
   * @format date
   */
  start_date: string;
  /**
   * End Date
   * @format date
   */
  end_date: string;
  /** Memo */
  memo: string | null;
}

export type PsNoteServerAppsCoreViewsV2LoginPostData = LoginSchema;

export type PsNoteServerAppsCoreViewsV2LoginPostError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2LogoutPostData = any;

export type PsNoteServerAppsCoreViewsV2SignupPostData = MemberSchema;

export type PsNoteServerAppsCoreViewsV2SignupPostError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2MeGetData = MemberSchema;

/** Response */
export type PsNoteServerAppsCoreViewsV2MemberGetData = MemberSchema[];

export type PsNoteServerAppsCoreViewsV2MemberGetMemberData = MemberSchema;

export type PsNoteServerAppsCoreViewsV2MemberGetMemberError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2MemberUpdateMemberData = MemberSchema;

export type PsNoteServerAppsCoreViewsV2MemberUpdateMemberError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2ProblemGetData = PaginatedProblemSchema;

export type PsNoteServerAppsCoreViewsV2ProblemGetProblemData = ProblemSchema;

export type PsNoteServerAppsCoreViewsV2ProblemGetProblemError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2ProblemSearchProblemsData =
  PaginatedProblemSchema;

export type PsNoteServerAppsCoreViewsV2ProblemSearchProblemsError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2ProblemStarPostData = any;

export type PsNoteServerAppsCoreViewsV2ProblemStarPostError = ErrorSchema;

/** Response */
export type PsNoteServerAppsCoreViewsV2PenaltyGetData = PenaltySchema[];

export type PsNoteServerAppsCoreViewsV2PenaltyGetError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2SolutionDeleteData = any;

export type PsNoteServerAppsCoreViewsV2SolutionDeleteError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2SolutionGetSolutionData = SolutionSchema;

export type PsNoteServerAppsCoreViewsV2SolutionGetSolutionError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2SolutionPatchData = SolutionSchema;

export type PsNoteServerAppsCoreViewsV2SolutionPatchError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2SolutionGetData =
  PaginatedSolutionSchema;

export type PsNoteServerAppsCoreViewsV2SolutionGetError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2SolutionPostData = SolutionSchema;

export type PsNoteServerAppsCoreViewsV2SolutionPostError = ErrorSchema;

/** Response */
export type PsNoteServerAppsCoreViewsV2CouponGetData = CouponSchema[];

export type PsNoteServerAppsCoreViewsV2CouponGetError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2CouponUseCouponData = any;

export type PsNoteServerAppsCoreViewsV2CouponUseCouponError = ErrorSchema;

/** Response */
export type PsNoteServerAppsCoreViewsV2HolidayGetData = HolidaySchema[];

export type PsNoteServerAppsCoreViewsV2VacationDeleteData = any;

export type PsNoteServerAppsCoreViewsV2VacationDeleteError = ErrorSchema;

/** Response */
export type PsNoteServerAppsCoreViewsV2VacationGetData = VacationSchema[];

export type PsNoteServerAppsCoreViewsV2VacationGetError = ErrorSchema;

export type PsNoteServerAppsCoreViewsV2VacationPostData = VacationSchema;

export type PsNoteServerAppsCoreViewsV2VacationPostError = ErrorSchema;
