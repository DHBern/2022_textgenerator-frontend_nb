import { writable } from "svelte/store";

export const config = writable({
    author: "",
    input: "",
    temp: 0,
})