<script lang="ts">
	import CreateTicket from "../../components/CreateTicket.svelte";
    import StatusStrip from '../../components/common/StatusStrip.svelte';
    import { globalConfig } from '../../stores/configStore';
    import {get} from 'svelte/store';
    import { StatusType } from '../../lib/common/enumerations';
    import type {IStatus } from '../../lib/common/interfaces/IStatus';
    import { page } from '$app/stores';
    
    const phrase = $page.url.searchParams.get('phrase') as string;
    let config = get(globalConfig);
    let status: IStatus;
</script>
<CreateTicket config={config} phrase={phrase} bind:status={status} sendRoute="/" cancelRoute="/"/>

{#if status !== undefined && status.type === StatusType.success}
    <StatusStrip status={ status } durationMs={3000}/>
{/if}