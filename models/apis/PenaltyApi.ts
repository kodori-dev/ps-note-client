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
import type { ErrorSchema, PenaltySchema } from '../models/index';
import { ErrorSchemaFromJSON, ErrorSchemaToJSON, PenaltySchemaFromJSON, PenaltySchemaToJSON } from '../models/index';

export interface PsNoteServerAppsCoreViewsV2PenaltyGetRequest {
  member_is_active?: boolean | null;
  member_is_off?: boolean | null;
  member_id?: number | null;
  start_date?: Date | null | string;
  end_date?: Date | null | string;
}

/**
 *
 */
export class PenaltyApi extends runtime.BaseAPI {
  /**
   * 패널티 조회
   */
  async psNoteServerAppsCoreViewsV2PenaltyGetRaw(
    requestParameters: PsNoteServerAppsCoreViewsV2PenaltyGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<PenaltySchema>>> {
    const queryParameters: any = {};

    if (requestParameters['member_is_active'] != null) {
      queryParameters['member_is_active'] = requestParameters['member_is_active'];
    }

    if (requestParameters['member_is_off'] != null) {
      queryParameters['member_is_off'] = requestParameters['member_is_off'];
    }

    if (requestParameters['member_id'] != null) {
      queryParameters['member_id'] = requestParameters['member_id'];
    }

    if (requestParameters['start_date'] != null) {
      queryParameters['start_date'] = (requestParameters['start_date'] as any).toISOString().substring(0, 10);
    }

    if (requestParameters['end_date'] != null) {
      queryParameters['end_date'] = (requestParameters['end_date'] as any).toISOString().substring(0, 10);
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/api/v2/penalties`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PenaltySchemaFromJSON));
  }

  /**
   * 패널티 조회
   */
  async psNoteServerAppsCoreViewsV2PenaltyGet(
    requestParameters: PsNoteServerAppsCoreViewsV2PenaltyGetRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<PenaltySchema>> {
    const response = await this.psNoteServerAppsCoreViewsV2PenaltyGetRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
