<script lang="ts">    	
	import ShowQuickSuggestions from './ShowQuickSuggestions.svelte';
    
    export let phrase = "";
    export let placeholder = "";

    function changePhrase(eventArgs: any){
        phrase = eventArgs.target.value;
    }

</script>
    <div class="input-group input-group-lg m-5">        
        <input type="text" class="form-control" value={phrase} placeholder={placeholder} on:input={changePhrase} />
        <span class="input-group-btn">
            <button class="btn btn-default" type="button">Create ticket</button>
        </span>
    </div>
    
    <ShowQuickSuggestions phrase={phrase} />
    <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>

<style>
    .input-group{
        width: 800px;
        margin-top: 0.5em;
        margin-left: 0.5em;
        margin-bottom: 2em;
    }
</style>