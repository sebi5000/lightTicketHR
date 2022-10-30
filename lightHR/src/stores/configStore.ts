import { readable } from "svelte/store";
import lightConfig from '../lightConfig.json';

const initialConfig = {
    hooks:[
        { name: "hookAfterSuggestions", extEndpoint: "", disableOrigCall: false }
    ],
    ticketCategories: [ { key: "0", name: "Select a value...", initialSelected: true } ],
    createTicketOptions:{
        minSubjectLength: 10,
        minDescriptionLength: 50,
        maxSubjectLength: 50,
        maxDescriptionLength: 500,
        allowedFileTypes: ".pdf",
        useCategories: true
    }
}

export const globalConfig = readable(initialConfig, function start(set){

    set(lightConfig)

    return function stop(){
    };
});