<script>
import Author from "$lib/Author.svelte";
import Config from "$lib/Config.svelte";
import { config } from "$lib/stores";

</script>

{#if !$config.author}
    <Author />
{:else if !$config.temp || !$config.input}
    <Config />
{/if}