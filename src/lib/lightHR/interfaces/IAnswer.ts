import type { IHTTPStatus } from "$lib/common/interfaces/IStatus";

export interface IAnswer{
    topic: string;
    description: string;
    ranking: number;
}

export interface IAnswerResponse{
    answers: IAnswer[];
    status: IHTTPStatus;
}