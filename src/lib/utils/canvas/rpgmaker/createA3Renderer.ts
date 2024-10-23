import SimpleSemiAutoTileRenderer from "./SimpleSemiAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type { TilePositions, TileRendererConfig } from "./types";

export default function createA3Renderer(
  image: HTMLImageElement
): TileRendererConfig[] {
  const positions: TilePositions = {
    0: [0, 96, 192, 288, 384, 480, 576, 672],
    96: [0, 96, 192, 288, 384, 480, 576, 672],
    192: [0, 96, 192, 288, 384, 480, 576, 672],
    288: [0, 96, 192, 288, 384, 480, 576, 672],
  };
  return createAutoTiles(
    "a3",
    image,
    positions,
    (image, x, y, tileSize) =>
      new SimpleSemiAutoTileRenderer(image, x, y, tileSize)
  );
}
