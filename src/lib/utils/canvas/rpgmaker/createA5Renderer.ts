import { createSingleTiles } from "./TileRenderer";
import type { TileRendererConfig, TileSource } from "./types";

export default function createA5Renderer(
  source: TileSource
): TileRendererConfig[] {
  return createSingleTiles(source, 8, 16, "A5");
}
