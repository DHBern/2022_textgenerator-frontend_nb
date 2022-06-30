<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
</script>

<h1><span class="ai-font">Autor*innen</span> zum sprechen bringen</h1>
<aside>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</aside>
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
	.ai-font {
		@include ai-font;
		text-transform: none;
	}
</style>