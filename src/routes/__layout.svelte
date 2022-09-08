<script>
	import '$lib/assets/styles/main.scss';
	import { onIdle, listen } from 'svelte-idle';

	listen({
		timer: 2 * 60 * 1000,
		cycle: 1000,
	})

	onIdle(() => {
		console.log('idle');
		location.reload();
	})
</script>

<div class="app">
	<slot />
</div>