import type { TileType } from "$lib/utils/canvas/rpgmaker/types";

export type TileMapType = TileType | "custom";

export type ImportedTilemap = {
  filename: string;
  canvas: OffscreenCanvas;
  image: HTMLImageElement;
  type: TileMapType | null;
};

export const TILE_BASE_SIZE = 48;
export const PREVIEW_SIZE = 2;
