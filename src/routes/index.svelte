<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
</script>

<div class="container">
	<h1>
		<span class="accent-writing"
			>{$config.author ? info[$config.author].fullname : 'Autor*innen'}</span
		> zum Sprechen bringen
	</h1>
	<main>
		{#if !$config.author}
		<section class="intro">
			<p>
				Hallo, kommen Sie näher. Nur keine Angst. Ich bin intelligent, künstlich intelligent. Ich
				schreibe Literatur. Ich kann
				<button on:click={() => ($config.author = 'walser')}>Robert Walser</button> und
				<button on:click={() => ($config.author = 'hennings')}>Emmy Hennings</button>.
			</p>
		</section>
		{/if}
		<div class="config-container { $config.author ? 'config-container--form' : '' }">
			<Author />

			{#if $config.author}
				<Config />
			{/if}
		</div>
	</main>
</div>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	.container {
		height: calc(100vh - 12vw);
		display: grid;
		// justify-content: center;
		align-content: center;
	}

	.intro {
		padding: 3rem 0;
	}
	/*main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem,1fr));
	}*/

	button {
		display: inline;
		color: var(--pink);
		padding: 0;
		margin: 0;
		font-size: inherit;
		background-color: unset;
		&:hover {
			background-color: unset;
		}
	}

	.config-container {
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		grid-template-rows: 2fr 1fr 2fr;
		justify-items: center;
		&--form {
			grid-template-columns: 2fr 1fr 6fr;
			grid-template-rows: 2fr 1fr 6fr;
		}
	}
</style>
