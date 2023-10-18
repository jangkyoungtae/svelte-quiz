<script>
  import { createEventDispatcher } from 'svelte';

  export let selectedDate = '';

  const dispatch = createEventDispatcher();

  function handleDateSelection() {
    dispatch('dateSelected', {
      date: selectedDate
    });
  }
</script>

<input
  type="date"
  bind:value={selectedDate}
  on:change={handleDateSelection}
>