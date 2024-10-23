import { get, writable } from "svelte/store";

const selectedTilesStore = writable<string[]>([]);

const selectedTiles = {
  subscribe: selectedTilesStore.subscribe,
  set: selectedTilesStore.set,
  update: selectedTilesStore.update,
  includes: (value: string) => get(selectedTilesStore).includes(value),
  push: (value: string) =>
    selectedTilesStore.update((state) => [...state, value]),
  length: () => get(selectedTilesStore).length,
  equals: (index: number, value: string) =>
    get(selectedTilesStore).at(index) === value,
  get: () => get(selectedTilesStore),
};

export default selectedTiles;
