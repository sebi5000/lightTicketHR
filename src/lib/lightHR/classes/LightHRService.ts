import { StatusType } from "$lib/common/enumerations";
import type { IStatus } from "$lib/common/interfaces/IStatus";
import type { IAnswer } from "../interfaces/IAnswer";
import type { ILightHRService } from "../interfaces/ILightHRService";
import type { ITicket, ITicketCategory } from "../interfaces/ITicket";
import type { IConfiguration } from "../interfaces/IConfiguration";

export class LightHRService implements ILightHRService{
    
    config: IConfiguration;

    public constructor(config: IConfiguration){
         this.config = config;
    }

    async getSuggestionsAsync(phrase: string): Promise<IAnswer[]> {      
        
        let data = [{topic: "Beispiel-1", description: "Eine Beschreibung", ranking: 1},
        {topic: "Beispiel-2", description: "Eine Beschreibung-2", ranking: 3},
        {topic: "Beispiel-3", description: "Eine Beschreibung-3", ranking: 2}];

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
        return data;
    }
    
    async getTicketCategoriesAsync(): Promise<ITicketCategory[]>{

        let data = [];

        let extHook = this.config?.hooks?.find( conf => conf.name === "hookGetTicketCategories");

        try{            
            if(extHook?.extEndpoint){
                data = await fetch(extHook.extEndpoint, {method: "GET", headers: {"Content-Type": "application/json; charset=UTF-8"}})
                                .then((response) => response.json());
            }
        }catch(e){
            data = [];
        }

        return data;
    }

    async createTicketAsync(ticket: ITicket): Promise<IStatus> {
        //TODO: Implementing
        return {code: 123, type: StatusType.success, shortMessage: "Successfull", longMessage:"Very Successfull"}
    }
}