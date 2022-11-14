<script lang="ts">
    import { StatusType } from '$lib/common/enumerations';
    import type {IStatus} from '../../lib/common/interfaces/IStatus';

    export let status: IStatus;
    export let durationMs = 0;

    let statusClass = "";

    switch(status?.type){
        case StatusType.info:
            statusClass = "info";
            break;
        case StatusType.warning:
            statusClass = "warning";
            break;
        case StatusType.error:
            statusClass = "danger";
            break;
        default:
            statusClass = "success";
            break;
    }

    async function showStripAsync(duration: number){
        return new Promise((resolve => setTimeout(resolve, duration)));
    }

</script>

{#if status}
    {#await showStripAsync(durationMs)}
        <div class="alert alert-{statusClass}" role="alert"> 
            <h4 class="alert-heading">({status?.code}) {status?.shortMessage}</h4>
            <p>{status?.longMessage}</p>
        </div>
    {/await}
{/if}