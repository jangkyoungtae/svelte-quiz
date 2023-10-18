<script lang="ts">
	import { page } from '$app/stores';
	import closeBtn from '$lib/icons/close.svg';
	import backBtn from '$lib/icons/keyboard_backspace.svg'
	import addBtn from '$lib/icons/add.svg';
	import { onMount ,onDestroy} from 'svelte';
	
	import NavigateTopage from '../util/navigateTopage.svelte';
	import { goBack, navigateTo } from '../util/utils';
	import Button from '../components/Button.svelte';

  let pageTitle = '';

  // Subscribe to the `page` store and update the variable when the URL changes
  let unsubscribePage = ()=>{};
  onMount(() => {
    unsubscribePage = page.subscribe(($page) => {
      if ($page.url.pathname === '/') {
        pageTitle = 'Reservation';
      }
			if ($page.url.pathname === '/add-reservation') {
        pageTitle = 'New Reservation';
      }
			console.log($page.url.pathname)
			if ($page.url.pathname.includes('/edit-reservation')) {
        pageTitle = 'Edit Reservation';
      }
    });
  });

  onDestroy(() => {
    unsubscribePage();
  });
</script>

<header>
	<div class="header-box header-left">
		{#if $page.url.pathname === '/'}
		<div class="header-btn-box">
			<Button Icon={addBtn} onClick={()=>navigateTo('/add-reservation')} text="New Reservation" colors="text-red"/>
		</div>		
		{:else if $page.url.pathname !== '/'}
		<div class="header-btn-box">
			<Button Icon={backBtn} onClick={()=>goBack()} text="" colors="text-black"/>
		</div>
		{:else}
			<p>This is the default option</p>
		{/if}
		
	</div>
	<div class="header-box">
		<h1 class="title">{pageTitle}</h1>
	</div>
	
	<div class="header-box header-right">
		<button class="closed" >
			<img src={closeBtn} alt="추가하기"/>
		</button>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		background-color: white;
		padding-top: 8px;
		padding-bottom: 8px;
		width: 100%;
	}
	.header-btn-box{
		height: 3em;
		width: min-content;
	}
	.addBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
		color: #EC551F;
		font-weight: 600;
		border-radius: 5px;
		box-shadow: 0px 0px 10px #A8A29Edd;
		gap: 5px;
		height: 3em;
		background: linear-gradient(to bottom , #ffffff, #f8f8f8);;
		border: none;
		cursor: pointer;
	}
	.title {
		display: flex;
		font-size: 28px;
		align-items: center;
		justify-self: center;
	}
	.closed{
		display: flex;
		border: none;
		align-items: center;
		justify-content: flex-end;
		background-color: white;
		cursor: pointer;
	}
	.header-box {
		display: flex;
		flex:1;
		justify-content: center;
	}
	.header-left{
		justify-content: flex-start;
		margin-left: 12px;
	}
	.header-right{
		justify-content: flex-end;
		margin-right: 12px;
	}
</style>
