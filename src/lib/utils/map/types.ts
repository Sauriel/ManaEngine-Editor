import type { AutoTileConfig } from "../canvas/rpgmaker/types";

export type ForgeMap = {
  width: number;
  height: number;
  layers: ForgeMapLayer[];
};

export type ForgeMapLayer = {
  label: string;
  tiles: TileName[][];
};

export type TileName = string | null;

export type Tool =
  | "brush"
  | "line"
  | "rect-fill"
  | "rect-border"
  | "circle-fill"
  | "circle-border"
  | "fill"
  | "eraser";

export type TileWithConfig = {
  key: string;
  config: AutoTileConfig;
};

export type TileWithNeighbors = {
  topLeft: TileName;
  top: TileName;
  topRight: TileName;
  left: TileName;
  center: TileName;
  right: TileName;
  bottomLeft: TileName;
  bottom: TileName;
  bottomRight: TileName;
};
