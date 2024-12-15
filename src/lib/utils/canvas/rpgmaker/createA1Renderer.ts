import AnimatedAutoTileRenderer from "./AnimatedAutoTileRenderer";
import AnimatedFlowTileRenderer from "./AnimatedFlowTileRenderer";
import SimpleAutoTileRenderer from "./SimpleAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type {
  TilePositions,
  TileRendererConfig,
  TileSource,
  XPos,
  YPos,
} from "./types";

export type AnimationMode = "autotile" | "flow" | "none";

type AnimationConfig = Record<YPos, Record<XPos, AnimationMode>>;

const ANIMATION_CONFIG: AnimationConfig = {
  0: {
    0: "autotile",
    288: "none",
    384: "autotile",
    672: "flow",
  },
  144: {
    0: "autotile",
    288: "none",
    384: "autotile",
    672: "flow",
  },
  288: {
    0: "autotile",
    288: "flow",
    384: "autotile",
    672: "flow",
  },
  432: {
    0: "autotile",
    288: "flow",
    384: "autotile",
    672: "none",
  },
};

export default function createA1Renderer(
  source: TileSource
): TileRendererConfig[] {
  const positions: TilePositions = Object.fromEntries(
    Object.entries(ANIMATION_CONFIG).map(([y, xs]) => [
      +y,
      Object.keys(xs).map(Number),
    ])
  );
  // const positions: TilePositions = {
  //   0: [0, 288, 384, 672],
  //   144: [0, 288, 384, 672],
  //   288: [0, 288, 384, 672],
  //   432: [0, 288, 384, 672],
  // };
  return createAutoTiles("A1", source, positions, (source, x, y, tileSize) => {
    const animationMode = ANIMATION_CONFIG[y][x];
    switch (animationMode) {
      case "autotile":
        return new AnimatedAutoTileRenderer(source, x, y, tileSize);
      case "flow":
        return new AnimatedFlowTileRenderer(source, x, y, tileSize);
      case "none":
        return new SimpleAutoTileRenderer(source, x, y, tileSize);
    }
  });
}
