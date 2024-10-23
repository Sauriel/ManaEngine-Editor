import SimpleTileRenderer from "./SimpleTileRenderer";
import type {
  TileType,
  TilePositions,
  TileRendererConfig,
  AutoTileConfig,
} from "./types";

export default interface TileRenderer {
  drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    config?: AutoTileConfig
  ): void;
}

export function createAutoTiles(
  type: TileType,
  image: HTMLImageElement,
  positions: TilePositions,
  createRenderer: (
    image: HTMLImageElement,
    x: number,
    y: number,
    tileSize?: number
  ) => TileRenderer
): TileRendererConfig[] {
  const fileName = image.src.split("/").pop()!.split(".").shift();
  const renderer: TileRendererConfig[] = [];
  let position = 1;
  Object.entries(positions).forEach(([y, xs]) => {
    xs.forEach((x) => {
      const pos = position++;
      renderer.push({
        key: `${fileName}-${pos}`,
        auto: true,
        type: type,
        position: pos,
        renderer: createRenderer(image, x, Number(y)),
      });
    });
  });
  return renderer;
}

export function createSingleTiles(
  image: HTMLImageElement,
  width: number,
  height: number,
  type: TileType,
  xOffset: number = 0
): TileRendererConfig[] {
  const fileName = image.src.split("/").pop()!.split(".").shift();
  const renderer: TileRendererConfig[] = [];
  let position = 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = position++;
      renderer.push({
        key: `${fileName}-${xOffset + pos}`,
        auto: false,
        type: type,
        position: pos,
        renderer: new SimpleTileRenderer(image, x * 48 + xOffset, y * 48),
      });
    }
  }
  return renderer;
}
