import { readable } from "svelte/store";
import lightConfig from '../lightConfig.json';

const initialConfig = {
    hooks:[
        { name: "hookAfterSuggestions", extEndpoint: "", disableOrigCall: false }
    ],
    questionOptions: {minLength: 10},
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