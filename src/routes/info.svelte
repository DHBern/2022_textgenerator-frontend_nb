<script>
    import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';
</script>

<div class="centered">
<main>
	<article>
		<h1>{info[$config.author]?.fullname}</h1>
		<p>{info[$config.author]?.description}</p>
	</article>
	<img alt={info[$config.author]?.fullname} src={`${$config?.author}.jpg`} />
</main>

<aside>
    <a class="button" href="/" on:click={config.reset}>Zurück zur Startseite</a>
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
		display: flex;
		gap: 1rem;
		img {
			width: 20vw;
			height: auto;
			object-fit: contain;
			object-position: bottom;
		}
	}

	aside {
		margin-top: 2rem;
	}
</style>
