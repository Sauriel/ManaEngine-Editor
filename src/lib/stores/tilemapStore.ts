import type { TileRendererConfig } from "$lib/utils/canvas/rpgmaker/types";
import { buildTilemap } from "$lib/utils/canvas/tilemap";
import { get, writable } from "svelte/store";

let tilemapStore = writable<TileRendererConfig[]>([]);

buildTilemap().then(tilemapStore.set);

const tilemap = {
  subscribe: tilemapStore.subscribe,
  update: tilemapStore.update,
  set: tilemapStore.set,
  find: (key: string) => get(tilemapStore).find((tile) => tile.key === key),
};

export default tilemap;
