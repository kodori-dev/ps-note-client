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
  ErrorSchema,
  MemberSchema,
  UserUpdateMemberSchema,
} from '../models/index';
import {
    ErrorSchemaFromJSON,
    ErrorSchemaToJSON,
    MemberSchemaFromJSON,
    MemberSchemaToJSON,
    UserUpdateMemberSchemaFromJSON,
    UserUpdateMemberSchemaToJSON,
} from '../models/index';

export interface PsNoteServerAppsCoreViewsV2MemberGetRequest {
    is_active?: boolean;
    is_off?: boolean | null;
}

export interface PsNoteServerAppsCoreViewsV2MemberGetMemberRequest {
    member_id: number;
}

export interface PsNoteServerAppsCoreViewsV2MemberUpdateMemberRequest {
    member_id: number;
    UserUpdateMemberSchema: UserUpdateMemberSchema;
}

/**
 * 
 */
export class MemberApi extends runtime.BaseAPI {

    /**
     * 멤버 목록 조회
     */
    async psNoteServerAppsCoreViewsV2MemberGetRaw(requestParameters: PsNoteServerAppsCoreViewsV2MemberGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MemberSchema>>> {
        const queryParameters: any = {};

        if (requestParameters['is_active'] != null) {
            queryParameters['is_active'] = requestParameters['is_active'];
        }

        if (requestParameters['is_off'] != null) {
            queryParameters['is_off'] = requestParameters['is_off'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/members`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MemberSchemaFromJSON));
    }

    /**
     * 멤버 목록 조회
     */
    async psNoteServerAppsCoreViewsV2MemberGet(requestParameters: PsNoteServerAppsCoreViewsV2MemberGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MemberSchema>> {
        const response = await this.psNoteServerAppsCoreViewsV2MemberGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 멤버 단건 조회
     */
    async psNoteServerAppsCoreViewsV2MemberGetMemberRaw(requestParameters: PsNoteServerAppsCoreViewsV2MemberGetMemberRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MemberSchema>> {
        if (requestParameters['member_id'] == null) {
            throw new runtime.RequiredError(
                'member_id',
                'Required parameter "member_id" was null or undefined when calling psNoteServerAppsCoreViewsV2MemberGetMember().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/members/{member_id}`.replace(`{${"member_id"}}`, encodeURIComponent(String(requestParameters['member_id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberSchemaFromJSON(jsonValue));
    }

    /**
     * 멤버 단건 조회
     */
    async psNoteServerAppsCoreViewsV2MemberGetMember(requestParameters: PsNoteServerAppsCoreViewsV2MemberGetMemberRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MemberSchema> {
        const response = await this.psNoteServerAppsCoreViewsV2MemberGetMemberRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 멤버 업데이트
     */
    async psNoteServerAppsCoreViewsV2MemberUpdateMemberRaw(requestParameters: PsNoteServerAppsCoreViewsV2MemberUpdateMemberRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MemberSchema>> {
        if (requestParameters['member_id'] == null) {
            throw new runtime.RequiredError(
                'member_id',
                'Required parameter "member_id" was null or undefined when calling psNoteServerAppsCoreViewsV2MemberUpdateMember().'
            );
        }

        if (requestParameters['UserUpdateMemberSchema'] == null) {
            throw new runtime.RequiredError(
                'UserUpdateMemberSchema',
                'Required parameter "UserUpdateMemberSchema" was null or undefined when calling psNoteServerAppsCoreViewsV2MemberUpdateMember().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v2/members/{member_id}`.replace(`{${"member_id"}}`, encodeURIComponent(String(requestParameters['member_id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UserUpdateMemberSchemaToJSON(requestParameters['UserUpdateMemberSchema']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberSchemaFromJSON(jsonValue));
    }

    /**
     * 멤버 업데이트
     */
    async psNoteServerAppsCoreViewsV2MemberUpdateMember(requestParameters: PsNoteServerAppsCoreViewsV2MemberUpdateMemberRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MemberSchema> {
        const response = await this.psNoteServerAppsCoreViewsV2MemberUpdateMemberRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
