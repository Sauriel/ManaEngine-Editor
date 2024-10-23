import { get, writable } from "svelte/store";

const activeLayerIndex = writable<number>(0);

export default activeLayerIndex;
