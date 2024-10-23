import createMap, { createLayer } from "$lib/utils/map/createMap";
import type { ForgeMap } from "$lib/utils/map/types";
import { cloneDeep, update } from "lodash";
import { writable } from "svelte/store";

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
};

export default map;
