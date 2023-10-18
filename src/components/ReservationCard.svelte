<script lang="ts">
	import { reservationData, type IReservationData } from "../util/store";
  import Phone  from "$lib/icons/phone.svg"
  import Calendar  from "$lib/icons/event_available.svg"
  import Group  from "$lib/icons/group.svg"
  import Trash  from "$lib/icons/trash.svg"
	import Button from "./Button.svelte";
	import { leftPad, navigateTo } from "../util/utils";
	import { goto } from "$app/navigation";
  export let reservation :IReservationData;
  let reservationDate :string;

  function deleteReservation(id:number){
    reservationData.update((reservate)=>{
      let res = reservate.filter((v)=>v.id !== id);
      return res;
    })
  }
  function updateReservationStatus(id:number){
    reservationData.update((reservate)=>{
      let selcetData =  reservate.map((v)=>{
        if(v.id===id){
          return {...v, status:!v.status}
        }
        return v;
      })
      return selcetData;
    })
  }
  function formatDateDate(date:Date | string) {
    const selectedDateObject = new Date(date);
    let hours = selectedDateObject.getHours();
    let minutes = selectedDateObject.getMinutes();
    let ampm = hours >= 12 ? 1 : 2;
    console.log(date)
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    let timeValue = hours.toString()+":"+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
    let formattedDate= selectedDateObject.toLocaleDateString("en", options);
    reservationDate = formattedDate+", "+timeValue
  }
  if(reservation?.reservationDate){
    formatDateDate(reservation?.reservationDate)
  }
</script>

<div class="card" role="button" tabindex=0 on:click={()=>goto(`/edit-reservation/${reservation.id.toString()}`,{state:{id:reservation.id.toString()}})}>
  <div class="first-line-box">
    <div class="name-box"><p>{reservation.customerName}</p></div>
    <div class="phone-box"><img src={Phone} alt="phone"/>{reservation.phoneNumber}</div>
  </div>
  <div class="line-box">
    <img src={Calendar} alt="phone"/>
    <div>{reservationDate}</div>
  </div>
  <div class="line-box">
    <img src={Group} alt="group"/>
    <div>{reservation.guestCount}</div>
  </div>
  <div class="line-box">
    {#if reservation.tables?.length > 0}
      <div>Reserved Table 
        <span>
          {reservation.tables.map((v)=>v.split("•")[0].replace("Table ",""))}
        </span>
      • Floor 1</div>
      {:else}
      <p class="no-select">
        No Selected Table
      </p>
      {/if}
  </div>
  <div class="line-box">
    {#if reservation.content?.length > 0}
      <div class="content-box">{reservation.content}</div>
    {/if}
  </div>
  <div class="btn-box">
    <div class="trash-btn">
      <Button Icon={Trash} onClick={()=>{
        deleteReservation(reservation.id);
      }}/>
    </div>
    <button class="save-btn" on:click={() => {
      updateReservationStatus(reservation.id);
    }}>Seated</button>
  </div>

</div>



<style>
  .card{
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: min-content;
    gap:15px;
    width: calc(100% / 3 - 48px - 6px);
    border: 1px solid none;
    background-color: black;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    padding: 16px;
    box-shadow: 0px 0px 15px #A8A29Edd;
  }
  .name-box{
    width: 35%;
    overflow: hidden;
    
  }
  .content-box::after{
    content: url( "$lib/icons/edit.svg" );
  }
  .name-box p{
    padding: 0;
    margin: 0;
    width: 100%;
    color:#888888;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .first-line-box{
    display: flex;
    flex-wrap: nowrap;  
    align-items: center;
    height: 3rem;
    font-size: 1rem;
    gap:10px;
    overflow: hidden;
  }
  .line-box{
    display: flex;  
    align-items: center;
    height: 2rem;
    font-size: 1rem;
    gap:10px;
    overflow: hidden;
  }
  .no-select{
    font-size: 1rem;
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-style: italic;
    color: #A8A29E;
  }
  .line-box span{
    font-size: 1.2rem;
    font-weight: 600;
  }
  .phone-box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    gap:5px;
    width: 135px;
    height: 1.5rem;
    color:#888888;
    font-weight: 600;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 2rem;
    white-space: nowrap;
    background: linear-gradient(to bottom , #ffffff,#f8f8f8, #dddddd);
    box-shadow: 0px 0px 10px #A8A29Edd;
  }
  .trash-btn{
    display: flex;
    flex:1;
  }
  .save-btn{
      box-shadow: 0px 0px 10px #A8A29Edd;
      background: linear-gradient(to bottom , #fe392e, #fa2d22,#fe392e);
      border: none;
      cursor: pointer;
      color: white;
      flex:4;
      font-size: 1.2rem;
      border-radius: 8px;
      &:disabled{
        background: #f06b64;
        color: #dddddddd;
      }
    }
    .btn-box{
      margin-top: 20px;
      height: 3rem;
      display: flex;
      gap:20px;
      flex-direction: row;
    }
</style>