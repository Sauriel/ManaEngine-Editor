import localForage from "localforage";
import type { TileSource } from "../canvas/rpgmaker/types";
import { loadImage } from "../canvas/image";

type TileInfo = Pick<TileSource, "name" | "type">;

const DB_KEY_FILES = "files";

function getDataUrl(source: TileSource): string {
  if (source.dataType !== "HTMLImageElement") {
    throw new Error(`${source.dataType} is not supported!`);
  }
  const image = source.data as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  context!.drawImage(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export function persistTileSources(
  sources: TileSource[],
  name: string = "default_tilemap"
) {
  const tilemapDb = localForage.createInstance({ name });
  const tileInfos: TileInfo[] = sources.map((s) => ({
    name: s.name,
    type: s.type,
  }));
  tilemapDb.setItem(DB_KEY_FILES, tileInfos);
  sources.forEach((source) =>
    tilemapDb.setItem(source.name, getDataUrl(source))
  );
}

export async function loadPersistTileSources(
  name: string = "default_tilemap"
): Promise<TileSource[]> {
  const tilemapDb = localForage.createInstance({ name });
  const files = await tilemapDb.getItem<TileInfo[]>(DB_KEY_FILES);

  if (!files) {
    throw new Error(`No files for tilemap "${name}" found!`);
  }

  const sources: TileSource[] = [];

  for (const file of files) {
    const dataUrl = await tilemapDb.getItem<string>(file.name);

    if (!dataUrl) {
      throw new Error(`No file "${file.name}" for tilemap "${name}" found!`);
    }

    const data = await loadImage(dataUrl);
    const source: TileSource = {
      name: file.name,
      type: file.type,
      dataType: "HTMLImageElement",
      data,
    };
    sources.push(source);
  }

  return sources;
}
