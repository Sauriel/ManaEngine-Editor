import type { ForgeMap, ForgeMapLayer, TileName } from "./types";

export default function createMap(width: number, height: number): ForgeMap {
  const map: ForgeMap = {
    width,
    height,
    layers: [],
  };
  createLayer(map, "Layer 1");
  createLayer(map, "Layer 2");
  return map;
}

export function createLayer(map: ForgeMap, label: string) {
  const layer: ForgeMapLayer = {
    label,
    tiles: [],
  };
  for (let y = 0; y < map.height; y++) {
    const row: TileName[] = [];
    for (let x = 0; x < map.width; x++) {
      row.push(null);
    }
    layer.tiles.push(row);
  }
  map.layers.push(layer);
}
