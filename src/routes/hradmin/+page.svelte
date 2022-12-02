<script lang="ts">
    import Table from '../../components/common/table/Table.svelte';
    import type { Options } from '../../components/common/table/TableUtils';
    import type { Column } from '../../components/common/table/TableUtils';

    let options: Options = { maxRows: 4 }

    let columns: Array<Column> = [{key:"id", title:"Id", sortable:true, useHTML:false, format: (id: number) => { return id.toString() }},
                                  {key:"prio", title:"Priority", sortable:true, useHTML:true,format: (prio: string) => { return "<b>" + prio.toString() + "</b>" }},
                                  {key:"responseTime", title:"Expected/Open", sortable:false, useHTML:true,format: (time: string) => { return "<b>" + time.toString() + "</b>" }},
                                  {key:"category", title:"Category", sortable:true, useHTML:false,format: (category: string) => { return category.toString() }},                                  
                                  {key:"subject", title:"Subject", sortable:false, useHTML:false,width:"350px",format: (subject: string) => { return subject.toString() }},                                  
                                  {key:"issuer", title:"Issuer", sortable:false,useHTML:false, format: (issuer: string) => { return issuer.toString() }},
                                  {key:"issuedOn", title:"Issued On", sortable:true,useHTML:false, format: (issuedOn: Date) => { return issuedOn.toLocaleString() }}];

    let rows = [{id:1,issuer:"test@test.com",  subject:"No valid Visa on 23.11.", prio:"Very Urgent",responseTime:"4/2", category:"Onboarding", issuedOn: new Date(2022,10,21,13,0)},
                {id:2,issuer:"test12@test.com", subject:"Sickness last Monday", prio:"Urgent",responseTime:"13/5", category:"Sickness", issuedOn: new Date(2022,10,21,13,0)},
                {id:3,issuer:"test13@test.com", subject:"Missing Working-Time", prio:"Normal",responseTime:"32/5", category:"Working-Time", issuedOn: new Date(2022,11,19,14,0)},
                {id:4,issuer:"test14@test.com", subject:"Question about JobTicket", prio:"Normal",responseTime:"32/30", category:"Benefits", issuedOn: new Date(2022,9,21,7,0)},
                {id:5,issuer:"test15@test.com", subject:"Issue with Travel Costs", prio:"Normal", responseTime:"32/28", category:"Travel", issuedOn: new Date(2022,11,21,12,0)}];

    function onTicketClicked(eventArgs: any){
        console.log(eventArgs.detail.row);
    }
</script>

<div class="container">    
    <Table options={options} rows={rows} columns={columns} on:onRowClick={onTicketClicked} />
</div>

<style>

</style>