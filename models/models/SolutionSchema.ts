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
import type { ProblemSchema } from './ProblemSchema';
import {
    ProblemSchemaFromJSON,
    ProblemSchemaFromJSONTyped,
    ProblemSchemaToJSON,
} from './ProblemSchema';
import type { MemberSchema } from './MemberSchema';
import {
    MemberSchemaFromJSON,
    MemberSchemaFromJSONTyped,
    MemberSchemaToJSON,
} from './MemberSchema';

/**
 * 
 * @export
 * @interface SolutionSchema
 */
export interface SolutionSchema {
    /**
     * 
     * @type {number}
     * @memberof SolutionSchema
     */
    id: number;
    /**
     * 
     * @type {MemberSchema}
     * @memberof SolutionSchema
     */
    member: MemberSchema;
    /**
     * 
     * @type {ProblemSchema}
     * @memberof SolutionSchema
     */
    problem: ProblemSchema;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    comment: string;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    source_lang: string;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    source_code: string;
    /**
     * 
     * @type {boolean}
     * @memberof SolutionSchema
     */
    is_correct_answer: boolean;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    submitted_at: Date;
    /**
     * 
     * @type {boolean}
     * @memberof SolutionSchema
     */
    imported_from_notion: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SolutionSchema
     */
    is_fully_parsed: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    notion_page_id: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    created_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    updated_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    deleted_at: Date | null;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    status_label: string;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    score_label: string;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    boj_verification_tried_at: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof SolutionSchema
     */
    is_boj_verified: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    boj_solution_id: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SolutionSchema
     */
    boj_submitted_at: Date | null;
    /**
     * 
     * @type {string}
     * @memberof SolutionSchema
     */
    boj_score_label: string | null;
}

/**
 * Check if a given object implements the SolutionSchema interface.
 */
export function instanceOfSolutionSchema(value: object): value is SolutionSchema {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('member' in value) || value['member'] === undefined) return false;
    if (!('problem' in value) || value['problem'] === undefined) return false;
    if (!('comment' in value) || value['comment'] === undefined) return false;
    if (!('source_lang' in value) || value['source_lang'] === undefined) return false;
    if (!('source_code' in value) || value['source_code'] === undefined) return false;
    if (!('is_correct_answer' in value) || value['is_correct_answer'] === undefined) return false;
    if (!('submitted_at' in value) || value['submitted_at'] === undefined) return false;
    if (!('imported_from_notion' in value) || value['imported_from_notion'] === undefined) return false;
    if (!('is_fully_parsed' in value) || value['is_fully_parsed'] === undefined) return false;
    if (!('notion_page_id' in value) || value['notion_page_id'] === undefined) return false;
    if (!('created_at' in value) || value['created_at'] === undefined) return false;
    if (!('updated_at' in value) || value['updated_at'] === undefined) return false;
    if (!('deleted_at' in value) || value['deleted_at'] === undefined) return false;
    if (!('status_label' in value) || value['status_label'] === undefined) return false;
    if (!('score_label' in value) || value['score_label'] === undefined) return false;
    if (!('boj_verification_tried_at' in value) || value['boj_verification_tried_at'] === undefined) return false;
    if (!('is_boj_verified' in value) || value['is_boj_verified'] === undefined) return false;
    if (!('boj_solution_id' in value) || value['boj_solution_id'] === undefined) return false;
    if (!('boj_submitted_at' in value) || value['boj_submitted_at'] === undefined) return false;
    if (!('boj_score_label' in value) || value['boj_score_label'] === undefined) return false;
    return true;
}

export function SolutionSchemaFromJSON(json: any): SolutionSchema {
    return SolutionSchemaFromJSONTyped(json, false);
}

export function SolutionSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): SolutionSchema {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'member': MemberSchemaFromJSON(json['member']),
        'problem': ProblemSchemaFromJSON(json['problem']),
        'comment': json['comment'],
        'source_lang': json['source_lang'],
        'source_code': json['source_code'],
        'is_correct_answer': json['is_correct_answer'],
        'submitted_at': (new Date(json['submitted_at'])),
        'imported_from_notion': json['imported_from_notion'],
        'is_fully_parsed': json['is_fully_parsed'],
        'notion_page_id': json['notion_page_id'],
        'created_at': (new Date(json['created_at'])),
        'updated_at': (new Date(json['updated_at'])),
        'deleted_at': (json['deleted_at'] == null ? null : new Date(json['deleted_at'])),
        'status_label': json['status_label'],
        'score_label': json['score_label'],
        'boj_verification_tried_at': (json['boj_verification_tried_at'] == null ? null : new Date(json['boj_verification_tried_at'])),
        'is_boj_verified': json['is_boj_verified'],
        'boj_solution_id': json['boj_solution_id'],
        'boj_submitted_at': (json['boj_submitted_at'] == null ? null : new Date(json['boj_submitted_at'])),
        'boj_score_label': json['boj_score_label'],
    };
}

export function SolutionSchemaToJSON(value?: SolutionSchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'member': MemberSchemaToJSON(value['member']),
        'problem': ProblemSchemaToJSON(value['problem']),
        'comment': value['comment'],
        'source_lang': value['source_lang'],
        'source_code': value['source_code'],
        'is_correct_answer': value['is_correct_answer'],
        'submitted_at': ((value['submitted_at']).toISOString().substring(0,10)),
        'imported_from_notion': value['imported_from_notion'],
        'is_fully_parsed': value['is_fully_parsed'],
        'notion_page_id': value['notion_page_id'],
        'created_at': ((value['created_at']).toISOString()),
        'updated_at': ((value['updated_at']).toISOString()),
        'deleted_at': (value['deleted_at'] == null ? null : (value['deleted_at'] as any).toISOString()),
        'status_label': value['status_label'],
        'score_label': value['score_label'],
        'boj_verification_tried_at': (value['boj_verification_tried_at'] == null ? null : (value['boj_verification_tried_at'] as any).toISOString()),
        'is_boj_verified': value['is_boj_verified'],
        'boj_solution_id': value['boj_solution_id'],
        'boj_submitted_at': (value['boj_submitted_at'] == null ? null : (value['boj_submitted_at'] as any).toISOString()),
        'boj_score_label': value['boj_score_label'],
    };
}
