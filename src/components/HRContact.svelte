<script lang="ts">
	import type { ITicketCategory } from "$lib/lightHR/interfaces/ITicket";
    import { LightHRServiceFactory } from '$lib/lightHR/classes/LightHRServiceFactory';
    import type { IConfiguration } from '$lib/lightHR/interfaces/IConfiguration';
	import { error } from "@sveltejs/kit";
    
    export let config: IConfiguration;
    export let category: ITicketCategory;

    async function getResponseTime(category: ITicketCategory): Promise<Number>{
        
        const service = LightHRServiceFactory.build(config);
        let estimatedHours = await service.estimateResponseTimeAsync(category);

        if (estimatedHours === 0){
            throw error(400, "Can't estimate a response Time");
        }

        return estimatedHours;
    }

</script>

<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
    <div class="col-md-4">
        <img src="/call_center.webp" class="img-fluid rounded-start" alt="Call Center">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            
            {#if category?.contact === null || category?.contact === undefined}
                <h5 class="card-title">1st Level Support</h5>
                <p class="card-text">Your concern will be handled by our awesome 1st Level Support</p>
            {:else}
                <h5 class="card-title">{category?.contact?.name}</h5>
                <p class="card-text">{category?.contact?.description}</p>
                
                {#await getResponseTime(category)}                
                    <p class="card-text"><small class="text-muted">AskHR calculates the expected Response Time...</small></p>
                {:then ResponseTimeInHours}
                    <p class="card-text"><small class="text-muted">AskHR expects a response time of {ResponseTimeInHours} hours.</small></p>
                {:catch}
                    <p class="card-text"><small class="text-muted">AskHR couldn't calculate the expected Response Time</small></p>
                {/await}

            {/if}    
            </div>
        </div>
    </div>
</div>

<style>
    img{
        max-width: 400px;
        max-height: 200px;
    }
</style>