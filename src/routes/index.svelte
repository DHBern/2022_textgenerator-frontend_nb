<script>
import Author from "$lib/Author.svelte";
import Config from "$lib/Config.svelte";
import { config } from "$lib/stores";
</script>

<Author />

{#if $config.author}
    <Config />
{/if}

{ JSON.stringify($config) }