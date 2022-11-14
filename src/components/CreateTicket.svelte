<script lang="ts">
	import { LightHRServiceFactory } from '$lib/lightHR/classes/LightHRServiceFactory';
    import type { IConfiguration } from '$lib/lightHR/interfaces/IConfiguration';
    import type { ITicket, ITicketCategory } from '../lib/lightHR/interfaces/ITicket';
    import TextEdit from './common/TextEdit.svelte';
    import type { IStatus } from '../lib/common/interfaces/IStatus';
	import HrContact from './HRContact.svelte';
	import { error } from '@sveltejs/kit';
    
    export let config: IConfiguration;
    export let phrase = "";
    export let cancelRoute = "";
    export let sendRoute = "";
    export let status: IStatus;
    
    let ticket: ITicket = {id:"", subject:"", issuerEmail:"", description:"", category: { id:1, name:"", contact: {id:1, name:"", description:""}}, attachments: null}
    ticket.subject = phrase;

    let valid: boolean = false;
    $: {
        valid = ticket.subject.length >= config.createTicketOptions.minSubjectLength &&
                ticket.subject.length <= config.createTicketOptions.maxSubjectLength &&
                ticket.description.length >= config.createTicketOptions.minDescriptionLength &&
                ticket.description.length <= config.createTicketOptions.maxDescriptionLength;
    }
    let validSubject: boolean = false;
    $:{
        validSubject = ticket.subject.length >= config.createTicketOptions.minSubjectLength &&
                       ticket.subject.length <= config.createTicketOptions.maxSubjectLength;
    }

    async function onCreateTicketAsync(eventArgs: any){

        //TODO: WHILE(categoryIsLoaded)! Sicherstellen, dass Category abschließend geladen!

        const service = LightHRServiceFactory.build(config);
        status = await service.createTicketAsync(ticket);
    }

    async function getTicketCategory(ticket: ITicket): Promise<ITicketCategory>{
        let defaultCategory = {id: 0, name:"Other", contact:{id:0, name:"1st Level Support", description:"Our 1st Level Support take care of your concern."}}
        
        const service = LightHRServiceFactory.build(config);
        let categoryResponse = await service.getTicketCategoryAsync(ticket);

        if (!categoryResponse?.status?.isOk){
            ticket.category = defaultCategory;
            throw error(categoryResponse?.status?.status_code, categoryResponse?.status?.detail);
        }

        ticket.category = categoryResponse.category;
        return categoryResponse.category;
    }

</script>

<div class="container">
    <form class="needs-validation" on:submit|preventDefault={onCreateTicketAsync}>
        <div class="mb-3">
            <label for="ticket-email" class="form-label">@E-Mail</label>
            <input type="email" class="form-control" disabled={true} id="ticket-email" placeholder="name@company.com" value={ticket.issuerEmail}>
        </div>
        <div class="mb-3">
            <TextEdit id="ticket-subject" label="Subject" bind:value={ticket.subject} minLength={config.createTicketOptions.minSubjectLength} maxLength={config.createTicketOptions.maxSubjectLength} />
        </div>
        <div class="mb-3">        
            <TextEdit id="ticket-description" label="Description" multiRow={true} bind:value={ticket.description} minLength={config.createTicketOptions.minDescriptionLength} maxLength={config.createTicketOptions.maxDescriptionLength } />
        </div>
        <div class="mb-3">
            <label for="fileUpload">Upload Attachments</label>
            <input id="fileUpload" class="form-control" type="file" multiple={true} accept={config.createTicketOptions.allowedFileTypes} bind:files={ticket.attachments} />
        </div>

        {#if valid}
            <a href={sendRoute} role="button" class="btn btn-primary mb-3" id="ticket-send">Send</a>
        {:else}
            <a role="button" class="btn btn-primary mb-3" id="ticket-send" disabled={!valid}>Send</a>
        {/if}      
        <a href={cancelRoute} role="button" class="btn btn-danger mb-3" id="ticket-cancel">Cancel</a>
    </form>

    {#if validSubject}
        <div class="contact">
            {#await getTicketCategory(ticket)}
                <p>Loading...</p>
            {:then TicketCategory}
                <HrContact config={config} category={TicketCategory}/>
            {/await}
        </div>
    {/if}
</div>

<style>    
    a{        
        margin: 0.25em;
        margin-top: 2em;
    }
    label{
        margin-top: 0.5em;
    }
    .contact{
        margin-top: 5em;
    }
</style>