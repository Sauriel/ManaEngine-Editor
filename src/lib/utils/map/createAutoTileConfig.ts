import type { AutoTileConfig, SubTileType } from "../canvas/rpgmaker/types";
import type { TileWithNeighbors } from "./types";

export default function createAutoTileConfig(
  context: TileWithNeighbors
): AutoTileConfig {
  return {
    topLeft: findTopLeft(context),
    topRight: findTopRight(context),
    bottomRight: findBottomRight(context),
    bottomLeft: findBottomLeft(context),
  };
}

function findTopLeft(context: TileWithNeighbors): SubTileType {
  const { topLeft, top, left, center } = context;
  if (top === center) {
    if (left === center) {
      if (topLeft === center) {
        return "open";
      } else {
        return "invcorner";
      }
    } else {
      return "horizontal";
    }
  } else {
    if (left === center) {
      return "vertical";
    } else {
      return "corner";
    }
  }
}

function findTopRight(context: TileWithNeighbors): SubTileType {
  const { topRight, top, right, center } = context;
  if (top === center) {
    if (right === center) {
      if (topRight === center) {
        return "open";
      } else {
        return "invcorner";
      }
    } else {
      return "vertical";
    }
  } else {
    if (right === center) {
      return "horizontal";
    } else {
      return "corner";
    }
  }
}

function findBottomRight(context: TileWithNeighbors): SubTileType {
  const { bottomRight, bottom, right, center } = context;
  if (bottom === center) {
    if (right === center) {
      if (bottomRight === center) {
        return "open";
      } else {
        return "invcorner";
      }
    } else {
      return "vertical";
    }
  } else {
    if (right === center) {
      return "horizontal";
    } else {
      return "corner";
    }
  }
}

function findBottomLeft(context: TileWithNeighbors): SubTileType {
  const { bottomLeft, bottom, left, center } = context;
  if (bottom === center) {
    if (left === center) {
      if (bottomLeft === center) {
        return "open";
      } else {
        return "invcorner";
      }
    } else {
      return "vertical";
    }
  } else {
    if (left === center) {
      return "horizontal";
    } else {
      return "corner";
    }
  }
}
