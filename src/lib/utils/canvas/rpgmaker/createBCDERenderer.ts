import { createSingleTiles } from "./TileRenderer";
import type { TileRendererConfig, TileType } from "./types";

export default function createBCDERenderer(
  image: HTMLImageElement,
  type: TileType
): TileRendererConfig[] {
  return [
    ...createSingleTiles(image, 8, 16, type),
    ...createSingleTiles(image, 8, 16, type, 384),
  ];
}
