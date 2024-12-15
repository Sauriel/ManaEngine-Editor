import { createSingleTiles } from "./TileRenderer";
import type { TileRendererConfig, TileSource, TileType } from "./types";

export default function createBCDERenderer(
  source: TileSource,
  type: TileType
): TileRendererConfig[] {
  return [
    ...createSingleTiles(source, 8, 16, type),
    ...createSingleTiles(source, 8, 16, type, 384),
  ];
}
