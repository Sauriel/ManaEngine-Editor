<ul>
  <li>
    <FileUpload fluid onUpload={processImages} />
  </li>
  {#each tilemaps as tilemap, index (tilemap.filename)}
    <UploadSettings {tilemap} {index} {onChanged} {onRemove} />
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
    min-height: 100%;
  }
</style>

<script lang="ts">
  import FileUpload from "$lib/components/ui/FileUpload.svelte";
  import tilemapStore from "$lib/stores/tilemapStore";
  import type { TileSource, TileType } from "$lib/utils/canvas/rpgmaker/types";
  import {
    type TileMapType,
    type ImportedTilemap,
    PREVIEW_SIZE,
  } from "./types";
  import UploadSettings from "./UploadSettings.svelte";

  let tilemaps = $state<ImportedTilemap[]>([]);

  const invalid = $derived<boolean>(
    tilemaps.length === 0 || tilemaps.findIndex((tm) => tm.type === null) >= 0
  );

  function processImages(files: FileList) {
    const promises: Promise<ImportedTilemap>[] = [];

    for (let file of files) {
      promises.push(processImage(file));
    }

    Promise.allSettled(promises).then((results) => {
      let tm: ImportedTilemap[] = [...tilemaps];
      results.forEach((r) => {
        if (r.status === "fulfilled") {
          tm = tm.filter((t) => t.filename !== r.value.filename);
          tm.push(r.value);
        } else {
          console.error(`Could not process image.`, r.reason);
        }
      });
      tilemaps = tm.toSorted((a, b) => a.filename.localeCompare(b.filename));
    });
  }

  function processImage(file: File): Promise<ImportedTilemap> {
    if (!file.type.startsWith("image/")) {
      return Promise.reject(`${file.type} is no image!`);
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const previewWidth = image.width / PREVIEW_SIZE;
        const previewHeight = image.height / PREVIEW_SIZE;

        const offscreenCanvas = new OffscreenCanvas(
          previewWidth,
          previewHeight
        );
        const context = offscreenCanvas.getContext("2d");

        if (!context) {
          reject("Could not create 2d context!");
        } else {
          context.clearRect(
            0,
            0,
            offscreenCanvas.width,
            offscreenCanvas.height
          );
          context.drawImage(
            image,
            0,
            0,
            offscreenCanvas.width,
            offscreenCanvas.height
          );

          const probableType = findProbableTilemapType(
            image.width,
            image.height,
            file.name
          );

          const tilemap: ImportedTilemap = {
            filename: file.name,
            canvas: offscreenCanvas,
            image,
            type: probableType,
          };
          resolve(tilemap);
        }

        URL.revokeObjectURL(image.src);
      };

      image.src = URL.createObjectURL(file);
    });
  }

  function findProbableTilemapType(
    width: number,
    height: number,
    name: string
  ): TileMapType | null {
    if (width === 768) {
      if (height === 576) {
        if (name.toLowerCase().includes("a1")) {
          return "A1";
        } else if (name.toLowerCase().includes("a2")) {
          return "A2";
        } else {
          return null;
        }
      } else if (height === 384) {
        return "A3";
      } else if (height === 720) {
        return "A4";
      } else if (height === 768) {
        if (name.toLowerCase().includes("_b.")) {
          return "B";
        } else if (name.toLowerCase().includes("_c.")) {
          return "C";
        } else if (name.toLowerCase().includes("_d.")) {
          return "D";
        } else {
          return "E";
        }
      }
    } else if (width === 384 && height === 768) {
      return "A5";
    }
    // ToDo: add possibility to also upload charsets and select a custom type and set the grid to slice it (maybe animation settings?)
    return null;
  }

  function onChanged(tilemap: ImportedTilemap) {
    const index = tilemaps.findIndex((tm) => tm.filename === tilemap.filename);
    if (index >= 0) {
      tilemaps.splice(index, 1, tilemap);
    }
  }

  function onRemove(tilemap: ImportedTilemap) {
    const index = tilemaps.findIndex((tm) => tm.filename === tilemap.filename);
    if (index >= 0) {
      tilemaps.splice(index, 1);
    }
  }

  function convertToSource(tilemap: ImportedTilemap): TileSource {
    let tileType: TileType;
    if (!tilemap.type || tilemap.type === "custom") {
      tileType = "E"; // this should not happen;
    } else {
      tileType = tilemap.type;
    }
    return {
      name: tilemap.filename.split(".").shift() ?? "UNKNOWN",
      type: tileType,
      data: tilemap.image,
      dataType: "HTMLImageElement",
    };
  }

  export function onSave(): Promise<void> {
    if (invalid) {
      return Promise.reject();
    }
    tilemapStore.load(tilemaps.map(convertToSource));
    tilemaps = [];
    return Promise.resolve();
  }

  export function onCancel(): Promise<void> {
    tilemaps = [];
    return Promise.resolve();
  }
</script>
