import type TileRenderer from "./TileRenderer";

export type XPos = number;

export type YPos = number;

export type TilePositions = Record<YPos, XPos[]>;

export const TILEMAP_TYPES = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "B",
  "C",
  "D",
  "E",
] as const;
export type TileType = (typeof TILEMAP_TYPES)[number];
// export type TileType = "a1" | "a2" | "a3" | "a4" | "a5" | "b" | "c" | "d" | "e";

export type SourceDataType =
  | "ImageBitmap"
  | "HTMLCanvasElement"
  | "HTMLImageElement"
  | "HTMLVideoElement"
  | "OffscreenCanvas"
  | "SVGImageElement"
  | "VideoFrame";

export type TileSource = {
  name: string;
  type: TileType;
  data: CanvasImageSource;
  dataType: SourceDataType;
};

export type TileRendererConfigGroup = {
  name: string;
  icon?: string;
  configs: TileRendererConfig[];
};

export type TileRendererConfig = {
  key: string;
  auto: boolean;
  type: TileType;
  position: number;
  renderer: TileRenderer;
};

export type SubTileType =
  | "corner"
  | "invcorner"
  | "horizontal"
  | "vertical"
  | "open";

export type AutoTileConfig = {
  topLeft: SubTileType;
  topRight: SubTileType;
  bottomRight: SubTileType;
  bottomLeft: SubTileType;
};
