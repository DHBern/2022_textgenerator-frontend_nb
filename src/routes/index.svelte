<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
</script>

<h1><span class="accent-writing">{ $config.author ? info[$config.author].fullname :  'Autor*innen' }</span> zum Sprechen bringen</h1>
<main>
<Author />

{#if $config.author}
	<Config />
{/if}
</main>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	/*main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem,1fr));
	}*/
</style>