<li>
  <header>{tilemap.filename}</header>
  <div class="tile-types">
    {#each TILEMAP_TYPES as tilemapType}
      <label for={`tile-type-${tilemapType}__${index}`}>
        <span>{tilemapType}</span>
        <input
          id={`tile-type-${tilemapType}__${index}`}
          type="radio"
          name={`tilemap-type__${index}`}
          value={tilemapType}
          checked={tilemap.type === tilemapType}
          onchange={() => onTypeChanged(tilemapType)}
        />
      </label>
    {/each}
    <label class="warn" for={`tile-type-unknown____${index}`}>
      <span><Icon icon="fa6-solid:question" /></span>
      <input
        id={`tile-type-unknown____${index}`}
        type="radio"
        name={`tilemap-type__${index}`}
        value={null}
        checked={tilemap.type === null}
      />
    </label>
    <button class="danger" onclick={() => onRemove(tilemap)}>
      <Icon icon="fa6-solid:trash-can" />
    </button>
  </div>
  <canvas bind:this={previewCanvas}></canvas>
</li>

<style>
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  header {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .tile-types {
    display: flex;
    flex-wrap: nowrap;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-back--darker);
    padding: 0.75em 1em;
    cursor: pointer;
    transition:
      background 0.4s ease-in-out,
      border 0.4s ease-in-out;
    border: 1px solid var(--color-back--darker);
  }

  label:hover {
    background-color: var(--color-back--lighter);
  }

  label:has(input:checked) {
    background-color: var(--color-primary);
  }

  label:has(input:checked):hover {
    background-color: var(--color-primary--lighter);
  }

  label.warn:has(input:checked) {
    color: var(--color-back);
    background-color: var(--color-warn);
  }

  label.warn:has(input:checked):hover {
    background-color: var(--color-warn--lighter);
  }

  label:first-of-type {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
  }

  label:not(:first-of-type) {
    border-left: none;
  }

  label:last-of-type {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
  }

  label:not(:last-of-type) {
    border-right: none;
  }

  label > input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    white-space: nowrap;
    line-height: 0;
  }

  button {
    background-color: var(--color-primary);
    border: 1px solid var(--color-back--darker);
    aspect-ratio: 1;
    border-radius: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
  }

  button:hover {
    background-color: var(--color-primary--lighter);
  }

  button.danger {
    background-color: var(--color-danger);
  }

  button.danger:hover {
    background-color: var(--color-danger--lighter);
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import {
    PREVIEW_SIZE,
    TILE_BASE_SIZE,
    TILEMAP_TYPES,
    type ImportedTilemap,
    type TileMapType,
  } from "../types";
  import { drawCheckerBg } from "$lib/utils/canvas/checkerBg";

  interface Props {
    tilemap: ImportedTilemap;
    index: number;
    onChanged: (tilemap: ImportedTilemap) => void;
    onRemove: (tilemap: ImportedTilemap) => void;
  }

  let { tilemap = $bindable(), index, onChanged, onRemove }: Props = $props();

  let previewCanvas = $state.raw<HTMLCanvasElement>();

  $effect(() => {
    if (previewCanvas) {
      previewCanvas.width = tilemap.canvas.width;
      previewCanvas.height = tilemap.canvas.height;
      const context = previewCanvas.getContext("2d");
      const tileSize = TILE_BASE_SIZE / PREVIEW_SIZE;
      if (context) {
        for (let y = 0; y < previewCanvas.height; y += tileSize) {
          for (let x = 0; x < previewCanvas.width; x += tileSize) {
            drawCheckerBg(context, tileSize, x, y);
          }
        }
        context.drawImage(tilemap.canvas, 0, 0);
      }
    }
  });

  function onTypeChanged(type: TileMapType) {
    onChanged({ ...tilemap, type });
  }
</script>
