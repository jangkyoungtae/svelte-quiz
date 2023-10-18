<script lang="ts">
	import Button from "../../../components/Button.svelte";
  import Calendar from "$lib/icons/event_available.svg"
  import Plus from "$lib/icons/math-plus.svg"
  import Minus from "$lib/icons/math-minus.svg"
  import Time from "$lib/icons/alarm_on.svg"
  import Today from "$lib/icons/today.svg"
  import Trash from "$lib/icons/trash.svg"
  import Up from "$lib/icons/chevron-up.svg"
  import Down from "$lib/icons/chevron-down.svg"
  import Dropbox from "../../../components/Dropbox.svelte";
  import Modal from '../../../components/Modal.svelte';
  import { DatePicker } from 'date-picker-svelte';
  import { spring } from 'svelte/motion';
	import { leftPad } from "../../../util/utils";
	import { reservationData, type IReservationData } from "../../../util/store";
  import { page } from "$app/stores";
  let id: string;

  page.subscribe((v)=>{
    id =v.params.id
  })
  

  function goToAboutPage() {
    window.history.back();
  }

  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  var ampm = hours >= 12 ? 1 : 2;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes_count = spring();
  $: minutes_count.set(minutes);
  $: minuteOffset = modulo($minutes_count, 1);

  const hour_count = spring();
  $: hour_count.set(hours);
  $: hourOffset = modulo($hour_count, 1);
  const ampm_count = spring();
  $: ampm_count.set(ampm);
  $: ampmOffset = modulo($ampm_count, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }
  let isModalOpen = false;
  let selectedItems: string[] = [];
  let count  = 0;
  let divElement : HTMLDivElement;
  let nameValue = "";
  let phoneValue = "";
  let content = "";
  let selectedDate : Date;
  let formattedDate = '';
  let isDatePickerOpen = false;
  let timeValue :string =hours.toString()+":"+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");

  reservationData.subscribe((reservation)=>{
    console.log(id,"page")
    let findData = reservation.find((data)=>{
      return id === data.id.toString()
    })
    content = findData?.content ?findData?.content:"";
    nameValue = findData?.customerName ?findData?.customerName:"";
    phoneValue = findData?.phoneNumber ?findData?.phoneNumber:"";
    count = findData?.guestCount ? findData?.guestCount : 0;
    selectedItems = findData?.tables ? findData?.tables?.length> 0 ? findData?.tables :[] : []
    selectedDate = findData?.reservationDate ? new Date(findData?.reservationDate) :new Date();
    formatDateDate(selectedDate);
  })
  function openDatePicker() {
    console.log(isDatePickerOpen)
    isDatePickerOpen = !isDatePickerOpen;
  }
  function onChangeName(e :Event){
    nameValue = (e.target as HTMLInputElement).value;
  }
  function onChangePhone(e :Event){
    phoneValue = (e.target as HTMLInputElement).value;
  }
  function onModalOpen() {
    isModalOpen = !isModalOpen;
  }
  function updateParentItems(newItems: CustomEvent<string[]>) {
    selectedItems = newItems.detail;
  }
  function formatDate(e:any) {
    const selectedDateObject = new Date(e.detail);
    selectedDate = e.detail;
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    formattedDate = selectedDateObject.toLocaleDateString("en", options);
    openDatePicker();
  }
  function formatDateDate(date:Date) {
    const selectedDateObject = new Date(date);
    hours = selectedDateObject.getHours();
    minutes = selectedDateObject.getMinutes();
    ampm = hours >= 12 ? 1 : 2;
    selectedDate = date;
    console.log(date)
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    timeValue = hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
    formattedDate= selectedDateObject.toLocaleDateString("en", options);
  }

  function changeAMPM(){
    if(ampm === 1){
      ampm += 1;
      timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      return
    }
    if(ampm === 2){
      ampm -= 1;
      timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      return
    }
  }
  function handleSave(){
    if(nameValue?.length > 0 && phoneValue?.length > 0 && count > 0 && formattedDate?.length > 0){
      
      reservationData.update(reservations => {
        console.log(reservations[reservations?.length-1],"id")
        let data = {
          id:Number(id),
          customerName:nameValue,
          phoneNumber:phoneValue,
          reservationDate:selectedDate.toString(),
          guestCount:count,
          content:content,
          tables:selectedItems,
          status:true,
        }
        return reservations.map((v)=>{
          if(v.id.toString() === id){
            return data;
          }
          return v
        })
      });
      goToAboutPage();
    }
  }
</script>

<div class="add-container">
  
  <div class="flex">
    <div class="line-box">
      <div class="dust-class">
        <label for="name">Name<span>* </span></label>
        <input type="text" name="name" class="txt-input" id="name" placeholder="Name" bind:value={nameValue} on:change={onChangeName}>
      </div>
      <div class="dust-class">
        <label for="phone">Phone<span>* </span></label>
        <input type="text" name="phone" class="txt-input" id="phone" placeholder="Phone" bind:value={phoneValue} on:change={onChangePhone}>
      </div>
      <div class="dust-class "> 
        <Button Icon={Calendar} text={!formattedDate ? "Select Date" : formattedDate+", "+timeValue} colors="text-grey" onClick={()=>isModalOpen = true}/>
      </div>
    </div>
  </div>
  
  <div class="flex">
    <div class="line-box">
      Guests
      <div class="count-box">
        <Button Icon={Minus} onClick={()=>{
          if(count>0){
            count -=1
          }
        }}/>
        <p>{count}</p>
        <Button Icon={Plus} onClick={()=>count +=1}/>
      </div>
      <Dropbox {selectedItems} on:childItemsChange={updateParentItems}/>
    </div>
    
  </div>
  <div 
    class="text-area"  
    bind:this={divElement}
    on:input={()=>content = divElement.innerHTML}
    contenteditable
    placeholder={`Add Notes...`}
  >
    {content}
  </div>
  <div class="line-box">
    <div class="modal-btn">
      <div class="trash-btn">
        <Button Icon={Trash} onClick={()=>{
          
        }}/>
      </div>
      <button class="save-btn" disabled={!(nameValue?.length > 0 && phoneValue?.length > 0 && count > 0 && formattedDate?.length > 0)} type="submit" on:click={handleSave}>Seated</button>
    </div>
  </div>
</div>
<Modal {isModalOpen} on:modalOpen={onModalOpen}>
  <div class="modal-div">
    <img src={Time} alt="">
    <input type="text" name="time" readonly bind:value={timeValue}/>
  </div>
  <div class="modal-div">
    <img src={Today} alt="">
    <input type="text" name="date" bind:value={formattedDate} on:click={openDatePicker} placeholder="Select Date"  />
    {#if isDatePickerOpen}
      <div class="date-position">
        <DatePicker bind:value={selectedDate} on:select={formatDate} />
      </div>
    {/if}
    
  </div>
  <div class="time-box">
    <div class="time-item">
      <div on:click={()=>{
        if(hours > 0){
          hours-=1
        }
        if(hours <= 0){
          hours = 12
        }
        timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      }}><img src={Up} alt="" ></div>
      <div class="counter-viewport">
        <div class="counter-digits" style="transform: translate(0, {100 * hourOffset}%)">
          <strong class="hidden" aria-hidden="true">{leftPad(Math.floor($hour_count + 1))}</strong>
          <strong>{leftPad(Math.floor(hours))}</strong>
        </div>
      </div>
      <div on:click={()=>{
         if(hours < 13){
          hours+=1
        }
        if(hours >= 13){
          hours = 1
        }
        timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      }}><img src={Down} alt="" ></div>
    </div>
    :
    <div class="time-item">
      <div on:click={()=>{
         if(minutes > -1){
          minutes-=1
        }
        if(minutes <= -1){
          minutes = 59;
        }
        timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      }}><img src={Up} alt="" ></div>
      <div class="counter-viewport">
        <div class="counter-digits" style="transform: translate(0, {100 * minuteOffset}%)">
          <strong class="hidden" aria-hidden="true">{leftPad(Math.floor($minutes_count + 1))}</strong>
          <strong>{leftPad(Math.floor(minutes))}</strong>
        </div>
      </div>
      <div on:click={()=>{
        if(minutes < 60){
          minutes+=1
        }
        if(minutes >= 60){
          minutes = 0;
        }
        timeValue =hours.toString()+" : "+leftPad(minutes)+" "+ (ampm ===1 ? "AM" : "PM");
      }}><img src={Down} alt="" ></div>
    </div>
    <div class="time-item">
      <div on:click={changeAMPM}><img src={Up} alt="" ></div>
      <div class="counter-viewport">
        <div class="counter-digits" style="transform: translate(0, {100 * ampmOffset}%)">
          <strong class="hidden" aria-hidden="true">{$ampm_count === 1 ? "AM" : "PM"}</strong>
          <strong>{ampm ===1 ? "AM" : "PM"}</strong>
        </div>
      </div>
      <div on:click={changeAMPM}><img src={Down} alt="" ></div>
    </div>
  </div>
</Modal>
<style>
  input{
    font-family: 'Noto Sans KR','Noto Sans Korean', "Nanum Gothic", sans-serif !important;
    border: 0;
    outline: none;
    font-size: 10px;
  }
  input::placeholder{
    color: #d9d9d9
  }
  [contenteditable]:empty:before {
    content: attr(placeholder) ;
    color:#888;
  }
  [contenteditable]::after {
    content: url( "$lib/icons/edit.svg" );
  }
  .time-box{
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    gap:30px;
  }
  .time-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:10px;
  }
  .date-position{
    position: absolute;
    margin-left: 60px;
    top: 50px;
  }
  .add-container{
    flex:1;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 2em;
    padding-top: 5px;
  }
  .dust-class{
    flex:1;
    width: 100%;
    height: 3.5em;
    position: relative;
    padding-top: 12px;
  }

  .dust-class label{
    display: inline-block;
    position: absolute;
    top: -5px;
    left: 14px;
    padding: 10px;
    background: white;
    font-size: 14px;
    color: #888;
  }

  .dust-class label span{
    color: #da4841;
    vertical-align: -1px;
  }
  .dust-class input{
    flex:1;
    width: calc(100% - 32px);
    border: 1px solid #dddddd !important;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 8px;
    padding: 16px;
  }
  .modal-div{
    position: relative;
    display: flex;
  }
  .trash-btn{
    display: flex;
    flex:1;
  }
  .modal-btn{
    margin-top: 30px;
    height: 4rem;
    display: flex;
    flex:1;
    gap:60px;
    flex-direction: row;
  }
  .modal-div input{
    margin-left: 10px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    width: 100%;
    padding: 15px;
    padding-left: 25px;
    position: relative;
    padding-right: 25px;
    font-size: 1rem;
  }
  
  .count-box{
    display: flex;
    gap:30px;
    align-items: center;
    height: 4em;
    margin-left: 20px;
  }
  
  .flex{
    margin-bottom: 40px;
  }
  .line-box{
    display: flex;
    width: 100%;
    gap:24px;
    height: min-content;
    min-height: 4em;
    align-items: center;
  }
  .hidden{
    display: none;
  }
  .text-area{
    flex:1;  
    border: 1px solid #ddd;
    cursor: text;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #A8A29Edd;
    background: linear-gradient(to bottom , #ffffff, #f8f8f8);
    padding: 24px;
    resize: none;
    outline: none;
    font-size: 1.5rem;
  }

  .save-btn{
      box-shadow: 0px 0px 10px #A8A29Edd;
      background: linear-gradient(to bottom , #fe392e, #fa2d22,#fe392e);
      border: none;
      cursor: pointer;
      color: white;
      flex:5;
      font-size: 1.2rem;
      border-radius: 8px;
      &:disabled{
        background: #f06b64;
        color: #dddddddd;
      }
    }
  .counter-viewport {
		width: 1.3em;
		height: 1em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 1.5rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>