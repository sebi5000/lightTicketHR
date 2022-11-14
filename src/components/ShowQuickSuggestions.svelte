<script lang="ts">
	import { LightHRServiceFactory } from '$lib/lightHR/classes/LightHRServiceFactory';
	import QuickSuggestion from './QuickSuggestion.svelte';
	import type { IConfiguration } from '$lib/lightHR/interfaces/IConfiguration';
	import { HTTPStatusCode } from '$lib/common/enumerations';

    export let config: IConfiguration;
    export let phrase = "";    
    $: phrase;    

    async function getSuggestionsAsync(phrase: string){

        const factory = LightHRServiceFactory.build(config);
        let answerResponse = await factory.getSuggestionsAsync(phrase);

        if (answerResponse?.status?.status_code !== HTTPStatusCode.ok){
            throw new Error(answerResponse.status.detail);
        }

        return answerResponse?.answers;
    }

</script>

{#if phrase.length >= config.questionOptions?.minLength}
    {#await getSuggestionsAsync(phrase)}
        <p>Loading...</p>
    {:then answers}
        {#if answers.length > 0}
            {#each answers as answer}
                <div class="quick-suggestions">
                    <QuickSuggestion answer={answer} />
                </div>
            {/each}
        {:else}
            <h4>Nothing Found - please create a ticket.</h4>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
{:else}
    <p>Please enter meaningfull question, with a minimum of {config.questionOptions?.minLength} characters. So we can find a suitable solution.</p>
{/if}

<style>
    .quick-suggestions{
        margin-top: 0.5;
    }
</style>