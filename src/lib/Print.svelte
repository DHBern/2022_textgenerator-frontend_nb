<script>
    import info from '$lib/assets/text.json';
    import { config } from '$lib/stores';
    export let sentence = 'no sentence provided';

    const print = async () => {
        const res = await fetch('/print', {
			method: 'POST',
			body: JSON.stringify({
				sentence: sentence,
                author: info[$config.author]?.fullname,
			})
		})
    }
</script>

<button on:click="{print}">Ausdrucken</button>

<style lang="scss">
    @use '../lib/assets/styles/mixins.scss' as *;
    button {
        @include button;
    }
</style>