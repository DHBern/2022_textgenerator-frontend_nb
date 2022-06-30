<script>
	import { config } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

<form action="/result" on:submit|preventDefault={() => goto('result')}>
	<section>
		<h2>Worüber soll ich schreiben?</h2>
		<p>
			Geben Sie {$config.author === 'hennings' ? 'der Autorin' : 'dem Autoren'} den entscheidenden Anfang
			seines Satzes vor.
		</p>
		<p>
			"Ich denke über <input
				type="text"
				placeholder="das Wandern"
				pattern="[^ ]+ ?[^ ]+"
				on:input={(e) => {
					$config.input = e.target.checkValidity() ? e.target.value : '';
				}}
			/>, ..."
		</p>
	</section>

	<section>
		<h2>Wie treu soll ich meinem Stil bleiben?</h2>
		<p>Hier folgt eine kurze Erklärung zur Temperatur.</p>
		<input type="range" min="0.3" max="0.9" step="0.3" bind:value={$config.temp} />
	</section>

	<button type="submit" class="submit">Dichten Sie!</button>
</form>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	input:valid {
		border-color: green;
	}
	input:invalid {
		border-color: red;
	}
	input[type='range'] {
		width: 50%;
	}
	.submit {
		@include button;
	}

	h2 {
		font-size: 2rem;
	}
	p,
	input[type='text'] {
		font-size: 1.5rem;
	}
</style>
