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
			await new Promise(r => setTimeout(r, 1000));
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
			num_return_sequences: 1,
			max_length: 150,
		},
		options: {
			wait_for_model: false,
			use_cache: false
		}
	};

	const trimEnd = (/** @type {string} */ str) => {
		const regex = /(?<=\.)\s+[A-ZÄÖÜ](?:.(?!\.\s+[A-ZÄÖÜ][a-zöäü])){3,}$/g;
		str = str.replace(regex, '');
		str = str.replaceAll(/\s+/g, ' ');
		if (!str.endsWith('.')) {
			str = str + "...";
		}
		return str;
	};

	onMount(async () => {
		if ($config.author && $config.temp && $config.input) {
			sentence = trimEnd(await query(payload));
		} else {
			console.log('no author or temp or input, redirecting to home');
			goto('/');
		}
	});
</script>

<div class="result-container">
	<main>
		{#if sentence}
			<p>{sentence}</p>
		{:else}
			<p>'Ich schreibe...'</p>
		{/if}
		<img alt={info[$config.author]?.fullname} src={`${$config?.author || 'walser'}.jpg`} />
	</main>
	<aside>
		<div class="container">
			<Print sentence={sentence} />
			<Qrcode />
			<a class="button" href="/" on:click={config.reset}>Startseite</a>
			<a class="button" href="/info">Informationen</a>
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
		justify-content: space-between;
	}
	main {
		display: grid;
		grid-template-columns: 1fr 10vw;
		grid-template-rows: 1fr 10vh;
		/*max-height: 80vh;
		overflow-y: scroll;*/
		p {
			grid-column: 1 / -1;
			font-size: 2rem;
			@include bluebox;
			margin-top: 0;
		}
		img {
			grid-column: -2;
			grid-row: -2;
			width: 10vw;
			height: auto;
			object-fit: contain;
			object-position: bottom;
		}
	}

	aside {
		display: grid;
		.container {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
		}
	}
	.button {
		@include button;
	}
</style>
