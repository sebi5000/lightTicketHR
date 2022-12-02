<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type { Options } from './TableUtils';
    import type { Column } from './TableUtils';
    import type { Row } from './TableUtils';

    export let options: Options = { maxRows: 10 }

    export let columns: Array<Column> = [{key:"id", title:"Id", sortable:true, useHTML:false, format: (id: number) => { return id.toString() }},
                                    {key:"issuer", title:"Issuer", sortable:false,useHTML:false, format: (issuer: string) => { return issuer.toString() }},
                                    {key:"subject", title:"Subject", sortable:false, useHTML:false, width:"200px", format: (subject: string) => { return subject.toString() }},
                                    {key:"prio", title:"Priority", sortable:true, useHTML:true,format: (prio: string) => { return "<b>" + prio.toString() + "</b>" }},
                                    {key:"issuedOn", title:"Issued On", sortable:true,useHTML:false, format: (issuedOn: Date) => { return issuedOn.toLocaleString() }}];

    export let rows = [{id:1,issuer:"test@test.com",  subject:"No valid Visa on 23.11.", prio:"Very Urgent", issuedOn: new Date(2022,10,21,13,0)},
                       {id:2,issuer:"test2@test.com", subject:"Sickness last Monday", prio:"Urgent", issuedOn: new Date(2022,10,21,13,0)},
                       {id:3,issuer:"test3@test.com", subject:"Missing Working-Time", prio:"Normal", issuedOn: new Date(2022,11,19,14,0)},
                       {id:4,issuer:"test4@test.com", subject:"Question about JobTicket", prio:"Normal", issuedOn: new Date(2022,9,21,7,0)},
                       {id:5,issuer:"test5@test.com", subject:"Issue with Travel Costs", prio:"Normal", issuedOn: new Date(2022,11,21,12,0)}];
       
    //With keyof typeof we get a Tupel which can be used for dynamic property access
    //with this trick we create an ObjectKey for the column key, which enables us to be flexibel
    //in sorting columns, so far the key correct
    let ascending = false;
    type ObjectKey = keyof typeof rows[0];

    function onSort(col: Column){
        
        const propKey = col.key as ObjectKey;

        if (ascending){
            rows.sort((x,y) => (x[propKey] > y[propKey] ? 1 : -1)); 
            ascending = false;
        }else{
            rows.sort((x,y) => (x[propKey] > y[propKey] ? -1 : 1));
            ascending = true;
        }
        
        rows = rows; //rerender Table
    }

    const dispatchOnRowClick = createEventDispatcher();
    function onRowClick(eventArgs: any){
        const row = rows.find(x=>x.id.toString() === eventArgs.currentTarget.id);
        dispatchOnRowClick('onRowClick',{row: row});
    }
</script>

<table class="table table-striped">
    <thead>
        <tr>
            {#each columns as col}
                {#if col.width !== undefined}
                    <th scope="col" width={col.width}>
                        {col.title}
                        {#if col.sortable}
                            <button type="button" class="btn btn-xs" on:click|trusted={() => onSort(col)}><span class="bi-arrow-down-up" /></button>
                        {/if}
                    </th>
                {:else}
                    <th scope="col">
                        {col.title}
                        {#if col.sortable}
                            <button type="button" class="btn btn-xs" on:click|trusted={() => onSort(col)}><span class="bi-arrow-down-up" /></button>
                        {/if}
                    </th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows.slice(0, options.maxRows) as row}
            <tr id={""+row.id} on:click={onRowClick}>
                {#each columns as col}
                <td>
                    {#each Object.entries(row) as combValue}
                        {#if combValue[0] === col.key}
                            {#if col.useHTML}
                                {@html col.format(combValue[1])}
                            {:else}
                                {col.format(combValue[1])}
                            {/if}
                        {/if}
                    {/each}
                </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>