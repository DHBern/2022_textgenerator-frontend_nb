<script>
	import '$lib/assets/styles/main.scss';
	import { onIdle, listen } from 'svelte-idle';
	import { page } from '$app/stores';

	listen({
		timer: 2 * 60 * 1000,
		cycle: 1000,
	})

	onIdle(() => {
		if ($page.url.pathname !== '/') {
			console.log('idle');
			location.reload();
		}
	})
</script>

<div class="app">
	<slot />
</div>