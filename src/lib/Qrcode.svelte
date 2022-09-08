<button>Twitter</button>
<button>Instagram</button>
<button>Whatsapp</button>
<button>SMS</button>

<style lang="scss">
	@use '../lib/assets/styles/mixins.scss' as *;
	button {
		@include button;
		position: relative;
		&:before {
			content: 'Teilen per';
			font-size: 0.8rem;
			display: block;
			position: absolute;
			top: 0;
		}
	}
</style>
