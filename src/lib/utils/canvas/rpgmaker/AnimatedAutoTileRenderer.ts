import {
  GLOBAL_TILE_ANIMATION_MODE,
  GLOBAL_TILE_ANIMATION_SPEED,
} from "$lib/utils/constants";
import type TileRenderer from "./TileRenderer";
import type { AutoTileConfig, SubTileType, TileSource } from "./types";

export default class AnimatedAutoTileRenderer implements TileRenderer {
  private readonly hts: number; // htf = halfTileSize
  private accumulatedTime: number = 0;
  private animationDuration: number = 1000;
  private animationStep: number = 0;
  private animationOffset: number = 0;

  private steps = 1;

  constructor(
    private readonly tilemap: TileSource,
    private readonly xStart: number,
    private readonly yStart: number,
    private readonly tileSize: number = 48
  ) {
    this.hts = this.tileSize / 2;
    if (GLOBAL_TILE_ANIMATION_SPEED !== 0) {
      this.animationDuration = 1000 / GLOBAL_TILE_ANIMATION_SPEED;
    }
  }

  public update(deltaTime: number): void {
    this.accumulatedTime += deltaTime;
    if (this.accumulatedTime >= this.animationDuration) {
      this.animationStep = (this.animationStep + this.steps) % 3;
      if (GLOBAL_TILE_ANIMATION_MODE === "alternating") {
        if (this.animationStep === 0 || this.animationStep === 2) {
          this.steps *= -1;
        }
      }
      this.animationOffset = this.tileSize * 2 * this.animationStep;
      this.accumulatedTime -= this.animationDuration;
    }
  }

  public drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.tilemap.data,
      this.xStart + this.animationOffset,
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
      this.tilemap.data,
      imageX + this.animationOffset,
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
      this.tilemap.data,
      imageX + this.animationOffset,
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
      this.tilemap.data,
      imageX + this.animationOffset,
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
      this.tilemap.data,
      imageX + this.animationOffset,
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
