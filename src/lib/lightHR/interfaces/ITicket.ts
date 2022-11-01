export interface ITicket{
    id: string,
    subject: string,
    description: string,
    issuerEmail: string,
    categoryId: string,
    attachments: FileList | null
}

export interface ITicketCategory{
    key: string,
    name: string,
    initialSelected: boolean
}