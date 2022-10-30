export interface IConfiguration{
    hooks: Array<IHook>,
    ticketCategories: Array<ITicketCategory> | null,
    createTicketOptions: ITicketOptions
}

export interface IHook{
    name: string,
    extEndpoint: string,
    disableOrigCall: boolean
}

interface ITicketCategory{
    id: string,
    name: string,
    initialSelected: boolean
}

interface ITicketOptions{
    maxSubjectLength: number,
    minSubjectLength: number,
    maxDescriptionLength: number,
    minDescriptionLength: number,
    allowedFileTypes: string,
    useCategories: boolean
}