export interface APIResponse {
  body?: string
  headers: GenericObject
  statusCode: STATUS_CODES
}

export interface GenericObject {
  [fieldName: string]: any
}

export enum STATUS_CODES {
  OK = 200,
}
