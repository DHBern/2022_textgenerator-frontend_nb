<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
</script>
<main>
	<Author />

	{#if $config.author}
		<Config />
	{/if}
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem,1fr));
	}
</style>