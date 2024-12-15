import SimpleAutoTileRenderer from "./SimpleAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig, TileSource } from "./types";

export default function createA1Renderer(
  source: TileSource
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 288, 384, 672],
    144: [0, 288, 384, 672],
    288: [0, 288, 384, 672],
    432: [0, 288, 384, 672],
  };
  return createAutoTiles(
    "A1",
    source,
    positions,
    (source, x, y, tileSize) =>
      new SimpleAutoTileRenderer(source, x, y, tileSize)
  );
}
