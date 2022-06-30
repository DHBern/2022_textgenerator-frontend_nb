<script>
	import { config } from '$lib/stores';
</script>

<section>
	<h2>Worüber soll ich schreiben?</h2>
	<p>Geben Sie {$config.author === 'hennings' ? 'der Autorin' : 'dem Autoren'} den entscheidenden Anfang seines Satzes vor.</p>
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

<a class="submit" href="/result">Dichten Sie!</a>

<style lang="scss">
	input:valid {
		border-color: green;
	}
	input:invalid {
		border-color: red;
	}
	input[type="range"] {
		width: 50%;
	}
	.submit {
		display: block;
		padding: 1em;
		margin: 4rem 0;
		background-color: var(--light-blue);
		color: white;
		text-align: center;
		text-decoration: none;
		font-size: 1.5em;
		font-weight: bold;
		border-radius: 0.25em;
		border: 0;
		cursor: pointer;
		&:hover {
			background-color: var(--pink);
		}
	}

	h2 {
		font-size: 2rem;
	}
	p, input[type="text"] {
		font-size: 1.5rem;
	}

</style>
