import type { ILightHRService } from "$lib/lightHR/interfaces/ILightHRService";
import type { IConfiguration } from "../interfaces/IConfiguration";
import { LightHRService } from "./LightHRService";

export class LightHRServiceFactory{

    private static lightHRService?: LightHRService;

    private constructor(){        
    }

    public static build(config: IConfiguration) : ILightHRService{

        if(LightHRServiceFactory.lightHRService === null ||
            LightHRServiceFactory.lightHRService === undefined){
                LightHRServiceFactory.lightHRService = new LightHRService(config);
        }

        return LightHRServiceFactory.lightHRService;
    }
}