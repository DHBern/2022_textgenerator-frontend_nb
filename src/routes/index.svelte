<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { OnMount } from 'fractils';

	/**
	 * @type {boolean}
	 */
	let ready;

	const sentences = [
		'Hallo!',
		'kommen Sie näher...',
		'Nur keine Angst.',
		'Ich bin intelligent, künstlich intelligent.',
		`Ich schreibe Literatur. Ich kann Robert Walser und Emmy Hennings.`
	];

	/**
	 * @type {[string]|[]}
	 */
	let activeSentences = [];

	onMount(() => {
		for (let i = 0; i < sentences.length; i++) {
			setTimeout(() => {
				activeSentences.push(sentences[i]);
				activeSentences = activeSentences;
			}, i * 3500);
		}
	});
</script>

<div class="container">
	<main>
		{#if !$config.author}
			<section class="intro">
				{#each activeSentences as sentence}
					<p transition:fade>{@html sentence}</p>
				{/each}
			</section>
		{/if}
		<OnMount>
			<h1 in:fade={{ delay: 15000 }} out:fade>Wer soll für Sie schreiben?</h1>
			<div
				in:fade={{ delay: 16000 }}
				out:fade
				class="config-container {$config.author ? 'config-container--form' : ''}"
			>
				{#if $config.author}
					<Config />
					<div class="authorbox">
						<Author />
					</div>
				{:else}
					<Author />
				{/if}
			</div>
		</OnMount>
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
		p {
			font-size: 1.5rem;
			@include bluebox;
		}
	}

	/*button {
		display: inline;
		color: var(--pink);
		padding: 0;
		margin: 0;
		font-size: inherit;
		background-color: unset;
		&:hover {
			background-color: unset;
		}
	}*/

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
			gap: 0.5em;
		}
	}
</style>
