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
  | "fill";
