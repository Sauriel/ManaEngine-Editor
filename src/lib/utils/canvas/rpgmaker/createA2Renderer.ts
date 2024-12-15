import SimpleAutoTileRenderer from "./SimpleAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig, TileSource } from "./types";

export default function createA2Renderer(
  source: TileSource
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 96, 192, 288, 384, 480, 576, 672],
    144: [0, 96, 192, 288, 384, 480, 576, 672],
    288: [0, 96, 192, 288, 384, 480, 576, 672],
    432: [0, 96, 192, 288, 384, 480, 576, 672],
  };
  return createAutoTiles(
    "A2",
    source,
    positions,
    (source, x, y, tileSize) =>
      new SimpleAutoTileRenderer(source, x, y, tileSize)
  );
}
