<script lang="ts">    	
    import ShowQuickSuggestions from './ShowQuickSuggestions.svelte';
    import { Modus, StatusType } from '../lib/common/enumerations';
    import {get} from 'svelte/store';
	import { globalConfig } from '../stores/configStore';
    import type {IStatus} from '../lib/common/interfaces/IStatus';
    
    let config = get(globalConfig);
    export let phrase = "";
    export let placeholder = "";
    export let modus: Modus = Modus.Search;
    let changedPhrase = "";
    let ticketStatus: IStatus;

    $: changedPhrase;
    function onPhraseSubmit(){
        if(changedPhrase !== phrase){
            changedPhrase = phrase;
        }
    }

    //$: modus;
    //If there is a valid status from ticket creation, we can start Search Modus again
    $: modus = ((ticketStatus?.type === StatusType.success) ? Modus.Search : modus);
</script>
    
<div class="container">
    <div class="row">
        <div class="input-group input-group-lg m-5">     
            <input type="text" class="form-control" bind:value={phrase} on:change={onPhraseSubmit} placeholder={placeholder} disabled={modus === Modus.CreateTicket} />
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" on:click={onPhraseSubmit} disabled={modus === Modus.CreateTicket}>Search</button>                
                <a class="btn btn-default" role="button" href="/createTicket?phrase={phrase}">AskHR</a>
            </span>
        </div>
    </div>
    <div class="row">
        <ShowQuickSuggestions config={config} phrase={changedPhrase} />
    </div>
</div>

<style>
    .input-group{
        margin-top: 0.5em;
        margin-left: 0.5em;
        margin-bottom: 2em;
    }
</style>