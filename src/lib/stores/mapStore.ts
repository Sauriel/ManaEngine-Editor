import type { MousePosition } from "$lib/utils/canvas/types";
import createAutoTileConfig from "$lib/utils/map/createAutoTileConfig";
import createMap, {
  createLayer as createMapLayer,
} from "$lib/utils/map/createMap";
import type {
  ForgeMap,
  TileName,
  TileWithConfig,
  TileWithNeighbors,
} from "$lib/utils/map/types";
import { cloneDeep } from "lodash";
import { get, writable } from "svelte/store";

const mapStore = writable<ForgeMap>(createMap(25, 15));

function createLayer() {
  mapStore.update((state) => {
    const map = cloneDeep(state);
    createMapLayer(map, `Layer ${map.layers.length + 1}`);
    return map;
  });
}

function draw(layer: number, position: MousePosition, tiles: string[]) {
  mapStore.update((state) => {
    const map = cloneDeep(state);
    map.layers[layer].tiles[position.y][position.x] = tiles[0];
    return map;
  });
}

function remove(layer: number, position: MousePosition) {
  mapStore.update((state) => {
    const map = cloneDeep(state);
    map.layers[layer].tiles[position.y][position.x] = null;
    return map;
  });
}

function getTile(layer: number, position: MousePosition): TileName {
  return get(mapStore).layers[layer].tiles[position.y][position.x];
}

function getTileWithConfig(
  layer: number,
  position: MousePosition
): TileWithConfig | null {
  const tiles = get(mapStore).layers[layer].tiles;
  const { x, y } = position;
  const key = tiles[y][x];
  if (!key) {
    return null;
  }
  const context: TileWithNeighbors = {
    topLeft: getTileKey(tiles, x - 1, y - 1),
    top: getTileKey(tiles, x, y - 1),
    topRight: getTileKey(tiles, x + 1, y - 1),
    left: getTileKey(tiles, x - 1, y),
    center: key,
    right: getTileKey(tiles, x + 1, y),
    bottomLeft: getTileKey(tiles, x - 1, y + 1),
    bottom: getTileKey(tiles, x, y + 1),
    bottomRight: getTileKey(tiles, x + 1, y + 1),
  };
  return {
    key,
    config: createAutoTileConfig(context),
  };
}

function getTileKey(tiles: TileName[][], x: number, y: number): TileName {
  if (y > 0 && x > 0 && y < tiles.length && x < tiles[y].length) {
    return tiles[y][x];
  }
  return null;
}

const map = {
  subscribe: mapStore.subscribe,
  update: mapStore.update,
  set: mapStore.set,
  createLayer,
  draw,
  remove,
  getTile,
  getTileWithConfig,
};

export default map;
