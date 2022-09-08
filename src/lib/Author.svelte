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
		<img alt={info[author].fullname} src={`${author}.jpg`} />
		{#if $config.author !== author && $config.author}
			<p class="tooltip">{info[author].lastname}, übernehmen Sie!</p>
		{/if}
	</section>
{/each}

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	.author_container {
		height: 100%;
		min-width: 0;
		display: flex;
		flex-direction: column;
		cursor: pointer;

		.tooltip {
			@include bluebox;

			display: none;
			position: absolute;
			transform: translate(-30%, 7vh);
		}

		&:hover {
			.tooltip {
				display: block;
			}
		}

		&.selected {
			order: -1;
		}

		&.not-selected {
			//align-self: end;
			width: 50%;
			p {
				font-size: smaller;
			}
		}

		img {
			width: 100%;
			box-sizing: border-box;
			margin: 0 auto;
			@include rounded;
		}
		p {
			max-width: 100%;
		}
	}
</style>
