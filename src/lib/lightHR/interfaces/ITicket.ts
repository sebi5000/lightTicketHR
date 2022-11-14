import type { IHTTPStatus } from "$lib/common/interfaces/IStatus"

export interface ITicket{
    id: string,
    subject: string,
    description: string,
    issuerEmail: string,
    category: ITicketCategory,
    attachments: FileList | null
}

export interface ITicketCategory{
    id: number,
    name: string,
    contact: IHRContact,
}

export interface ITicketCategoryResponse{
    category: ITicketCategory,
    status: IHTTPStatus
}

export interface IHRContact{
    id: number,
    name: string,
    description: string,    
}