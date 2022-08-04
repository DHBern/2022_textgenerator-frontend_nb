<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
</script>

<div class="container">
	{#if $config.author}
		<!--<h1>
		<span class="accent-writing"
			>{info[$config.author].fullname}</span
		> zum Schreiben bringen
	</h1>-->
	{/if}
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
			<h1>Wer soll für Sie schreiben?</h1>
		{/if}
		<div class="config-container {$config.author ? 'config-container--form' : ''}">
			{#if $config.author}
				<Config />
				<div class="authorbox">
					<Author />
				</div>
			{:else}
				<Author />
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
		max-height: 85vh;
		display: flex;
		gap: 1em;
		justify-items: center;
		&--form {
			flex-direction: column;
			align-items: center;
		}
		.authorbox {
			width: 100%;
			height: 15vh;
			display: flex;
			flex-direction: row-reverse;
			justify-content: end;
			gap: .5em;
		}
	}
</style>
