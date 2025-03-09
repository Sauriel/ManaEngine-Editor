import type {
  TileRendererConfig,
  TileRendererConfigGroup,
  TileSource,
  TileType,
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
import type { TileName } from "$lib/utils/map/types";

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

let tilemaps = writable<TileRendererConfigGroup[]>([]);

loadPersistTileSources()
  .then(loadSources)
  .catch((e) => console.error(e));

function loadSources(sources: TileSource[]) {
  const renderer: Map<string, TileRendererConfigGroup> = new Map();
  sources.toSorted(sourceSort).forEach((source) => {
    let config: TileRendererConfigGroup;
    switch (source.type) {
      case "A1":
        config = renderer.get("A") ?? {
          name: "A",
          configs: [],
        };
        config.configs.push(...createA1Renderer(source));
        break;
      case "A2":
        config = renderer.get("A") ?? {
          name: "A",
          configs: [],
        };
        config.configs.push(...createA2Renderer(source));
        break;
      case "A3":
        config = renderer.get("A") ?? {
          name: "A",
          configs: [],
        };
        config.configs.push(...createA3Renderer(source));
        break;
      case "A4":
        config = renderer.get("A") ?? {
          name: "A",
          configs: [],
        };
        config.configs.push(...createA4Renderer(source));
        break;
      case "A5":
        config = renderer.get("A") ?? {
          name: "A",
          configs: [],
        };
        config.configs.push(...createA5Renderer(source));
        break;
      case "B":
        config = renderer.get("B") ?? {
          name: "B",
          configs: [],
        };
        config.configs.push(...createBCDERenderer(source, source.type));
        break;
      case "C":
        config = renderer.get("C") ?? {
          name: "C",
          configs: [],
        };
        config.configs.push(...createBCDERenderer(source, source.type));
        break;
      case "D":
        config = renderer.get("D") ?? {
          name: "D",
          configs: [],
        };
        config.configs.push(...createBCDERenderer(source, source.type));
        break;
      case "E":
        config = renderer.get("E") ?? {
          name: "E",
          configs: [],
        };
        config.configs.push(...createBCDERenderer(source, source.type));
        break;
    }
    renderer.set(config.name, config);
  });
  tilemaps.set([...renderer.values()]);
}

const tilemapStore = {
  subscribe: tilemaps.subscribe,
  update: tilemaps.update,
  set: tilemaps.set,
  gameloopUpdate: (deltaTime: number) =>
    get(tilemaps)
      .flatMap((tm) => tm.configs)
      .forEach((conf) => conf.renderer.update(deltaTime)),
  find: (key: TileName) =>
    get(tilemaps)
      .flatMap((tm) => tm.configs)
      .find((tile) => tile.key === key),
  load: (sources: TileSource[]) => {
    persistTileSources(sources);
    loadSources(sources);
  },
};

export default tilemapStore;
