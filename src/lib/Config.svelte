<script>
	import { config } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

<form action="/result" on:submit|preventDefault={() => goto('result')}>
	<h2>Über was soll ich schreiben?</h2>
	<p>
		"Heute schreibe ich über <input
			type="text"
			placeholder="das Wandern"
			pattern="[^ ]+ ?[^ ]+"
			on:input={(e) => {
				$config.input = e.target.checkValidity() ? e.target.value : '';
			}}
		/>, ..."
	</p>

	<label for="temperature"
		>Soll ich Walsers Wortschatz nutzen? Oder seine Art, Sätze zu formen?
	</label>
	<div class="rangeslider">
		<input id="temperature" type="range" min="0.3" max="0.9" step="0.3" bind:value={$config.temp} />
		<ol>
			<li class:active={$config.temp === 0.3}>Wortschatz</li>
			<li class:active={$config.temp === 0.9}>Satzbau</li>
		</ol>
	</div>

	<button type="submit" class="submit">Schreiben</button>
</form>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;

	.rangeslider {
		display: grid;
		input,
		ol {
			grid-column: 1;
			grid-row: 1;
		}

		input {
			z-index: 1;
		}
		ol {
			display: flex;
			list-style-type: none;
			margin: 0;
			padding: 0;
			justify-content: space-between;
			li {
				margin-top: 2rem;
				&.active {
					color: var(--pink);
				}
			}
		}
	}

	form {
		height: fit-content;
		grid-column: 2 / -1;
		grid-row: 2 / -1;
		@include bluebox;
	}
	input:valid {
		border-color: green;
	}
	input:invalid {
		border-color: red;
	}
	.submit {
		width: 100%;
	}

	label,
	p,
	input[type='text'] {
		font-size: 1.5rem;
	}

	input[type='text'] {
		width: 12rem;
	}
</style>
