import SimpleTileRenderer from "./SimpleTileRenderer";
import type {
  TileType,
  TilePositions,
  TileRendererConfig,
  AutoTileConfig,
  TileSource,
} from "./types";

export default interface TileRenderer {
  drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    config?: AutoTileConfig
  ): void;
  update(deltaTime: number): void;
}

export function createAutoTiles(
  type: TileType,
  source: TileSource,
  positions: TilePositions,
  createRenderer: (
    source: TileSource,
    x: number,
    y: number,
    tileSize?: number
  ) => TileRenderer
): TileRendererConfig[] {
  const fileName = source.name;
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
        renderer: createRenderer(source, x, Number(y)),
      });
    });
  });
  return renderer;
}

export function createSingleTiles(
  source: TileSource,
  width: number,
  height: number,
  type: TileType,
  xOffset: number = 0
): TileRendererConfig[] {
  const fileName = source.name;
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
        renderer: new SimpleTileRenderer(source, x * 48 + xOffset, y * 48),
      });
    }
  }
  return renderer;
}
