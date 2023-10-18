<!-- Modal.svelte -->
<script>
	import { createEventDispatcher } from "svelte";
	import Button from "./Button.svelte";
  import Trash from "$lib/icons/trash.svg"
  
  export let isModalOpen = false;
  let dispatch = createEventDispatcher();
</script>

{#if isModalOpen}
  <div class="modal">
    <div class="modal-content">
      <slot></slot>
      <div class="modal-btn">
        <div class="trash-btn">
          <Button Icon={Trash} onClick={()=>dispatch('modalOpen')}/>
        </div>
        <button class="save-btn" on:click={() => dispatch('modalOpen')}>Save</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .trash-btn{
    display: flex;
    flex:1;
  }
  .modal-btn{
    height: 3rem;
    display: flex;
    gap:10px;
    flex-direction: row;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    gap:15px;
    background: white;
    padding: 40px;
    width: 30%;
    border-radius: 5px;
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
</style>
