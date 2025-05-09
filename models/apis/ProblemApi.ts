/* tslint:disable */
/* eslint-disable */
/**
 * PS Note API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type { ErrorSchema, PaginatedProblemSchema, ProblemSchema } from '../models/index';
import {
  ErrorSchemaFromJSON,
  ErrorSchemaToJSON,
  PaginatedProblemSchemaFromJSON,
  PaginatedProblemSchemaToJSON,
  ProblemSchemaFromJSON,
  ProblemSchemaToJSON,
} from '../models/index';

export interface PsNoteServerAppsCoreViewsV2ProblemGetRequest {
  query?: string | null;
  boj_id?: string | null;
  submitted_at?: Date | null;
  submitted_at__start?: Date | null;
  submitted_at__end?: Date | null;
  ordering?: Array<PsNoteServerAppsCoreViewsV2ProblemGetOrderingEnum>;
  is_starred?: boolean | null;
  page?: number;
  size?: number;
}

export interface PsNoteServerAppsCoreViewsV2ProblemGetProblemRequest {
  problem_id: number;
}

export interface PsNoteServerAppsCoreViewsV2ProblemSearchProblemsRequest {
  query?: string | null;
  boj_id?: string | null;
  submitted_at?: Date | null | string;
  submitted_at__start?: Date | null | string;
  submitted_at__end?: Date | null | string;
  ordering?: Array<PsNoteServerAppsCoreViewsV2ProblemSearchProblemsOrderingEnum>;
  is_starred?: boolean | null;
  page?: number;
  size?: number;
}

/**
 *
 */
export class ProblemApi extends runtime.BaseAPI {
  /**
   * 문제 조회 (페이지네이션)
   */
  async psNoteServerAppsCoreViewsV2ProblemGetRaw(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PaginatedProblemSchema>> {
    const queryParameters: any = {};

    if (requestParameters['query'] != null) {
      queryParameters['query'] = requestParameters['query'];
    }

    if (requestParameters['boj_id'] != null) {
      queryParameters['boj_id'] = requestParameters['boj_id'];
    }

    if (requestParameters['submitted_at'] != null) {
      queryParameters['submitted_at'] = (requestParameters['submitted_at'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['submitted_at__start'] != null) {
      queryParameters['submitted_at__start'] = (requestParameters['submitted_at__start'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['submitted_at__end'] != null) {
      queryParameters['submitted_at__end'] = (requestParameters['submitted_at__end'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['ordering'] != null) {
      queryParameters['ordering'] = requestParameters['ordering'];
    }

    if (requestParameters['is_starred'] != null) {
      queryParameters['is_starred'] = requestParameters['is_starred'];
    }

    if (requestParameters['page'] != null) {
      queryParameters['page'] = requestParameters['page'];
    }

    if (requestParameters['size'] != null) {
      queryParameters['size'] = requestParameters['size'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v2/problems`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedProblemSchemaFromJSON(jsonValue));
  }

  /**
   * 문제 조회 (페이지네이션)
   */
  async psNoteServerAppsCoreViewsV2ProblemGet(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemGetRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PaginatedProblemSchema> {
    const response = await this.psNoteServerAppsCoreViewsV2ProblemGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 문제 단건 조회
   */
  async psNoteServerAppsCoreViewsV2ProblemGetProblemRaw(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemGetProblemRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ProblemSchema>> {
    if (requestParameters['problem_id'] == null) {
      throw new runtime.RequiredError(
        'problem_id',
        'Required parameter "problem_id" was null or undefined when calling psNoteServerAppsCoreViewsV2ProblemGetProblem().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v2/problems/{problem_id}`.replace(`{${'problem_id'}}`, encodeURIComponent(String(requestParameters['problem_id']))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => ProblemSchemaFromJSON(jsonValue));
  }

  /**
   * 문제 단건 조회
   */
  async psNoteServerAppsCoreViewsV2ProblemGetProblem(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemGetProblemRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ProblemSchema> {
    const response = await this.psNoteServerAppsCoreViewsV2ProblemGetProblemRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 문제 검색 (페이지네이션)
   */
  async psNoteServerAppsCoreViewsV2ProblemSearchProblemsRaw(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemSearchProblemsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PaginatedProblemSchema>> {
    const queryParameters: any = {};

    if (requestParameters['query'] != null) {
      queryParameters['query'] = requestParameters['query'];
    }

    if (requestParameters['boj_id'] != null) {
      queryParameters['boj_id'] = requestParameters['boj_id'];
    }

    if (requestParameters['submitted_at'] != null) {
      queryParameters['submitted_at'] = (requestParameters['submitted_at'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['submitted_at__start'] != null) {
      queryParameters['submitted_at__start'] = (requestParameters['submitted_at__start'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['submitted_at__end'] != null) {
      queryParameters['submitted_at__end'] = (requestParameters['submitted_at__end'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['ordering'] != null) {
      queryParameters['ordering'] = requestParameters['ordering'];
    }

    if (requestParameters['is_starred'] != null) {
      queryParameters['is_starred'] = requestParameters['is_starred'];
    }

    if (requestParameters['page'] != null) {
      queryParameters['page'] = requestParameters['page'];
    }

    if (requestParameters['size'] != null) {
      queryParameters['size'] = requestParameters['size'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v2/problems/search`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedProblemSchemaFromJSON(jsonValue));
  }

  /**
   * 문제 검색 (페이지네이션)
   */
  async psNoteServerAppsCoreViewsV2ProblemSearchProblems(
    requestParameters: PsNoteServerAppsCoreViewsV2ProblemSearchProblemsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PaginatedProblemSchema> {
    const response = await this.psNoteServerAppsCoreViewsV2ProblemSearchProblemsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const PsNoteServerAppsCoreViewsV2ProblemGetOrderingEnum = {
  Id: 'id',
  Id2: '-id',
  Stars: 'stars',
  Stars2: '-stars',
  Solutions: 'solutions',
  Solutions2: '-solutions',
} as const;
export type PsNoteServerAppsCoreViewsV2ProblemGetOrderingEnum =
  (typeof PsNoteServerAppsCoreViewsV2ProblemGetOrderingEnum)[keyof typeof PsNoteServerAppsCoreViewsV2ProblemGetOrderingEnum];
/**
 * @export
 */
export const PsNoteServerAppsCoreViewsV2ProblemSearchProblemsOrderingEnum = {
  Id: 'id',
  Id2: '-id',
  Stars: 'stars',
  Stars2: '-stars',
  Solutions: 'solutions',
  Solutions2: '-solutions',
} as const;
export type PsNoteServerAppsCoreViewsV2ProblemSearchProblemsOrderingEnum =
  (typeof PsNoteServerAppsCoreViewsV2ProblemSearchProblemsOrderingEnum)[keyof typeof PsNoteServerAppsCoreViewsV2ProblemSearchProblemsOrderingEnum];
