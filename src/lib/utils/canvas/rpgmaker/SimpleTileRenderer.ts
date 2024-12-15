import type TileRenderer from "./TileRenderer";
import type { TileSource } from "./types";

export default class SimpleTileRenderer implements TileRenderer {
  constructor(
    private readonly tilemap: TileSource,
    private readonly xStart: number,
    private readonly yStart: number,
    private readonly tileSize: number = 48
  ) {}

  public drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(ctx, x, y);
  }

  public update(deltaTime: number): void {
    //
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.tilemap.data,
      this.xStart,
      this.yStart,
      this.tileSize,
      this.tileSize,
      x,
      y,
      this.tileSize,
      this.tileSize
    );
  }
}
