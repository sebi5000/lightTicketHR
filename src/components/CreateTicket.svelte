<script lang="ts">
	import { LightHRServiceFactory } from '$lib/lightHR/classes/LightHRServiceFactory';
    import type { IConfiguration } from '$lib/lightHR/interfaces/IConfiguration';
    import type { ITicket, ITicketCategory } from '../lib/lightHR/interfaces/ITicket';
    import TextEdit from './common/TextEdit.svelte';
    import type { IStatus } from '../lib/common/interfaces/IStatus';
    
    export let config: IConfiguration;
    export let phrase = "";
    export let status: IStatus;
    
    let ticket: ITicket = {id:"", subject:"", issuerEmail:"", description:"", categoryId: "", attachments: null}
    ticket.subject = phrase;    

    let valid: boolean = false;
    $: {
        valid = ticket.subject.length >= config.createTicketOptions.minSubjectLength &&
                ticket.subject.length <= config.createTicketOptions.maxSubjectLength &&
                ticket.description.length >= config.createTicketOptions.minDescriptionLength &&
                ticket.description.length <= config.createTicketOptions.maxDescriptionLength;
    }    

    async function getCategoriesAsync(config: IConfiguration){

        let categories: ITicketCategory[] = [];

        //Check if values are assigned by configuration (lightConfig.json)
        if(config?.ticketCategories?.length > 0){      
            config?.ticketCategories?.forEach(category => {
                categories.push({ key: category.id, name: category.name, initialSelected: category.initialSelected });
            });
        //if not set via configuration, use the hook to determine categories
        }else{
            const factory = LightHRServiceFactory.build(config);
            categories = await factory.getTicketCategoriesAsync();
        }

        return categories;
    }

    function onCategoryChanged(eventArgs: any){
        ticket.categoryId = (<HTMLSelectElement>document.getElementById("ticket-category"))?.value;
    }

    async function onCreateTicketAsync(eventArgs: any){
        const factory = LightHRServiceFactory.build(config);
        status = await factory.createTicketAsync(ticket);
    }

</script>

<form class="needs-validation" on:submit|preventDefault={onCreateTicketAsync}>
    <div class="mb-3">
        <label for="ticket-email" class="form-label">@E-Mail</label>
        <input type="email" class="form-control" disabled={true} id="ticket-email" placeholder="name@company.com" value={ticket.issuerEmail}>
    </div>
    <div class="mb-3">
        <TextEdit id="ticket-subject" label="Subject" bind:value={ticket.subject} minLength={config.createTicketOptions.minSubjectLength} maxLength={config.createTicketOptions.maxSubjectLength} />
    </div>    
    {#if config?.createTicketOptions?.useCategories}
        <div class="mb-3">
            <label for="ticket-category" class="form-label">Category</label>
            <select class="form-select form-control" id="ticket-category" on:change={onCategoryChanged}>
                
                {#await getCategoriesAsync(config)}
                    <option value="-1">Loading...</option>
                {:then categories}
                    {#each categories as category}
                        <option value={category.key} selected={category.initialSelected}>{category.name}</option>
                    {/each}
                {/await}

            </select>
        </div>
    {/if}
    <div class="mb-3">        
        <TextEdit id="ticket-description" label="Description" multiRow={true} bind:value={ticket.description} minLength={config.createTicketOptions.minDescriptionLength} maxLength={config.createTicketOptions.maxDescriptionLength } />
    </div>
    <div class="mb-3">
        <label for="fileUpload">Upload Attachments</label>
        <input id="fileUpload" class="form-control" type="file" multiple={true} accept={config.createTicketOptions.allowedFileTypes} bind:files={ticket.attachments} />
    </div>
    <button type="submit" class="btn btn-primary mb-3" id="ticket-send" disabled={!valid} on:click>Send</button>
    <button type="button" class="btn btn-danger mb-3" id="ticket-cancel" on:click>Cancel</button>
</form>

<style>    
    button{        
        margin: 0.25em;
        margin-top: 2em;
    }
    label{
        margin-top: 0.5em;
    }
</style>