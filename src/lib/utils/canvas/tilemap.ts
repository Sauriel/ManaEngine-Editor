import TileMapA1 from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_A1.png";
import TileMapA2 from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_A2.png";
import TileMapA3 from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_A3.png";
import TileMapA4 from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_A4.png";
import TileMapA5 from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_A5.png";
import TileMapB from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_B.png";
import TileMapC from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_C.png";
import TileMapD from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Outside_D.png";
import TileMapE from "$lib/assets/tiles/winlu/fantasy/exterior/Fantasy_Roofs.png";
import { loadImage } from "./image";
import createA1Renderer from "./rpgmaker/createA1Renderer";
import createA2Renderer from "./rpgmaker/createA2Renderer";
import createA3Renderer from "./rpgmaker/createA3Renderer";
import createA4Renderer from "./rpgmaker/createA4Renderer";
import createA5Renderer from "./rpgmaker/createA5Renderer";
import createBCDERenderer from "./rpgmaker/createBCDERenderer";
import type { TileRendererConfig } from "./rpgmaker/types";

export async function buildTilemap(): Promise<TileRendererConfig[]> {
  const a1Renderer = await loadImage(TileMapA1).then(createA1Renderer);
  const a2Renderer = await loadImage(TileMapA2).then(createA2Renderer);
  const a3Renderer = await loadImage(TileMapA3).then(createA3Renderer);
  const a4Renderer = await loadImage(TileMapA4).then(createA4Renderer);
  const a5Renderer = await loadImage(TileMapA5).then(createA5Renderer);
  const bRenderer = await loadImage(TileMapB).then((image) =>
    createBCDERenderer(image, "b")
  );
  const cRenderer = await loadImage(TileMapC).then((image) =>
    createBCDERenderer(image, "c")
  );
  const dRenderer = await loadImage(TileMapD).then((image) =>
    createBCDERenderer(image, "d")
  );
  const eRenderer = await loadImage(TileMapE).then((image) =>
    createBCDERenderer(image, "e")
  );
  return [
    ...a1Renderer,
    ...a2Renderer,
    ...a3Renderer,
    ...a4Renderer,
    ...a5Renderer,
    ...bRenderer,
    ...cRenderer,
    ...dRenderer,
    ...eRenderer,
  ];
}
