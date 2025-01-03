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
  LoginRequestSchema,
  LoginSchema,
  MemberSchema,
  SignupRequestSchema,
} from '../models/index';
import {
    ErrorSchemaFromJSON,
    ErrorSchemaToJSON,
    LoginRequestSchemaFromJSON,
    LoginRequestSchemaToJSON,
    LoginSchemaFromJSON,
    LoginSchemaToJSON,
    MemberSchemaFromJSON,
    MemberSchemaToJSON,
    SignupRequestSchemaFromJSON,
    SignupRequestSchemaToJSON,
} from '../models/index';

export interface PsNoteServerAppsCoreViewsV2LoginPostRequest {
    LoginRequestSchema: LoginRequestSchema;
}

export interface PsNoteServerAppsCoreViewsV2SignupPostRequest {
    SignupRequestSchema: SignupRequestSchema;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * 로그인
     */
    async psNoteServerAppsCoreViewsV2LoginPostRaw(requestParameters: PsNoteServerAppsCoreViewsV2LoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginSchema>> {
        if (requestParameters['LoginRequestSchema'] == null) {
            throw new runtime.RequiredError(
                'LoginRequestSchema',
                'Required parameter "LoginRequestSchema" was null or undefined when calling psNoteServerAppsCoreViewsV2LoginPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v2/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestSchemaToJSON(requestParameters['LoginRequestSchema']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginSchemaFromJSON(jsonValue));
    }

    /**
     * 로그인
     */
    async psNoteServerAppsCoreViewsV2LoginPost(requestParameters: PsNoteServerAppsCoreViewsV2LoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginSchema> {
        const response = await this.psNoteServerAppsCoreViewsV2LoginPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 내 정보
     */
    async psNoteServerAppsCoreViewsV2MeGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MemberSchema>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v2/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberSchemaFromJSON(jsonValue));
    }

    /**
     * 내 정보
     */
    async psNoteServerAppsCoreViewsV2MeGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MemberSchema> {
        const response = await this.psNoteServerAppsCoreViewsV2MeGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * 회원가입
     */
    async psNoteServerAppsCoreViewsV2SignupPostRaw(requestParameters: PsNoteServerAppsCoreViewsV2SignupPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MemberSchema>> {
        if (requestParameters['SignupRequestSchema'] == null) {
            throw new runtime.RequiredError(
                'SignupRequestSchema',
                'Required parameter "SignupRequestSchema" was null or undefined when calling psNoteServerAppsCoreViewsV2SignupPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v2/auth/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SignupRequestSchemaToJSON(requestParameters['SignupRequestSchema']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MemberSchemaFromJSON(jsonValue));
    }

    /**
     * 회원가입
     */
    async psNoteServerAppsCoreViewsV2SignupPost(requestParameters: PsNoteServerAppsCoreViewsV2SignupPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MemberSchema> {
        const response = await this.psNoteServerAppsCoreViewsV2SignupPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
