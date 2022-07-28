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
	<section
		class="author_container"
		class:not-selected={$config.author !== author && $config.author}
		class:selected={$config.author === author}
		on:click={() => ($config.author = author)}
	>
		<!--<h2>{info[author].fullname}</h2>-->
		<img alt={info[author].fullname} src={info[author].img_src} />
		{#if !$config.author}
			<p>{info[author].intro}</p>
		{:else if $config.author !== author}
			<p>{info[author].lastname}, übernehmen Sie!</p>
		{/if}
	</section>
{/each}

<style lang="scss">
	.author_container {
		width: 100%;
		min-width: 0;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		&:nth-child(1) {
			grid-column: 1 / span 2;
			grid-row: 1 / span 2;
			p {
				width: 33vw;
			}
		}

		&:nth-child(2) {
			grid-column: 2 / span 2;
			grid-row: 2 / span 2;
		}

		&.selected {
			display: grid;
			grid-column: 1 / span 2;
			grid-row: 1 / span 2;
		}

		&.not-selected {
			grid-column: -2;
			grid-row: -2;
			p {
				font-size: smaller;
			}
		}

		img {
			min-height: 0;
			min-width: 0;
			box-sizing: border-box;
			max-width: 100%;
			border: 10px solid var(--light-blue);
			margin: 0 auto;
		}
	}
</style>
