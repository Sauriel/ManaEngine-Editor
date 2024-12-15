import {
  GLOBAL_TILE_ANIMATION_MODE,
  GLOBAL_TILE_ANIMATION_SPEED,
} from "$lib/utils/constants";
import type TileRenderer from "./TileRenderer";
import type { AutoTileConfig, SubTileType, TileSource } from "./types";

export default class AnimatedFlowTileRenderer implements TileRenderer {
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
      this.animationOffset = this.tileSize * this.animationStep;
      this.accumulatedTime -= this.animationDuration;
    }
  }

  public drawPreview(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.tilemap.data,
      this.xStart,
      this.yStart + this.animationOffset,
      this.hts,
      this.tileSize,
      x,
      y,
      this.hts,
      this.tileSize
    );
    ctx.drawImage(
      this.tilemap.data,
      this.xStart + this.tileSize + this.hts,
      this.yStart + this.animationOffset,
      this.hts,
      this.tileSize,
      x + this.hts,
      y,
      this.hts,
      this.tileSize
    );
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    config: AutoTileConfig
  ) {
    this.drawLeft(ctx, x, y, config.topLeft);
    this.drawRight(ctx, x, y, config.topRight);
  }

  private drawLeft(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart;
    let imageY = this.yStart;
    switch (type) {
      case "invcorner":
      case "vertical":
      case "open":
        imageX = this.xStart + this.tileSize;
        break;
    }
    ctx.drawImage(
      this.tilemap.data,
      imageX,
      imageY + this.animationOffset,
      this.hts,
      this.tileSize,
      x,
      y,
      this.hts,
      this.tileSize
    );
  }

  private drawRight(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: SubTileType
  ) {
    let imageX = this.xStart + this.tileSize + this.hts;
    let imageY = this.yStart;
    switch (type) {
      case "invcorner":
      case "horizontal":
      case "open":
        imageX = this.xStart + this.hts;
        break;
    }
    ctx.drawImage(
      this.tilemap.data,
      imageX,
      imageY + this.animationOffset,
      this.hts,
      this.tileSize,
      x + this.hts,
      y,
      this.hts,
      this.tileSize
    );
  }
}
