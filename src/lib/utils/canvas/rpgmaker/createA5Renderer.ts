import { createSingleTiles } from "./TileRenderer";
import type { TileRendererConfig } from "./types";

export default function createA5Renderer(
  image: HTMLImageElement
): TileRendererConfig[] {
  return createSingleTiles(image, 8, 16, "a5");
}
