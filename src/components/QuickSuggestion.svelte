<script lang="ts">
    import type { IAnswer } from "$lib/lightHR/interfaces/IAnswer";
    export let answer: IAnswer = {topic: "Example", description: "This is an example!", ranking: 1};
</script>

{#if answer != null}
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-1">
                <h4>{answer.topic}</h4>
            </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-success">Helped me</button>
                </div>
        </div>
        <div class="well">
            {answer.description}
        </div>
    </div>
{/if}

<style>
</style>