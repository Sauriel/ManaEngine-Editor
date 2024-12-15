import type {
  TileRendererConfig,
  TileSource,
} from "$lib/utils/canvas/rpgmaker/types";
import { get, writable } from "svelte/store";
import createA1Renderer from "$lib/utils/canvas/rpgmaker/createA1Renderer";
import createA2Renderer from "$lib/utils/canvas/rpgmaker/createA2Renderer";
import createA3Renderer from "$lib/utils/canvas/rpgmaker/createA3Renderer";
import createA4Renderer from "$lib/utils/canvas/rpgmaker/createA4Renderer";
import createA5Renderer from "$lib/utils/canvas/rpgmaker/createA5Renderer";
import createBCDERenderer from "$lib/utils/canvas/rpgmaker/createBCDERenderer";
import {
  persistTileSources,
  loadPersistTileSources,
} from "$lib/utils/persitence/persistTileSource";

function sourceSort(a: TileSource, b: TileSource): number {
  if (a.type < b.type) {
    return -1;
  }
  if (a.type > b.type) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

let tilemaps = writable<TileRendererConfig[]>([]);

loadPersistTileSources()
  .then(loadSources)
  .catch((e) => console.error(e));

function loadSources(sources: TileSource[]) {
  const renderer: TileRendererConfig[] = [];
  sources.toSorted(sourceSort).forEach((source) => {
    switch (source.type) {
      case "A1":
        renderer.push(...createA1Renderer(source));
        break;
      case "A2":
        renderer.push(...createA2Renderer(source));
        break;
      case "A3":
        renderer.push(...createA3Renderer(source));
        break;
      case "A4":
        renderer.push(...createA4Renderer(source));
        break;
      case "A5":
        renderer.push(...createA5Renderer(source));
        break;
      case "B":
      case "C":
      case "D":
      case "E":
        renderer.push(...createBCDERenderer(source, source.type));
        break;
    }
  });
  tilemaps.set(renderer);
}

const tilemapStore = {
  subscribe: tilemaps.subscribe,
  update: tilemaps.update,
  set: tilemaps.set,
  find: (key: string) => get(tilemaps).find((tile) => tile.key === key),
  load: (sources: TileSource[]) => {
    persistTileSources(sources);
    loadSources(sources);
  },
};

export default tilemapStore;
