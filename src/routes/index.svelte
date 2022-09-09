<script>
	import Author from '$lib/Author.svelte';
	import Config from '$lib/Config.svelte';
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { OnMount } from 'fractils';
	import { onIdle } from 'svelte-idle';

	onIdle(() => {
		if (movement) {
			console.log('idle home');
			location.reload();
		}
	})


	/**
	 * @type {boolean}
	 */
	let movement, introOver = false;

	const sentences = [
		'Nur keine Angst.',
		'Ich bin intelligent, künstlich intelligent.',
		`Ich schreibe Literatur. Ich kann Robert Walser und Emmy Hennings.`
	];

	/**
	 * @type {[string]|[]}
	 */
	let activeSentences = [
		'Hallo!',
		'Kommen Sie näher...',
	];

	const movementCheck = () => {
		if ($config.intro) {
			const moveInterval = setInterval(async () => {
				if (!movement) {
					const res = await fetch('/movement');
					movement = (await res.json()).movement;
				} else {
					clearInterval(moveInterval);
				}
			}, 1000);
		}
	}

	onMount(() => {
		movementCheck();
	});

	const addActiveSentences= () => {
		for (let i = 0; i < sentences.length; i++) {
			setTimeout(() => {
				activeSentences.push(sentences[i]);
				activeSentences = activeSentences;
			}, i * 3500);
		}
	}

	// If we have movement, we start the intro
	$: if (movement && $config.intro) {
		addActiveSentences();
	}

	// If the intro is over, we show the author
	$: if (activeSentences.length === sentences.length + 2) {
		setTimeout(() => {
			introOver = true;
		}, 1500);
	}

</script>

<div class="container">
	<main>
		{#if !$config.author && movement && $config.intro}
			<section class="intro">
				{#each activeSentences as sentence}
					<p transition:fade>{@html sentence}</p>
				{/each}
			</section>
		{/if}
		<OnMount>
			{#if introOver || !$config.intro}
				{#if !$config.author}
					<h1 in:fade out:fade>Wer soll für Sie schreiben?</h1>
				{/if}
				<div
					in:fade
					out:fade
					class="config-container {$config.author ? 'config-container--form' : ''}"
				>
					{#if $config.author}
						<div class="authorbox">
							<Author />
						</div>
						<Config />
					{:else}
						<Author />
					{/if}
				</div>
			{/if}
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
			&:after {
				display: none;
			}
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
			align-items: end;
		}
		.authorbox {
			width: 50%;
			display: flex;
			flex-direction: row-reverse;
			justify-content: end;
			gap: 0.5em;
		}
	}
</style>
