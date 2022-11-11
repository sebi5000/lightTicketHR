import type { IAnswer, IAnswerResponse } from "./IAnswer";
import type { IStatus } from "../../common/interfaces/IStatus";
import type { ITicket, ITicketCategory } from "./ITicket";

export interface ILightHRService{
    getSuggestionsAsync(phrase: string): Promise<IAnswerResponse>;
    getTicketCategoriesAsync(): Promise<Array<ITicketCategory>>;
    createTicketAsync(ticket: ITicket): Promise<IStatus>;    
}