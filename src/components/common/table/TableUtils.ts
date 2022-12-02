export interface Options{
    maxRows: number    
}

export interface Row{
    id: number
}

export interface Column{
    key: string,
    title: string,
    sortable?:boolean,
    useHTML?:boolean,
    width?:string,
    format: (value: any) => string
}