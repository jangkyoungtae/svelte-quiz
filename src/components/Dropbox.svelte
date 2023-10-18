<script lang="ts">
  import Down from '$lib/icons/arrow_drop_down.svg'
  import Close from '$lib/icons/white-close.svg';
  import DownArrow from '$lib/icons/chevron-down.svg'
  import { createEventDispatcher } from 'svelte';


  export let selectedItems :string[];

  let dispatch = createEventDispatcher();
  interface optionItem {
    id:number;
    text:string;
    value:string;
  }
  let open = false; // 드롭다운이 열려 있는지 여부
  let options: optionItem[] = [
    {id: 0, text:"Table 1 • Floor 1",value:"Table 1 • Floor 1"},
    {id: 1, text:"Table 2 • Floor 1",value:"Table 2 • Floor 1"},
    {id: 2, text:"Table 3 • Floor 1",value:"Table 3 • Floor 1"},
    {id: 3, text:"Table 4 • Floor 1",value:"Table 4 • Floor 1"},
    {id: 4, text:"Table 5 • Floor 1",value:"Table 5 • Floor 1"},
    {id: 5, text:"Table 6 • Floor 1",value:"Table 6 • Floor 1"},
    {id: 6, text:"Table 7 • Floor 1",value:"Table 7 • Floor 1"},
    {id: 7, text:"Table 8 • Floor 1",value:"Table 8 • Floor 1"},
    {id: 8, text:"Table 9 • Floor 1",value:"Table 9 • Floor 1"},
    {id: 9, text:"Table 10 • Floor 1",value:"Table 10 • Floor 1"}
  ];

  function toggleDropdown() {
    open = !open;
  }
 
  function selectOption(option: optionItem) {
    
    if (selectedItems.find((item)=>item === option.value)) {
      selectedItems = selectedItems.filter((item) => item !== option.value);
    } else {
      selectedItems = [...selectedItems, option.value];
    }
    dispatch('childItemsChange', selectedItems);
  }
  function removeOption(e:MouseEvent |KeyboardEvent,option: string) {
    e.stopPropagation();
    selectedItems = selectedItems.filter((item) => item !== option);
    dispatch('childItemsChange', selectedItems);
  }
</script>

<div class="dropdown" class:open role="button" tabindex={0} on:keypress={toggleDropdown} on:click={toggleDropdown}>
  <label for="dropdown">Select Table</label>
  <div class="selected-items">
    <div class="selected-items-box">
      {#each selectedItems as item (item)}
        <div class="selected-item" >
          {item}
          <span class="remove-item" role="button" tabindex=0 on:keypress={(k) => removeOption(k,item)} on:click={(e) => removeOption(e,item)}><img class="close-icon" color={'#ffffff'}  src={Close} alt=""></span>
        </div>
      {/each}
      {#if !selectedItems || selectedItems.length <= 0}
        <span>테이블을 선택해주세요.</span>
      {/if}
    </div>
    <i class="dropdown-icon"><img src={Down} alt=""></i>
  </div>
  
  <div class="options" class:open>
    {#each options as option (option)}
      <div
        class="option"
        role="button"
        tabindex=0
        on:keypress={() => selectOption(option)}
        on:click={() => selectOption(option)}
      >
        {option.value}
        <div class="hidden" class:selected={selectedItems.find((item)=>item === option.value)}><img src={DownArrow} alt="아래 화살표" ></div>
      </div>
    {/each}
  </div>
</div>

<style>
  .dropdown {
    display: flex;
    position: relative;
    cursor: pointer;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 10px;
    flex:1;
    margin-left: 50px;
  }
  .dropdown label{
    display: inline-block;
    position: absolute;
    top: -18px;
    left: 14px;
    padding: 8px;
    padding-bottom: 3px;
    background: white;
    font-size: 14px;
    color: #888;
  }
  .selected-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex:1;
    justify-content: space-between;
  }
  .selected-items-box {
    display: flex;
    flex-wrap: wrap;
  }
  .selected-items-box span{
    color: #A8A29E;
  }
  .selected-item {
    background-color: #dddddd;
    color: black;
    border-radius: 100px;
    padding: 8px 15px;
    margin: 2px;
    gap:5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .selected-item .remove-item {    
    display: flex;    
    cursor: pointer;
  }

  .dropdown-icon {
    margin-left: 8px;
  }
  .close-icon{
    object-fit: cover;
    width: 10px;
    border-radius: 100px;
    padding: 3px;
    background-color: #A8A29E;
    color:white;
  }
  .options {
    width: 100%;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    max-height: 300px;
    overflow-y: auto;
  }

  .options.open {
    display: block;
  }

  .option {
    height: 1rem;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .hidden{
    display: none;
  }
  .selected {
    display: block;    
  }
</style>
