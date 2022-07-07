<script>
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';

	const authors = Object.keys(info);
</script>

{#each authors as author}
{#if $config.author === author || !$config.author}
	<section class="author_container" on:click={() => ($config.author = author)}>
		<img
			alt="{info[author].fullname}"
			src="{info[author].img_src}"
		/>
		<h2>{info[author].fullname}</h2>
		<p>{info[author].intro}</p>
	</section>
{/if}
{/each}

<style lang="scss">
	section {
		display: grid;
		//margin: 3rem 0;
	}
	img {
		margin: 5rem auto;
		width: 30vw;
		border: 10px solid var(--light-blue);
	}
</style>
