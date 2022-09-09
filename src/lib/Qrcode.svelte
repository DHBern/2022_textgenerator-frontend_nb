<script>
	let lightbox;
	let qrUrl = 'http://nationalbibliothek.ch';

    export let sentence = '';

	const createQRCode = (url) => {
        lightbox.style.display = "flex";
        qrUrl = url;
	};
</script>

<div class="lightbox" bind:this={lightbox} on:click="{() => {lightbox.style.display = "none"}}">
    <div class="container">
        <p>(Schliessen durch Klicken)</p>
        <img src="{`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${qrUrl}`}" alt="qr-code" />
    </div>
</div>

<button on:click="{() => createQRCode(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${sentence} #aufgeschrieben #nationalbibliothek`)}`)}"><i class="fa-brands fa-square-twitter" /></button>
<button on:click="{() => createQRCode(`instagram://sharesheet?text={${sentence}}`)}"><i class="fa-brands fa-square-instagram" /></button>
<button on:click="{() => createQRCode(`https://api.whatsapp.com/send?text=${encodeURIComponent(sentence)}`)}"><i class="fa-brands fa-square-whatsapp" /></button>
<button on:click="{() => createQRCode(`SMSTO::${sentence}`)}"><i class="fa-sharp fa-solid fa-comment-sms" /></button>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;

    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;

        .container {
            background-color: white;
            padding: 1rem;
            border-radius: 1rem;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
            color: black;
            p {
                font-style: italic;
                text-align: center;
                margin: 0 0 .5rem 0;
            }
        }
    }
</style>
