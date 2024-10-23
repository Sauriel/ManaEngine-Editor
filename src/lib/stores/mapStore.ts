import type { MousePosition } from "$lib/utils/canvas/types";
import createMap, { createLayer } from "$lib/utils/map/createMap";
import type { ForgeMap } from "$lib/utils/map/types";
import { cloneDeep } from "lodash";
import { get, writable } from "svelte/store";

const mapStore = writable<ForgeMap>(createMap(25, 15));

const map = {
  subscribe: mapStore.subscribe,
  update: mapStore.update,
  set: mapStore.set,
  createLayer: () =>
    mapStore.update((state) => {
      const map = cloneDeep(state);
      createLayer(map, `Layer ${map.layers.length + 1}`);
      return map;
    }),
  draw: (layer: number, position: MousePosition, tiles: string[]) =>
    mapStore.update((state) => {
      const map = cloneDeep(state);
      map.layers[layer].tiles[position.y][position.x] = tiles[0];
      return map;
    }),
  remove: (layer: number, position: MousePosition) =>
    mapStore.update((state) => {
      const map = cloneDeep(state);
      map.layers[layer].tiles[position.y][position.x] = null;
      return map;
    }),
  getTile: (layer: number, position: MousePosition) =>
    get(mapStore).layers[layer].tiles[position.y][position.x],
};

export default map;
