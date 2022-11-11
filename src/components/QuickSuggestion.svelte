<script lang="ts">
    import type { IAnswer } from "$lib/lightHR/interfaces/IAnswer";
    export let answer: IAnswer = {topic: "Example", description: "This is an example!", ranking: 1};
</script>

{#if answer != null}
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                <h4>{answer.topic}</h4>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-success">Helped me</button>
            </div>
        </div>
        <div class="well">
            {@html answer.description}
        </div>
    </div>
{/if}

<style>
</style>