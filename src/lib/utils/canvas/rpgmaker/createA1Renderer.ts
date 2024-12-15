import AnimatedAutoTileRenderer, {
  type AnimationType,
} from "./AnimatedAutoTileRenderer";
import { createAutoTiles } from "./TileRenderer";
import type {
  TilePositions,
  TileRendererConfig,
  TileSource,
  XPos,
  YPos,
} from "./types";

type AnimationConfig = Record<YPos, Record<XPos, AnimationType>>;

const ANIMATION_CONFIG: AnimationConfig = {
  0: {
    0: "autotile",
    288: null,
    384: "autotile",
    672: "flow",
  },
  144: {
    0: "autotile",
    288: null,
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
    672: null,
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
  return createAutoTiles(
    "A1",
    source,
    positions,
    (source, x, y, tileSize) =>
      new AnimatedAutoTileRenderer(
        source,
        x,
        y,
        tileSize,
        ANIMATION_CONFIG[y][x]
      )
  );
}
