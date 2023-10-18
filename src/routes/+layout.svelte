<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<div class="container">
		<Header />

		<main>
			<slot />
		</main>

		
	</div>
</div>

<style>
	.app {		
		display: flex;
		margin: 0 auto;
		min-height: 100vh;
		background-color: #ccc;
	}
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		border-radius: 12px;
		overflow: hidden;
		background-color: #f3f3f3;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
