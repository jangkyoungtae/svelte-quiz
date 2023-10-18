<script lang="ts">
	import ReservationCard from "../components/ReservationCard.svelte";
  	import { reservationData, type IReservationData } from "../util/store";
    let reservations:Array<IReservationData>;
    reservationData.subscribe((v)=> {
      console.log(v);
     return reservations = v
    })
</script>

<div class="container">
  {#each reservations as reservation (reservation)}
    {#if reservation.status}
      <ReservationCard reservation={reservation}/>
    {/if}
  {/each}
</div>

<style>
  .container{
    display: flex;
    flex-wrap: wrap;
    flex:1;
    gap:2rem;
    padding: 24px;
  }
  
</style>