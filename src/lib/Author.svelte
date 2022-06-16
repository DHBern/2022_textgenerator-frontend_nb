<script>
	import { config } from '$lib/stores';
</script>

<section class="author_container" on:click={() => ($config.author = 'hennings')}>
	<img alt="Emmy Hennings" />
	<h2>Emmy Hennings</h2>
	<p>Emmy Hennings is a web developer and designer.</p>
</section>

<section class="author_container" on:click={() => ($config.author = 'walser')}>
	<img alt="Robert Walser" />
	<h2>Robert Walser</h2>
	<p>Robert Walser is a web developer and designer.</p>
</section>

<style>
</style>
