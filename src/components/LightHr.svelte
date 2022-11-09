<script lang="ts">    	
    import ShowQuickSuggestions from './ShowQuickSuggestions.svelte';
    import { Modus, StatusType } from '../lib/common/enumerations';
	import CreateTicket from './CreateTicket.svelte';
    import {get} from 'svelte/store';
	import { globalConfig } from '../stores/configStore';
    import type {IStatus} from '../lib/common/interfaces/IStatus';
    import StatusStrip from './common/StatusStrip.svelte';
    
    let config = get(globalConfig);
    export let phrase = "";
    export let placeholder = "";
    export let modus: Modus = Modus.Search;

    let ticketStatus: IStatus;

    //$: modus;
    //If there is a valid status from ticket creation, we can start Seach Modus again
    $: modus = ((ticketStatus?.type === StatusType.success) ? Modus.Search : modus);

    function onChangePhrase(eventArgs: any){
        phrase = eventArgs.target.value;
    }

    function onCreateTicket(eventArgs: any){
        modus = Modus.CreateTicket;        
    }

    async function onTicketFormClicked(eventArgs: any){
        switch(eventArgs.target.id){
            case "ticket-cancel":
                modus = Modus.Search;
                break;
        }
    }
</script>
    
<div class="container">
    <div class="row">
        <div class="input-group input-group-lg m-5">     
            <input type="text" class="form-control" value={phrase} placeholder={placeholder} on:input={onChangePhrase} disabled={modus === Modus.CreateTicket} />
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" on:click={onCreateTicket} disabled={modus === Modus.CreateTicket}>Ask HR</button>
            </span>
        </div>
    </div>
    <div class="row">
        {#if modus === Modus.Search}
            <ShowQuickSuggestions config={config} phrase={phrase} />
        {:else}
            <CreateTicket bind:status={ticketStatus} config={config} phrase={phrase} on:click={onTicketFormClicked}/>
        {/if}
    </div>
</div>
{#if ticketStatus?.type === StatusType.success}
    <StatusStrip status={ ticketStatus } durationMs={4000}/>
{/if}

<style>
    .input-group{
        margin-top: 0.5em;
        margin-left: 0.5em;
        margin-bottom: 2em;
    }
</style>