import type { TileRendererConfig } from "$lib/utils/canvas/rpgmaker/types";
import { buildTilemap } from "$lib/utils/canvas/tilemap";
import { get, writable } from "svelte/store";
import type { ImportedTilemap } from "../../routes/import/components/types";
import createA1Renderer from "$lib/utils/canvas/rpgmaker/createA1Renderer";
import createA2Renderer from "$lib/utils/canvas/rpgmaker/createA2Renderer";
import createA3Renderer from "$lib/utils/canvas/rpgmaker/createA3Renderer";
import createA4Renderer from "$lib/utils/canvas/rpgmaker/createA4Renderer";
import createA5Renderer from "$lib/utils/canvas/rpgmaker/createA5Renderer";
import createBCDERenderer from "$lib/utils/canvas/rpgmaker/createBCDERenderer";

let tilemaps = writable<TileRendererConfig[]>([]);

// buildTilemap().then(tilemapStore.set);

const tilemapStore = {
  subscribe: tilemaps.subscribe,
  update: tilemaps.update,
  set: tilemaps.set,
  find: (key: string) => get(tilemaps).find((tile) => tile.key === key),
  load: (tms: ImportedTilemap[]) => {
    const renderer: TileRendererConfig[] = [];
    tms.forEach((tm) => {
      switch (tm.type) {
        case "A1":
          renderer.push(...createA1Renderer(tm.image));
          break;
        case "A2":
          renderer.push(...createA2Renderer(tm.image));
          break;
        case "A3":
          renderer.push(...createA3Renderer(tm.image));
          break;
        case "A4":
          renderer.push(...createA4Renderer(tm.image));
          break;
        case "A5":
          renderer.push(...createA5Renderer(tm.image));
          break;
        case "B":
        case "C":
        case "D":
        case "E":
          renderer.push(...createBCDERenderer(tm.image, tm.type));
          break;
      }
    });
    tilemaps.set(renderer);
  },
};

export default tilemapStore;
