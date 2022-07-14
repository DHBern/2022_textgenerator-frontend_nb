<script>
	import { config } from '$lib/stores';
	import Print from '$lib/Print.svelte';
	import Qrcode from '$lib/Qrcode.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import info from '$lib/assets/text.json';

	let queryCounter = 0;
	let sentence = '';

	async function query(data) {
		const response = await fetch(
			info[$config.author].api_url,
			{
				headers: { Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_KEY}` },
				method: 'POST',
				body: JSON.stringify(data)
			}
		);
		if (response.ok) {
			const result = await response.json();
			console.log(result[0].generated_text);
			return result[0].generated_text;
		} else {
			queryCounter++;
			console.log('failed');
			console.log(queryCounter);
			data.wait_for_model = true;
			return queryCounter <= 30
				? query(data)
				: 'Da ging etwas bei der Abfrage schief.';
		}
	}

	const payload = {
		inputs: `Heute schreibe ich über ${$config.input},`,
		parameters: {
			temperature: $config.temp,
			top_k: 100,
			num_return_sequences: 1
		},
		options: {
			wait_for_model: false,
			use_cache: false
		}
	};

	onMount(async () => {
		if ($config.author && $config.temp && $config.input) {
			sentence = await query(payload);
		} else {
			console.log('no author or temp or input, redirecting to home');
			goto('/');
		}
	});
</script>

<div class="result-container">
	<main><h1 class="visually-hidden">Generierter Satz</h1>
		{#if sentence}
			<p>{sentence}</p>
		{:else}
			<p>'Ich schreibe...'</p>
		{/if}
	</main>
	<aside>
		<h2>Die Lyrik mitnehmen:</h2>
		<div class="container">
			<Print />
			<Qrcode />
		</div>
		<h2>Sie wollen mehr über mich und Robert Walser wissen oder noch einmal eine Anfrage starten?</h2>
		<div class="container">
			<a class="button" href="/" on:click={config.reset}>Zurück zur Startseite</a>
			<a class="button" href="/info" on:click={config.reset}>Weitere Informationen</a>
		</div>
	</aside>
</div>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	h1 {
		background-color: var(--dark-blue);
		padding: 1rem 0 3rem 0;
		//box-shadow: 0 8px 22px 0 rgba(0, 0, 0, 0.9);
	}
	.result-container {
		height: calc(100vh - 12vw);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	main {
		display: grid;
		gap: 1rem;
		/*max-height: 80vh;
		overflow-y: scroll;*/
	}

	aside {
		display: grid;
		padding: 3rem 0;
		.container {
			display: flex;
			gap: 1rem;
		}
	}

	.button {
		@include button;
	}
</style>
