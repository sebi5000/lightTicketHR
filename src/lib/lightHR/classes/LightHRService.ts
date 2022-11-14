import { StatusType } from "$lib/common/enumerations";
import type { IStatus, IHTTPStatus } from "$lib/common/interfaces/IStatus";
import type { IAnswer, IAnswerResponse } from "../interfaces/IAnswer";
import type { ILightHRService } from "../interfaces/ILightHRService";
import type { ITicket, ITicketCategory, ITicketCategoryResponse } from "../interfaces/ITicket";
import type { IConfiguration } from "../interfaces/IConfiguration";
//import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export class LightHRService implements ILightHRService{
    
    config: IConfiguration;

    public constructor(config: IConfiguration){
         this.config = config;
    }

    async getTicketCategoryAsync(ticket: ITicket): Promise<ITicketCategoryResponse> {
        const defaultCategory = {id: 0, name:"Other", contact:{id:0, name:"1st Level Support", description:"Our 1st Level Support take care of your concern."}};
        await new Promise(f => setTimeout(f, 2000));
        return { category: defaultCategory, status: { status_code: 200, detail: "Ok", isOk: true } }
    }

    async estimateResponseTimeAsync(ticket: ITicketCategory): Promise<Number> {
        await new Promise(f => setTimeout(f, 1500));
        return 13;
    }

    async getSuggestionsAsync(phrase: string): Promise<IAnswerResponse> {
        
        //Read API Endpoint based on Environment
        const response = await fetch(`http://127.0.0.1:8000/answers/${phrase}`, {method: 'GET', headers: { "Accept": "application/json" }});
        const body = await response.json();

        let data = body as IAnswer[];
        let status = { status_code: 200, detail: "Ok" };
        if(data === null){
            status = { status_code: response.status, detail: response.statusText }
        }
        
        //let data = [{topic: "Beispiel-1", description: "Eine Beschreibung", ranking: 1},
        //{topic: "Beispiel-2", description: "<b>Eine Beschreibung-2</b>", ranking: 3},
        //{topic: "Beispiel-3", description: "Eine Beschreibung-3", ranking: 2}];                    

        let extHook = this.config?.hooks?.find( conf => conf.name === "hookAfterSuggestions");
        try{
            if(extHook?.disableOrigCall &&
               extHook?.extEndpoint){
                data = await fetch(extHook.extEndpoint, {method: "POST", body: "", headers: {"Content-Type": "application/json; charset=UTF-8"}})
                                .then((response) => response.json());
            }else if(extHook?.extEndpoint){
                //data = SUPER FINDING ALGORITHM
                data = await fetch(extHook.extEndpoint, {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json; charset=UTF-8"}})
                                .then((response) => response.json());
            }else {
                //data = SUPER FINDING ALGORITHM
            }
        }catch(e){
            data = [];
        }

        data.sort((x,y) => x.ranking - y.ranking);
        return { answers: data, status: status } as IAnswerResponse;
    }

    async createTicketAsync(ticket: ITicket): Promise<IStatus> {
        //TODO: Implementing
        return {code: 123, type: StatusType.success, shortMessage: "Successfull", longMessage:"Very Successfull"}
    }
}