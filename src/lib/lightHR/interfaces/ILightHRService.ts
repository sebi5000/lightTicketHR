import type { IAnswerResponse } from "./IAnswer";
import type { IStatus } from "../../common/interfaces/IStatus";
import type { ITicket, ITicketCategory, ITicketCategoryResponse } from "./ITicket";

export interface ILightHRService{
    getSuggestionsAsync(phrase: string): Promise<IAnswerResponse>;
    createTicketAsync(ticket: ITicket): Promise<IStatus>;
    getTicketCategoryAsync(ticket: ITicket): Promise<ITicketCategoryResponse>;
    estimateResponseTimeAsync(ticket: ITicketCategory): Promise<Number>;
}