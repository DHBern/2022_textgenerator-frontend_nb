<script>
    import { config } from "$lib/stores";
    import Print from "$lib/Print.svelte";
    import Qrcode from "$lib/Qrcode.svelte";

    // Implement logic for either sending a request to the server or rerouting to the home page.
    if (config.author && config.temp && config.input) {
        // Send request to server.
        // implement the call to the huggingface API
    } else {
        // Reroute to home page.
    }

</script>

<p>"This is the sentence from the server."</p>
<Print />
<Qrcode />

<style lang="scss">

</style>