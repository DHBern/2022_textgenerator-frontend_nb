import { writable } from "svelte/store";

/**
 * @param value {number}
 */
export const config = writable({
    /** @type {""|"hennings"|"walser"} */
    author: "",
    input: "",
    temp: 0.6,
})