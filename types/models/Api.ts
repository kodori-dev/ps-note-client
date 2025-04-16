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

import {
  CreateSolutionSchema,
  LoginRequestSchema,
  ProblemStarRequestSchema,
  PsNoteServerAppsCoreViewsV2CouponGetData,
  PsNoteServerAppsCoreViewsV2CouponGetError,
  PsNoteServerAppsCoreViewsV2CouponUseCouponData,
  PsNoteServerAppsCoreViewsV2CouponUseCouponError,
  PsNoteServerAppsCoreViewsV2HolidayGetData,
  PsNoteServerAppsCoreViewsV2LoginPostData,
  PsNoteServerAppsCoreViewsV2LoginPostError,
  PsNoteServerAppsCoreViewsV2LogoutPostData,
  PsNoteServerAppsCoreViewsV2MeGetData,
  PsNoteServerAppsCoreViewsV2MemberGetData,
  PsNoteServerAppsCoreViewsV2MemberGetMemberData,
  PsNoteServerAppsCoreViewsV2MemberGetMemberError,
  PsNoteServerAppsCoreViewsV2MemberUpdateMemberData,
  PsNoteServerAppsCoreViewsV2MemberUpdateMemberError,
  PsNoteServerAppsCoreViewsV2PenaltyGetData,
  PsNoteServerAppsCoreViewsV2PenaltyGetError,
  PsNoteServerAppsCoreViewsV2ProblemGetData,
  PsNoteServerAppsCoreViewsV2ProblemGetProblemData,
  PsNoteServerAppsCoreViewsV2ProblemGetProblemError,
  PsNoteServerAppsCoreViewsV2ProblemSearchProblemsData,
  PsNoteServerAppsCoreViewsV2ProblemSearchProblemsError,
  PsNoteServerAppsCoreViewsV2ProblemStarPostData,
  PsNoteServerAppsCoreViewsV2ProblemStarPostError,
  PsNoteServerAppsCoreViewsV2SignupPostData,
  PsNoteServerAppsCoreViewsV2SignupPostError,
  PsNoteServerAppsCoreViewsV2SolutionDeleteData,
  PsNoteServerAppsCoreViewsV2SolutionDeleteError,
  PsNoteServerAppsCoreViewsV2SolutionGetData,
  PsNoteServerAppsCoreViewsV2SolutionGetError,
  PsNoteServerAppsCoreViewsV2SolutionGetSolutionData,
  PsNoteServerAppsCoreViewsV2SolutionGetSolutionError,
  PsNoteServerAppsCoreViewsV2SolutionPatchData,
  PsNoteServerAppsCoreViewsV2SolutionPatchError,
  PsNoteServerAppsCoreViewsV2SolutionPostData,
  PsNoteServerAppsCoreViewsV2SolutionPostError,
  PsNoteServerAppsCoreViewsV2VacationDeleteData,
  PsNoteServerAppsCoreViewsV2VacationDeleteError,
  PsNoteServerAppsCoreViewsV2VacationGetData,
  PsNoteServerAppsCoreViewsV2VacationGetError,
  PsNoteServerAppsCoreViewsV2VacationPostData,
  PsNoteServerAppsCoreViewsV2VacationPostError,
  SignupRequestSchema,
  UpdateSolutionSchema,
  UseCouponRequestSchema,
  UserUpdateMemberSchema,
  VacationCreateSchema,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth
   * @name PsNoteServerAppsCoreViewsV2LoginPost
   * @summary 로그인
   * @request POST:/api/v2/auth/login
   * @response `200` `PsNoteServerAppsCoreViewsV2LoginPostData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2LoginPost = (
    data: LoginRequestSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2LoginPostData,
      PsNoteServerAppsCoreViewsV2LoginPostError
    >({
      path: `/api/v2/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name PsNoteServerAppsCoreViewsV2LogoutPost
   * @summary 로그아웃
   * @request POST:/api/v2/auth/logout
   * @response `200` `PsNoteServerAppsCoreViewsV2LogoutPostData` OK
   */
  psNoteServerAppsCoreViewsV2LogoutPost = (params: RequestParams = {}) =>
    this.request<PsNoteServerAppsCoreViewsV2LogoutPostData, any>({
      path: `/api/v2/auth/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name PsNoteServerAppsCoreViewsV2SignupPost
   * @summary 회원가입
   * @request POST:/api/v2/auth/signup
   * @response `200` `PsNoteServerAppsCoreViewsV2SignupPostData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SignupPost = (
    data: SignupRequestSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SignupPostData,
      PsNoteServerAppsCoreViewsV2SignupPostError
    >({
      path: `/api/v2/auth/signup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name PsNoteServerAppsCoreViewsV2MeGet
   * @summary 내 정보
   * @request GET:/api/v2/me
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2MeGetData` OK
   */
  psNoteServerAppsCoreViewsV2MeGet = (params: RequestParams = {}) =>
    this.request<PsNoteServerAppsCoreViewsV2MeGetData, any>({
      path: `/api/v2/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags member
   * @name PsNoteServerAppsCoreViewsV2MemberGet
   * @summary 멤버 목록 조회
   * @request GET:/api/v2/members
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2MemberGetData` OK
   */
  psNoteServerAppsCoreViewsV2MemberGet = (
    query?: {
      /**
       * Is Active
       * @default true
       */
      is_active?: boolean;
      /** Is Off */
      is_off?: boolean | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<PsNoteServerAppsCoreViewsV2MemberGetData, any>({
      path: `/api/v2/members`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags member
   * @name PsNoteServerAppsCoreViewsV2MemberGetMember
   * @summary 멤버 단건 조회
   * @request GET:/api/v2/members/{member_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2MemberGetMemberData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2MemberGetMember = (
    memberId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2MemberGetMemberData,
      PsNoteServerAppsCoreViewsV2MemberGetMemberError
    >({
      path: `/api/v2/members/${memberId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags member
   * @name PsNoteServerAppsCoreViewsV2MemberUpdateMember
   * @summary 멤버 업데이트
   * @request PATCH:/api/v2/members/{member_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2MemberUpdateMemberData` OK
   * @response `400` `ErrorSchema` Bad Request
   * @response `403` `ErrorSchema` Forbidden
   */
  psNoteServerAppsCoreViewsV2MemberUpdateMember = (
    memberId: number,
    data: UserUpdateMemberSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2MemberUpdateMemberData,
      PsNoteServerAppsCoreViewsV2MemberUpdateMemberError
    >({
      path: `/api/v2/members/${memberId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags problem
   * @name PsNoteServerAppsCoreViewsV2ProblemGet
   * @summary 문제 조회 (페이지네이션)
   * @request GET:/api/v2/problems
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2ProblemGetData` OK
   */
  psNoteServerAppsCoreViewsV2ProblemGet = (
    query?: {
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
      ordering?: (
        | "id"
        | "-id"
        | "stars"
        | "-stars"
        | "solutions"
        | "-solutions"
      )[];
      /** Is Starred */
      is_starred?: boolean | null;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<PsNoteServerAppsCoreViewsV2ProblemGetData, any>({
      path: `/api/v2/problems`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags problem
   * @name PsNoteServerAppsCoreViewsV2ProblemGetProblem
   * @summary 문제 단건 조회
   * @request GET:/api/v2/problems/{problem_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2ProblemGetProblemData` OK
   * @response `400` `ErrorSchema` Bad Request
   * @response `404` `ErrorSchema` Not Found
   */
  psNoteServerAppsCoreViewsV2ProblemGetProblem = (
    problemId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2ProblemGetProblemData,
      PsNoteServerAppsCoreViewsV2ProblemGetProblemError
    >({
      path: `/api/v2/problems/${problemId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags problem
   * @name PsNoteServerAppsCoreViewsV2ProblemSearchProblems
   * @summary 문제 검색 (페이지네이션)
   * @request GET:/api/v2/problems/search
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2ProblemSearchProblemsData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2ProblemSearchProblems = (
    query?: {
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
      ordering?: (
        | "id"
        | "-id"
        | "stars"
        | "-stars"
        | "solutions"
        | "-solutions"
      )[];
      /** Is Starred */
      is_starred?: boolean | null;
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2ProblemSearchProblemsData,
      PsNoteServerAppsCoreViewsV2ProblemSearchProblemsError
    >({
      path: `/api/v2/problems/search`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags problem star
   * @name PsNoteServerAppsCoreViewsV2ProblemStarPost
   * @summary 문제 별표 표시
   * @request POST:/api/v2/problem-stars
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2ProblemStarPostData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2ProblemStarPost = (
    data: ProblemStarRequestSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2ProblemStarPostData,
      PsNoteServerAppsCoreViewsV2ProblemStarPostError
    >({
      path: `/api/v2/problem-stars`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags penalty
   * @name PsNoteServerAppsCoreViewsV2PenaltyGet
   * @summary 패널티 조회
   * @request GET:/api/v2/penalties
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2PenaltyGetData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2PenaltyGet = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2PenaltyGetData,
      PsNoteServerAppsCoreViewsV2PenaltyGetError
    >({
      path: `/api/v2/penalties`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags solution
   * @name PsNoteServerAppsCoreViewsV2SolutionDelete
   * @summary 솔루션 삭제
   * @request DELETE:/api/v2/solutions/{solution_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2SolutionDeleteData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SolutionDelete = (
    solutionId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SolutionDeleteData,
      PsNoteServerAppsCoreViewsV2SolutionDeleteError
    >({
      path: `/api/v2/solutions/${solutionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags solution
   * @name PsNoteServerAppsCoreViewsV2SolutionGetSolution
   * @summary 솔루션 단건 조회
   * @request GET:/api/v2/solutions/{solution_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2SolutionGetSolutionData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SolutionGetSolution = (
    solutionId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SolutionGetSolutionData,
      PsNoteServerAppsCoreViewsV2SolutionGetSolutionError
    >({
      path: `/api/v2/solutions/${solutionId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags solution
   * @name PsNoteServerAppsCoreViewsV2SolutionPatch
   * @summary 솔루션 수정
   * @request PATCH:/api/v2/solutions/{solution_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2SolutionPatchData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SolutionPatch = (
    solutionId: number,
    data: UpdateSolutionSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SolutionPatchData,
      PsNoteServerAppsCoreViewsV2SolutionPatchError
    >({
      path: `/api/v2/solutions/${solutionId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags solution
   * @name PsNoteServerAppsCoreViewsV2SolutionGet
   * @summary 솔루션 목록 조회
   * @request GET:/api/v2/solutions
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2SolutionGetData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SolutionGet = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SolutionGetData,
      PsNoteServerAppsCoreViewsV2SolutionGetError
    >({
      path: `/api/v2/solutions`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags solution
   * @name PsNoteServerAppsCoreViewsV2SolutionPost
   * @summary 솔루션 생성
   * @request POST:/api/v2/solutions
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2SolutionPostData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2SolutionPost = (
    data: CreateSolutionSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2SolutionPostData,
      PsNoteServerAppsCoreViewsV2SolutionPostError
    >({
      path: `/api/v2/solutions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon
   * @name PsNoteServerAppsCoreViewsV2CouponGet
   * @summary 쿠폰 목록 조회
   * @request GET:/api/v2/coupons
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2CouponGetData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2CouponGet = (
    query?: {
      /** Day */
      day?: string | null;
      /** Member Id */
      member_id?: number | null;
      /** Usable */
      usable?: boolean | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2CouponGetData,
      PsNoteServerAppsCoreViewsV2CouponGetError
    >({
      path: `/api/v2/coupons`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coupon
   * @name PsNoteServerAppsCoreViewsV2CouponUseCoupon
   * @summary 쿠폰 사용
   * @request POST:/api/v2/coupons/use
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2CouponUseCouponData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2CouponUseCoupon = (
    data: UseCouponRequestSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2CouponUseCouponData,
      PsNoteServerAppsCoreViewsV2CouponUseCouponError
    >({
      path: `/api/v2/coupons/use`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags holiday
   * @name PsNoteServerAppsCoreViewsV2HolidayGet
   * @summary 공휴일 조회
   * @request GET:/api/v2/holidays
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2HolidayGetData` OK
   */
  psNoteServerAppsCoreViewsV2HolidayGet = (
    query: {
      /** Year */
      year: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PsNoteServerAppsCoreViewsV2HolidayGetData, any>({
      path: `/api/v2/holidays`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vacation
   * @name PsNoteServerAppsCoreViewsV2VacationDelete
   * @summary 휴가 삭제
   * @request DELETE:/api/v2/vacations/{vacation_id}
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2VacationDeleteData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2VacationDelete = (
    vacationId: number,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2VacationDeleteData,
      PsNoteServerAppsCoreViewsV2VacationDeleteError
    >({
      path: `/api/v2/vacations/${vacationId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags vacation
   * @name PsNoteServerAppsCoreViewsV2VacationGet
   * @summary 내 휴가 목록 조회
   * @request GET:/api/v2/vacations
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2VacationGetData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2VacationGet = (
    query: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2VacationGetData,
      PsNoteServerAppsCoreViewsV2VacationGetError
    >({
      path: `/api/v2/vacations`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vacation
   * @name PsNoteServerAppsCoreViewsV2VacationPost
   * @summary 휴가 생성
   * @request POST:/api/v2/vacations
   * @secure
   * @response `200` `PsNoteServerAppsCoreViewsV2VacationPostData` OK
   * @response `400` `ErrorSchema` Bad Request
   */
  psNoteServerAppsCoreViewsV2VacationPost = (
    data: VacationCreateSchema,
    params: RequestParams = {},
  ) =>
    this.request<
      PsNoteServerAppsCoreViewsV2VacationPostData,
      PsNoteServerAppsCoreViewsV2VacationPostError
    >({
      path: `/api/v2/vacations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
