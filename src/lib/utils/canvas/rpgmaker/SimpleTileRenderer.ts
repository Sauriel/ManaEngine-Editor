import type TileRenderer from "./TileRenderer";

export default class SimpleTileRenderer implements TileRenderer {
  constructor(
    private readonly tilemap: HTMLImageElement,
    private readonly xStart: number,
    private readonly yStart: number,
    private readonly tileSize: number = 48
  ) {}

  public drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(ctx, x, y);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.tilemap,
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
