<script>
	import { config } from '$lib/stores';
</script>

<section>
	<h2>What should I write about?</h2>
	<p>
		"Heute habe ich vor, über <input
			type="text"
			placeholder="das Wandern"
			pattern="[^ ]+ ?[^ ]+"
			on:input={(e) => {
				$config.input = e.target.checkValidity() ? e.target.value : '';
			}}
		/> zu schreiben."
	</p>
</section>

<section>
	<h2>Please select the temperature:</h2>
	<input type="range" min="0.3" max="0.9" step="0.3" bind:value={$config.temp} />
</section>

<a href="/result">to the result!</a>

<style lang="scss">
	input:valid {
		border-color: green;
	}
	input:invalid {
		border-color: red;
	}
</style>
