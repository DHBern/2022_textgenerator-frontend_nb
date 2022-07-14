<script>
	import { config } from '$lib/stores';
	import info from '$lib/assets/text.json';

	function shuffleArray(array) {
		let cpArray = array;
		for (let i = cpArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cpArray[i], cpArray[j]] = [cpArray[j], cpArray[i]];
		}
		return cpArray;
	}

	const authors = shuffleArray(Object.keys(info));
</script>

{#each authors as author}
	{#if $config.author === author || !$config.author}
		<section class="author_container" on:click={() => ($config.author = author)}>
			<!--<h2>{info[author].fullname}</h2>-->
			<img
				alt="{info[author].fullname}"
				src="{info[author].img_src}"
			/>
			{#if !$config.author}
				<p>{info[author].intro}</p>
			{/if}
		</section>
	{/if}
{/each}


<style lang="scss">

	section {
		display: grid;
		cursor: pointer;
		&:nth-child(1) {
			grid-column: 1 / span 2;
			grid-row: 1 / span 2;
		}

		&:nth-child(2) {
			grid-column: 2 / span 2;
			grid-row: 2 / span 2;
		}

		img {
			// margin: 5rem auto;
			width: 30vw;
			// width: 100%;
			box-sizing: border-box;
			max-width: 100%;
			border: 10px solid var(--light-blue);
			margin: 0 auto;
		}
		p {
			width: 30vw;
		}
	}
</style>
