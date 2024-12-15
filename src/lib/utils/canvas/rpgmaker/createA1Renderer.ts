import SimpleAutoTileRenderer from "./SimpleAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig } from "./types";

export default function createA1Renderer(
  image: HTMLImageElement
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 288, 384, 672],
    144: [0, 288, 384, 672],
    288: [0, 288, 384, 672],
    432: [0, 288, 384, 672],
  };
  return createAutoTiles(
    "A1",
    image,
    positions,
    (image, x, y, tileSize) => new SimpleAutoTileRenderer(image, x, y, tileSize)
  );
}
