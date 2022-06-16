import { writable } from 'svelte/store';

/**
 * @param defaults {Object}
 */
function createConfig(defaults) {
  const { subscribe, set } = writable(defaults);

  return {
    subscribe,
    set,
    reset: () => set({
        /** @type {""|"hennings"|"walser"} */
        author: '',
        input: '',
        temp: 0.6
    }),
  }
}

/**
 * @param value {number}
 */
export const config = createConfig({
	/** @type {""|"hennings"|"walser"} */
	author: '',
	input: '',
	temp: 0.6
});
