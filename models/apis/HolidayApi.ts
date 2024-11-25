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
import type {
  HolidaySchema,
} from '../models/index';
import {
    HolidaySchemaFromJSON,
    HolidaySchemaToJSON,
} from '../models/index';

export interface PsNoteServerAppsCoreViewsV2HolidayGetRequest {
    year: number;
}

/**
 * 
 */
export class HolidayApi extends runtime.BaseAPI {

    /**
     * 공휴일 조회
     */
    async psNoteServerAppsCoreViewsV2HolidayGetRaw(requestParameters: PsNoteServerAppsCoreViewsV2HolidayGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<HolidaySchema>>> {
        if (requestParameters['year'] == null) {
            throw new runtime.RequiredError(
                'year',
                'Required parameter "year" was null or undefined when calling psNoteServerAppsCoreViewsV2HolidayGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['year'] != null) {
            queryParameters['year'] = requestParameters['year'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/holidays`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(HolidaySchemaFromJSON));
    }

    /**
     * 공휴일 조회
     */
    async psNoteServerAppsCoreViewsV2HolidayGet(requestParameters: PsNoteServerAppsCoreViewsV2HolidayGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<HolidaySchema>> {
        const response = await this.psNoteServerAppsCoreViewsV2HolidayGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
