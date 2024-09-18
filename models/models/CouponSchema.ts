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
import type { MemberSchema } from './MemberSchema';
import {
    MemberSchemaFromJSON,
    MemberSchemaFromJSONTyped,
    MemberSchemaToJSON,
} from './MemberSchema';

/**
 * 
 * @export
 * @interface CouponSchema
 */
export interface CouponSchema {
    /**
     * 
     * @type {number}
     * @memberof CouponSchema
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CouponSchema
     */
    name: string;
    /**
     * 
     * @type {MemberSchema}
     * @memberof CouponSchema
     */
    member: MemberSchema;
    /**
     * 
     * @type {Date}
     * @memberof CouponSchema
     */
    used_at: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponSchema
     */
    valid_from: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponSchema
     */
    valid_to: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponSchema
     */
    created_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof CouponSchema
     */
    updated_at: Date;
}

/**
 * Check if a given object implements the CouponSchema interface.
 */
export function instanceOfCouponSchema(value: object): value is CouponSchema {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('member' in value) || value['member'] === undefined) return false;
    if (!('used_at' in value) || value['used_at'] === undefined) return false;
    if (!('valid_from' in value) || value['valid_from'] === undefined) return false;
    if (!('valid_to' in value) || value['valid_to'] === undefined) return false;
    if (!('created_at' in value) || value['created_at'] === undefined) return false;
    if (!('updated_at' in value) || value['updated_at'] === undefined) return false;
    return true;
}

export function CouponSchemaFromJSON(json: any): CouponSchema {
    return CouponSchemaFromJSONTyped(json, false);
}

export function CouponSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponSchema {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'member': MemberSchemaFromJSON(json['member']),
        'used_at': (json['used_at'] == null ? null : new Date(json['used_at'])),
        'valid_from': (json['valid_from'] == null ? null : new Date(json['valid_from'])),
        'valid_to': (json['valid_to'] == null ? null : new Date(json['valid_to'])),
        'created_at': (new Date(json['created_at'])),
        'updated_at': (new Date(json['updated_at'])),
    };
}

export function CouponSchemaToJSON(value?: CouponSchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'name': value['name'],
        'member': MemberSchemaToJSON(value['member']),
        'used_at': (value['used_at'] == null ? null : (value['used_at'] as any).toISOString()),
        'valid_from': (value['valid_from'] == null ? null : (value['valid_from'] as any).toISOString()),
        'valid_to': (value['valid_to'] == null ? null : (value['valid_to'] as any).toISOString()),
        'created_at': ((value['created_at']).toISOString()),
        'updated_at': ((value['updated_at']).toISOString()),
    };
}

