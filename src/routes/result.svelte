<script>
	import { config } from '$lib/stores';
	import Print from '$lib/Print.svelte';
	import Qrcode from '$lib/Qrcode.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let queryCounter = 0;
	/** @type {[{generated_text: string}]} */
	let sentences = [{ generated_text: 'Lade Sätze...' }];

	async function query(data) {
		const response = await fetch(
			`https://api-inference.huggingface.co/models/dh-unibe/gpt2-ger-${$config.author}`,
			{
				headers: { Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_KEY}` },
				method: 'POST',
				body: JSON.stringify(data)
			}
		);
		if (response.ok) {
			const result = await response.json();
			console.log(result);
			return result;
		} else {
			queryCounter++;
			console.log('failed');
			console.log(queryCounter);
			data.wait_for_model = true;
			return queryCounter <= 30
				? query(data)
				: [{ generated_text: 'Da ging etwas bei der Abfrage schief.' }];
		}
	}

	const payload = {
		inputs: `Ich denke über ${$config.input},`,
		parameters: {
			temperature: $config.temp,
			top_k: 50,
			num_return_sequences: 20
		},
		options: {
			wait_for_model: false,
			use_cache: false
		}
	};

	onMount(async () => {
		if ($config.author && $config.temp && $config.input) {
			sentences = await query(payload);
		} else {
			console.log('no author or temp or input, redirecting to home');
			goto('/');
		}
	});
</script>

<main>
	{#if sentences.error}
		<p class="error">{sentences.error}</p>
	{/if}

	{#if sentences[0].generated_text === 'Lade Sätze...'}
		<p>'Lade Sätze...'</p>
	{:else}
		<h1>Ich habe einige Vorschläge:</h1>
		{#each sentences as sentence}
			{@const id = crypto.randomUUID()}

			<input type="checkbox" {id} />
			<label for={id}>{JSON.stringify(sentence.generated_text)}</label>
		{/each}
	{/if}
</main>
<aside>
	<h2>Die Lyrik mitnehmen:</h2>
	<div class="container">
		<Print />
		<Qrcode />
		<a class="button" href="/" on:click={config.reset}>Zurück zur Startseite</a>
	</div>
</aside>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	h1 {
		position: sticky;
		top: 0;
		background-color: var(--dark-blue);
		padding: 1rem 0 3rem 0;
		//box-shadow: 0 8px 22px 0 rgba(0, 0, 0, 0.9);
	}
	main {
		display: grid;
		gap: 1rem;
		/*max-height: 80vh;
		overflow-y: scroll;*/
	}
	label {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.2s;
		background-color: var(--light-blue);
		padding: 3rem;
		cursor: pointer;

		&:hover {
			background-color: var(--highlight);
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
		}
		&:checked {
			background-color: var(--pink);
		}
	}
	:checked + label {
		background-color: var(--pink);
	}

	input[type='checkbox'] {
		display: none;
	}

	aside {
		display: grid;
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 3rem 6vw;
		background-color: var(--dark-blue);
		left: 0;
		.container {
			display: flex;
			gap: 1rem;
		}
	}

	.button {
		@include button;
	}
</style>
