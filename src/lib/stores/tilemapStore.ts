import type { TileRendererConfig } from "$lib/utils/canvas/rpgmaker/types";
import { buildTilemap } from "$lib/utils/canvas/tilemap";
import { writable } from "svelte/store";

let tilemap = writable<TileRendererConfig[]>([]);

buildTilemap().then(tilemap.set);

export default tilemap;
