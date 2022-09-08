<script>
    import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		if (!$config.author) {
			console.log('no author or temp or input, redirecting to home');
			goto('/');
		}
	});
</script>

<div class="centered">
<main>
	<img alt={info[$config.author]?.fullname} src={`${$config?.author || 'walser'}.jpg`} />
	<article>
		<h1>Informationen</h1>
		{#if info[$config.author]?.description}
			{#each info[$config.author]?.description as sentence}
			<p>{sentence}</p>
			{/each}
		{/if}
	</article>
</main>

<aside>
    <a class="button" href="/" on:click={config.return}>Zurück zur Startseite</a>
</aside>
</div>

<style lang="scss">
    @use '../lib/assets/styles/mixins.scss' as *;

	.button {
		@include button;
	}

	.centered {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	main {
		display: grid;
		img {
			justify-self: end;
			width: 20vw;
			@include rounded;
		}
	}

	article p {
		@include bluebox;
	}

	aside {
		margin-top: 2rem;
	}
</style>
