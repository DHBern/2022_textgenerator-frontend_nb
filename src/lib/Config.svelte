<script>
    import { config } from "$lib/stores";
</script>

<section>
<h2>Please select the temperature:</h2>
<input type="range" min=0.3 max=0.9 step=0.3 bind:value={$config.temp} />
</section>

<a href="/result">to the result!</a>