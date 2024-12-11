<section id="importer">
  <header>
    <FileUpload onUpload={processImages} />
    <div>
      <Button disabled={invalid} onclick={generateMegaTilemap}>
        Generate MapForge Mega Tilemap
      </Button>
    </div>
  </header>
  <ul>
    {#each tilemaps as tilemap, index (tilemap.filename)}
      <UploadSettings {tilemap} {index} {onChanged} {onRemove} />
    {/each}
  </ul>
</section>

<style>
  #importer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-height: 100vh;
    overflow-y: auto;
  }

  header {
    display: flex;
    gap: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(20vw, 1fr));
  }
</style>

<script lang="ts">
  import FileUpload from "$lib/components/ui/FileUpload.svelte";
  import {
    type TileMapType,
    type ImportedTilemap,
    PREVIEW_SIZE,
  } from "./types";
  import UploadSettings from "./components/UploadSettings.svelte";
  import Button from "$lib/components/ui/Button.svelte";

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
        return "B-E";
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

  function generateMegaTilemap() {
    // ToDo: generate autotiles and build one big spritesheet with all tilemaps
    tilemaps = [];
  }
</script>
