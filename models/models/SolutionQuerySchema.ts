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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SolutionQuerySchema
 */
export interface SolutionQuerySchema {
    /**
     * 
     * @type {number}
     * @memberof SolutionQuerySchema
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof SolutionQuerySchema
     */
    size?: number;
    /**
     * 
     * @type {number}
     * @memberof SolutionQuerySchema
     */
    member_id?: number | null;
    /**
     * 
     * @type {number}
     * @memberof SolutionQuerySchema
     */
    problem_id?: number | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SolutionQuerySchema
     */
    ordering?: Array<SolutionQuerySchemaOrderingEnum>;
}


/**
 * @export
 */
export const SolutionQuerySchemaOrderingEnum = {
    Id: 'id',
    Id2: '-id',
    SourceLang: 'source_lang',
    SourceLang2: '-source_lang',
    SubmittedAt: 'submitted_at',
    SubmittedAt2: '-submitted_at'
} as const;
export type SolutionQuerySchemaOrderingEnum = typeof SolutionQuerySchemaOrderingEnum[keyof typeof SolutionQuerySchemaOrderingEnum];


/**
 * Check if a given object implements the SolutionQuerySchema interface.
 */
export function instanceOfSolutionQuerySchema(value: object): value is SolutionQuerySchema {
    return true;
}

export function SolutionQuerySchemaFromJSON(json: any): SolutionQuerySchema {
    return SolutionQuerySchemaFromJSONTyped(json, false);
}

export function SolutionQuerySchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): SolutionQuerySchema {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'] == null ? undefined : json['page'],
        'size': json['size'] == null ? undefined : json['size'],
        'member_id': json['member_id'] == null ? undefined : json['member_id'],
        'problem_id': json['problem_id'] == null ? undefined : json['problem_id'],
        'ordering': json['ordering'] == null ? undefined : json['ordering'],
    };
}

export function SolutionQuerySchemaToJSON(value?: SolutionQuerySchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'size': value['size'],
        'member_id': value['member_id'],
        'problem_id': value['problem_id'],
        'ordering': value['ordering'],
    };
}

