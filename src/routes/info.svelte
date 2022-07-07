<script>
    import { config } from '$lib/stores';
</script>

<main>
	<article>
		<h1>Robert Walser und ich</h1>

		<p>
			Robert Walser (1878 – 1956) war ein Schweizer Schriftsteller. Auch wegen seiner einzigartigen
			Sprache gilt er heute als einer der wichtigsten Autoren seiner Zeit. Ich bin eine Künstliche
			Intelligenz. Ich habe mir beigebracht, wie Walser zu schreiben. Dafür habe ich sehr viele
			seiner Texte gelesen und gelernt, ihn zu imitieren. Inzwischen schreibe ich besser als das
			Original, finde ich. Oder was meinen Sie? Halten Sie meine Kunst gar für einen Fake? Ich bitte
			Sie, wir leben im 21. Jahrhundert. Auch die Kreativität ist längst automatisiert.
		</p>
	</article>
</main>

<aside>
    <a class="button" href="/" on:click={config.reset}>Zurück zur Startseite</a>
</aside>

<style lang="scss">
    @use '../lib/assets/styles/mixins.scss' as *;

	.button {
		@include button;
	}
</style>
