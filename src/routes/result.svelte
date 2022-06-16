<script>
	import { config } from '$lib/stores';
	import Print from '$lib/Print.svelte';
	import Qrcode from '$lib/Qrcode.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let queryCounter = 0;
    /** @type {[{generated_text: string}]} */
	let sentences = [{generated_text: 'Lade Sätze...'}];

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
			return queryCounter <= 30 ? query(data) : [{ generated_text: 'Da ging etwas bei der Abfrage schief.' }];
		}
	}

	const payload = {
		inputs: `Ich denke über ${$config.input},`,
		temperature: $config.temp,
		top_k: 50,
		max_length: 1000,
		num_return_sequences: 20,
		wait_for_model: false,
		use_cache: false
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

{#if sentences.error}
	<p class="error">{sentences.error}</p>
{/if}

{#if sentences[0].generated_text === 'Lade Sätze...'}
    // TODO: show loading indicator
    <p>'Lade Sätze...'</p>

{:else}

    {#each sentences as sentence}
        <p>{JSON.stringify(sentence.generated_text)}</p>
    {/each}

    <a href="/" on:click={config.reset}>Zurück zur Startseite</a>

{/if}

<Print />
<Qrcode />

{JSON.stringify($config)}

<style lang="scss">
</style>
