import SimpleAutoTileRenderer from "./SimpleAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig } from "./types";

export default function createA2Renderer(
  image: HTMLImageElement
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 96, 192, 288, 384, 480, 576, 672],
    144: [0, 96, 192, 288, 384, 480, 576, 672],
    288: [0, 96, 192, 288, 384, 480, 576, 672],
    432: [0, 96, 192, 288, 384, 480, 576, 672],
  };
  return createAutoTiles(
    "a2",
    image,
    positions,
    (image, x, y, tileSize) => new SimpleAutoTileRenderer(image, x, y, tileSize)
  );
}
