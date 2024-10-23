import type TileRenderer from "./TileRenderer";
import type { AutoTileConfig, SubTileType } from "./types";

export default class SimpleAutoTileRenderer implements TileRenderer {
  private readonly hts: number; // htf = halfTileSize

  constructor(
    private readonly tilemap: HTMLImageElement,
    private readonly xStart: number,
    private readonly yStart: number,
    private readonly tileSize: number = 48
  ) {
    this.hts = this.tileSize / 2;
  }

  public drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number) {
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

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    config: AutoTileConfig
  ) {
    this.drawTopLeft(ctx, x, y, config.topLeft);
    this.drawTopRight(ctx, x + this.hts, y, config.topRight);
    this.drawBottomRight(ctx, x + this.hts, y + this.hts, config.bottomRight);
    this.drawBottomLeft(ctx, x, y + this.hts, config.bottomLeft);
  }

  private drawTopLeft(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart;
    let imageY = this.yStart;
    switch (type) {
      case "corner":
        imageY = this.yStart + this.tileSize;
        break;
      case "invcorner":
        imageX = this.xStart + this.tileSize;
        break;
      case "horizontal":
        imageY = this.yStart + 2 * this.tileSize;
        break;
      case "vertical":
        imageX = this.xStart + this.tileSize;
        imageY = this.yStart + this.tileSize;
        break;
      case "open":
        imageX = this.xStart + this.tileSize;
        imageY = this.yStart + 2 * this.tileSize;
        break;
    }
    ctx.drawImage(
      this.tilemap,
      imageX,
      imageY,
      this.hts,
      this.hts,
      x,
      y,
      this.hts,
      this.hts
    );
  }

  private drawTopRight(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart;
    let imageY = this.yStart;
    switch (type) {
      case "corner":
        imageX = this.xStart + this.tileSize + this.hts;
        imageY = this.yStart + this.tileSize;
        break;
      case "invcorner":
        imageX = this.xStart + this.tileSize + this.hts;
        break;
      case "horizontal":
        imageX = this.xStart + this.hts;
        imageY = this.yStart + this.tileSize;
        break;
      case "vertical":
        imageX = this.xStart + this.tileSize + this.hts;
        imageY = this.yStart + 2 * this.tileSize;
        break;
      case "open":
        imageX = this.xStart + this.hts;
        imageY = this.yStart + 2 * this.tileSize;
        break;
    }
    ctx.drawImage(
      this.tilemap,
      imageX,
      imageY,
      this.hts,
      this.hts,
      x,
      y,
      this.hts,
      this.hts
    );
  }

  private drawBottomLeft(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart;
    let imageY = this.yStart;
    switch (type) {
      case "corner":
        imageY = this.yStart + 2 * this.tileSize + this.hts;
        break;
      case "invcorner":
        imageX = this.xStart + this.tileSize;
        imageY = this.yStart + this.hts;
        break;
      case "horizontal":
        imageX = this.xStart + this.tileSize;
        imageY = this.yStart + 2 * this.tileSize + this.hts;
        break;
      case "vertical":
        imageY = this.yStart + this.tileSize + this.hts;
        break;
      case "open":
        imageX = this.xStart + this.tileSize;
        imageY = this.yStart + this.tileSize + this.hts;
        break;
    }
    ctx.drawImage(
      this.tilemap,
      imageX,
      imageY,
      this.hts,
      this.hts,
      x,
      y,
      this.hts,
      this.hts
    );
  }

  private drawBottomRight(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart;
    let imageY = this.yStart;
    switch (type) {
      case "corner":
        imageX = this.xStart + this.tileSize + this.hts;
        imageY = this.yStart + 2 * this.tileSize + this.hts;
        break;
      case "invcorner":
        imageX = this.xStart + this.tileSize + this.hts;
        imageY = this.yStart + this.hts;
        break;
      case "horizontal":
        imageX = this.xStart + this.hts;
        imageY = this.yStart + 2 * this.tileSize + this.hts;
        break;
      case "vertical":
        imageX = this.xStart + this.tileSize + this.hts;
        imageY = this.yStart + this.tileSize + this.hts;
        break;
      case "open":
        imageX = this.xStart + this.hts;
        imageY = this.yStart + this.tileSize + this.hts;
        break;
    }
    ctx.drawImage(
      this.tilemap,
      imageX,
      imageY,
      this.hts,
      this.hts,
      x,
      y,
      this.hts,
      this.hts
    );
  }
}
