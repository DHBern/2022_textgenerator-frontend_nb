<script>
	import { config } from '$lib/stores';
	import Print from '$lib/Print.svelte';
	import Qrcode from '$lib/Qrcode.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import info from '$lib/assets/text.json';
	import { listen } from 'svelte-idle';

	listen({
		timer: 4 * 60 * 1000,
		cycle: 1000
	});

	let queryCounter = 0;
	let sentence = '';
	let dots = '';
	const failedSentence = 'Da ging etwas bei der Abfrage schief.';

	async function query(data) {
		const response = await fetch(info[$config.author].api_url, {
			headers: { Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_KEY}` },
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(data)
		});
		if (response.ok) {
			const result = await response.json();
			console.log(result[0].generated_text);
			return result[0].generated_text;
		} else {
			queryCounter++;
			console.log('failed');
			console.log(queryCounter);
			await new Promise((r) => setTimeout(r, 1000));
			data.wait_for_model = true;
			return queryCounter <= 30 ? query(data) : failedSentence;
		}
	}

	const payload = {
		inputs: `Heute schreibe ich über ${$config.input},`,
		parameters: {
			temperature: $config.temp,
			top_k: 100,
			num_return_sequences: 1,
			max_length: 100
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
			str = str + '...';
		}
		return str;
	};

	const postSentence = (/** @type {string} */ sentence) => {
		const res = fetch('/send', {
			method: 'POST',
			body: JSON.stringify({
				sentence: sentence,
				author: $config.author
			})
		});
		return res;
	};

	const saveSentence = (sentence) => {
		const res = fetch('/save', {
			method: 'POST',
			body: JSON.stringify({
				sentence: sentence,
				author: $config.author,
				input: $config.input,
				temp: $config.temp
			})
		});
		return res;
	};

	onMount(async () => {
		setInterval(() => {
			dots = dots === '...' ? '' : dots + '.';
		}, 300);
		if ($config.author && $config.temp && $config.input) {
			sentence = trimEnd(await query(payload));
			if (sentence !== failedSentence) {
				postSentence(sentence);
				saveSentence(sentence);
			}
		} else {
			console.log('no author or temp or input, redirecting to home');
			goto('/');
		}
	});
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/903d4f74d4.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="result-container">
	<main>
		{#if sentence}
			<p>{sentence}</p>
		{:else}
			<p>Ich schreibe{dots}</p>
			<!--<div class="spinner">
				<i class="fa-solid fa-spinner fa-spin-pulse fa-xl" />
			</div>-->
		{/if}
		<img alt={info[$config.author]?.fullname} src={`${$config?.author || 'walser'}.jpg`} />
	</main>
	<aside>
		<Print {sentence} />
		<div class="qr">
			<b>Teilen:</b><Qrcode {sentence} />
		</div>
		<a class="button" href="/" on:click={config.return}>Startseite</a>
		<a class="button" href="/info">Informationen</a>
	</aside>
</div>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
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
			@include rounded;
		}
	}

	.qr {
		grid-column: 1 / 3;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.spinner {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	aside {
		display: grid;
		gap: 1rem;
		div {
			grid-row: 2;
		}
		a {
			grid-row: 3;
		}
	}
	.button {
		@include button;
	}
</style>
