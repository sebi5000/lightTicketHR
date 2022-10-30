<script lang="ts">
	import { LightHRServiceFactory } from '$lib/lightHR/classes/LightHRServiceFactory';
	import QuickSuggestion from './QuickSuggestion.svelte';
    import type {IAnswer} from '../lib/lightHR/interfaces/IAnswer';
	import type { IConfiguration } from '$lib/lightHR/interfaces/IConfiguration';

    export let config: IConfiguration;
    export let phrase = "";    
    $: phrase;    

    async function getSuggestionsAsync(phrase: string){

        let suggestions: Array<IAnswer> = [];
        const factory = LightHRServiceFactory.build(config);
        suggestions = await factory.getSuggestionsAsync(phrase);

        return suggestions;
    }

</script>

{#if phrase.length > 10}
    {#await getSuggestionsAsync(phrase)}
        <p>Loading...</p>
    {:then answers}
        {#if answers.length > 0}
            {#each answers as answer}
                <QuickSuggestion answer={answer} />
            {/each}
        {:else}
            <h4>Nothing Found - please create a ticket.</h4>
        {/if}
    {/await}
{/if}

<style>
    QuickSuggestion{
        margin: 0.5em;
    }
</style>