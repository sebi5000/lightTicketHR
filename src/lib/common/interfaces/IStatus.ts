import type { StatusType } from "../enumerations"

export interface IStatus{
    code: number,
    shortMessage: string,
    longMessage: string,
    type: StatusType
}

export interface IHTTPStatus{
    status_code: number,
    detail: string,
    isOk: boolean
}