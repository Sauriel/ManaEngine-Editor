import SimpleSemiAutoTileRenderer from "./SimpleSemiAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig, TileSource } from "./types";

export default function createA3Renderer(
  source: TileSource
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 96, 192, 288, 384, 480, 576, 672],
    96: [0, 96, 192, 288, 384, 480, 576, 672],
    192: [0, 96, 192, 288, 384, 480, 576, 672],
    288: [0, 96, 192, 288, 384, 480, 576, 672],
  };
  return createAutoTiles(
    "A3",
    source,
    positions,
    (source, x, y, tileSize) =>
      new SimpleSemiAutoTileRenderer(source, x, y, tileSize)
  );
}
