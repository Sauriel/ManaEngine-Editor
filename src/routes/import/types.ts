export const TILEMAP_TYPES = ["A1", "A2", "A3", "A4", "A5", "B-E"] as const;
export type TileMapType = (typeof TILEMAP_TYPES)[number] | "custom";

export type ImportedTilemap = {
  filename: string;
  canvas: OffscreenCanvas;
  type: TileMapType | null;
};

export const TILE_BASE_SIZE = 48;
export const PREVIEW_SIZE = 2;
