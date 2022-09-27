<script lang="ts">
    import type { IAnswer } from '../lib/interfaces/IAnswer';
	import QuickSuggestion from './QuickSuggestion.svelte';

    export let phrase = "";
    let answers: Array<IAnswer> = [];
    
    $:{
        if(phrase.length > 5 &&
           answers.length <= 5){

            //TODO: GET 5 TOP ANSWERS FROM SERVER OR CACHE
            answers.push({ topic: "Gleitzeit", description: "Ihre Gleitzeit können Sie hier einsehen", ranking: 1 });
            answers = answers;
        }else if(phrase.length < 5){
            answers = [];
        }
    }

</script>

{#each answers as answer}
    <QuickSuggestion answer={answer} />
{/each}

<style>
    QuickSuggestion{
        margin: 0.5em;
    }
</style>