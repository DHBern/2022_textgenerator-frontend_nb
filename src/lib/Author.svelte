<script>
	import { config } from '$lib/stores';
</script>

{#if $config.author !== 'walser'}
	<section class="author_container" on:click={() => ($config.author = 'hennings')}>
		<img
			alt="Emmy Hennings"
			src="https://www.houseofswitzerland.org/sites/default/files/story/gallery/05-Abb2b_EmmyHennings_0.jpg"
		/>
		<h2>Emmy Hennings</h2>
		<p>Hier steht eine kurze Beschreibung der Autorin.</p>
	</section>
{/if}

{#if $config.author !== 'hennings'}
	<section class="author_container" on:click={() => ($config.author = 'walser')}>
		<img
			alt="Robert Walser"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Robert_Walser.jpg/800px-Robert_Walser.jpg"
		/>
		<h2>Robert Walser</h2>
		<p>Hier steht eine kurze Beschreibung des Autors.</p>
	</section>
{/if}

<style lang="scss">
	section {
		display: grid;
		padding: 2rem;
	}

	img {
		max-width: 100%;
	}
</style>
