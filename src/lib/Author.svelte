<script>
	import { config } from '$lib/stores';
</script>

{#if $config.author !== 'walser'}
	<section class="author_container" on:click={() => ($config.author = 'hennings')}>
		<img
			alt="Emmy Hennings"
			src="https://www.houseofswitzerland.org/sites/default/files/story/gallery/05-Abb2b_EmmyHennings_0.jpg"
		/>
		<h2>Emmy Hennings</h2>
		<p>Hier steht eine kurze Beschreibung der Autorin.</p>
	</section>
{/if}

{#if $config.author !== 'hennings'}
	<section class="author_container" on:click={() => ($config.author = 'walser')}>
		<img
			alt="Robert Walser"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Robert_Walser.jpg/800px-Robert_Walser.jpg"
		/>
		<!--<h2 class="accent-writing">Robert Walser</h2>-->
		<p>
			Robert Otto Walser war das zweitjüngste von acht Kindern des gelernten Buchbinders und
			Werkstattinhabers für Papeteriewaren und Bilderrahmen Adolf (sen.) Walser (1833–1914) und
			seiner Frau Elisabeth (Elisa) Walser (1839–1894).[1] Sein Bruder Karl Walser war ein
			Bühnenbildner und Maler. Walser wuchs in Biel[2] an der deutsch-französischen Sprachgrenze
			zweisprachig auf. Er besuchte dort die Primarschule und das Progymnasium, unter anderem bei
			Arnold Heimann, das er, da die Familie den Schulbesuch nicht mehr bezahlen konnte, vor dem
			Examen verließ. Schon früh war Walser theaterbegeistert; sein Lieblingsstück war Die Räuber
			von Schiller. Überliefert ist ein Aquarell Karl Walsers, das Robert Walser als Karl Moor
			zeigt.
		</p>
	</section>
{/if}

<style lang="scss">
	section {
		display: grid;
		//margin: 3rem 0;
	}
	img {
		margin: 5rem auto;
		width: 30vw;
		border: 10px solid var(--light-blue);
	}
</style>
