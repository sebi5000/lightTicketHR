<script lang="ts">

export let id = "";
export let label = "";
export let value = "";
export let placeHolder = "";
export let multiRow = false;
export let minLength = 50;
export let maxLength = 500;

let actualLength = value.length;
$:actualLength;

function onInputChanged(eventArgs: any){
    actualLength = eventArgs.target.value.length;
}

</script>

{#if label.length > 0}
    <label for={id} class="form-label">{label}</label>
{/if}
{#if multiRow}
    <textarea id={id} class="form-control" placeholder={placeHolder} rows="3" bind:value={value} maxlength={maxLength} minLength={minLength} on:input={onInputChanged} />
{:else}
    <input id={id} class="form-control" placeholder={placeHolder} bind:value={value} minlength={minLength} maxlength={maxLength} on:input={onInputChanged} />
{/if}

{#if minLength <= 0}    
    <span style="background-color: smoke;" class="pull-right label label-default" id="description_count">{actualLength} / {maxLength}</span>
{:else}
    {#if actualLength <= maxLength &&
        actualLength >= minLength}
    <span style="background-color: green;" class="pull-right label label-default" id="description_count">{minLength} / {actualLength} / {maxLength}</span>
    {:else}
    <span style="background-color: smoke;" class="pull-right label label-default" id="description_count">{minLength} / {actualLength} / {maxLength}</span>
    {/if}

{/if}

<style>
    textarea{
        resize: none;
    }
    label{
        margin-top: 0.5em
    }
</style>