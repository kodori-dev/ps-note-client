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
 * @interface UseCouponRequestSchema
 */
export interface UseCouponRequestSchema {
  /**
   *
   * @type {number}
   * @memberof UseCouponRequestSchema
   */
  coupon_id: number;
  /**
   *
   * @type {Date}
   * @memberof UseCouponRequestSchema
   */
  use_date?: Date | null | string;
}

/**
 * Check if a given object implements the UseCouponRequestSchema interface.
 */
export function instanceOfUseCouponRequestSchema(value: object): value is UseCouponRequestSchema {
  if (!('coupon_id' in value) || value['coupon_id'] === undefined) return false;
  return true;
}

export function UseCouponRequestSchemaFromJSON(json: any): UseCouponRequestSchema {
  return UseCouponRequestSchemaFromJSONTyped(json, false);
}

export function UseCouponRequestSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): UseCouponRequestSchema {
  if (json == null) {
    return json;
  }
  return {
    coupon_id: json['coupon_id'],
    use_date: json['use_date'] == null ? undefined : new Date(json['use_date']),
  };
}

export function UseCouponRequestSchemaToJSON(value?: UseCouponRequestSchema | null): any {
  if (value == null) {
    return value;
  }
  return {
    coupon_id: value['coupon_id'],
    use_date: value['use_date'] == null ? undefined : (value['use_date'] as any).toISOString(),
  };
}