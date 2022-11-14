<script lang="ts">
	import CreateTicket from "../../components/CreateTicket.svelte";
    import StatusStrip from '../../components/common/StatusStrip.svelte';
    import Logo from '../../components/common/Logo.svelte';
    import { globalConfig } from '../../stores/configStore';
    import {get} from 'svelte/store';
    import { StatusType } from '../../lib/common/enumerations';
    import type {IStatus } from '../../lib/common/interfaces/IStatus';
    
    let config = get(globalConfig);
    let status: IStatus;

</script>

<div class="text-center">
    <Logo />    
</div>
<CreateTicket config={config} phrase="" bind:status={status} sendRoute="/" cancelRoute="/"/>

{#if status !== undefined && status.type === StatusType.success}
    <StatusStrip status={ status } durationMs={3000}/>
{/if}