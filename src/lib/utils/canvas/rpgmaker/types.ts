import type TileRenderer from "./TileRenderer";

export type XPos = number;

export type YPos = number;

export type TilePositions = Record<YPos, XPos[]>;

export type TileType = "a1" | "a2" | "a3" | "a4" | "a5" | "b" | "c" | "d" | "e";

export type TileRendererConfig = {
  key: string;
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
