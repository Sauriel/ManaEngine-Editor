<section style={`--tileSize: ${tileSize}px;`}>
  <canvas
    bind:this={canvas}
    {width}
    {height}
    onmousedown={onTileSelectionStart}
    onmousemove={onTileSelectionMove}
    onmouseup={onTileSelectionEnd}
  ></canvas>
</section>

<style>
  section {
    width: calc(8 * var(--tileSize) + var(--scrollbar-width));
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
</style>

<script lang="ts">
  import GameLoop from "$lib/stores/gameloop";
  import selectedTiles from "$lib/stores/selectedTilesStore";
  import {
    drawCheckerBg,
    drawGrid,
    drawSelection,
  } from "$lib/utils/canvas/tileDrawHelper";
  import type { TileRendererConfig } from "$lib/utils/canvas/rpgmaker/types";
  import { type Position } from "$lib/utils/canvas/types";
  import {
    GLOBAL_SHOW_ANIMATIONS,
    GLOBAL_TILE_BASE_SIZE,
  } from "$lib/utils/constants";
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber } from "svelte/store";

  type Props = {
    tilemaps: TileRendererConfig[];
  };

  const { tilemaps }: Props = $props();

  let unsubscribe: Unsubscriber;

  const activeBorderWidth = 4;
  const GL_ID = "tilemap-renderer";
  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(GLOBAL_TILE_BASE_SIZE);
  const tilemapWidth = $state<number>(8);
  let mouseDownPosition = $state<Position | null>(null);

  const width = $derived<number>(tilemapWidth * tileSize);
  const height = $derived<number>(
    Math.ceil(tilemaps.length / tilemapWidth) * tileSize
  );

  onMount(() => {
    GameLoop.addDraw(GL_ID, redrawCanvas);
    if (!GLOBAL_SHOW_ANIMATIONS) {
      redrawCanvas();
    }
  });

  $effect(() => {
    if (!GLOBAL_SHOW_ANIMATIONS) {
      tilemaps;
      redrawCanvas();
    }
  });

  unsubscribe = selectedTiles.subscribe(() => {
    redrawCanvas();
  });

  onDestroy(() => {
    GameLoop.removeDraw(GL_ID);
    unsubscribe();
  });

  function redrawCanvas() {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let tilemapIndex = 0;
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          drawCheckerBg(ctx, tileSize, x, y);
          drawGrid(ctx, tileSize, x, y);

          if (tilemaps.length > 0 && tilemapIndex < tilemaps.length) {
            const tile = tilemaps[tilemapIndex++];
            tile.renderer.drawPreview(ctx, x, y);
            drawGrid(ctx, tileSize, x, y, 0.1);

            if (selectedTiles.includes(tile.key)) {
              drawSelection(ctx, tileSize, x, y);
            }
          }
        }
      }
    }
  }

  function getPosition(event: MouseEvent): Position {
    return {
      x: Math.floor(event.offsetX / tileSize),
      y: Math.floor(event.offsetY / tileSize),
    };
  }

  function findTile(position: Position): TileRendererConfig | null {
    const index = position.y * tilemapWidth + position.x;
    return index < tilemaps.length ? tilemaps[index] : null;
  }

  function getAllPointsInArea(start: Position, end: Position): Position[] {
    const points: Position[] = [];

    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        points.push({ x, y });
      }
    }

    return points;
  }

  function selectTiles(position: Position) {
    selectedTiles.set([]);
    getAllPointsInArea(mouseDownPosition!, position)
      .map(findTile)
      .forEach((tile) => {
        if (tile && !selectedTiles.includes(tile.key)) {
          selectedTiles.push(tile.key);
        }
      });
  }

  function onTileSelectionStart(event: MouseEvent) {
    const position = getPosition(event);
    const tile = findTile(position);
    const isLastSelected =
      tile && selectedTiles.length() === 1 && selectedTiles.equals(0, tile.key);
    selectedTiles.set([]);
    if (!isLastSelected) {
      if (tile) {
        selectedTiles.push(tile.key);
      }
      mouseDownPosition = position;
    }
  }

  function onTileSelectionMove(event: MouseEvent) {
    if (mouseDownPosition) {
      const position = getPosition(event);
      const tile = findTile(position);
      if (tile && tile.auto) {
        mouseDownPosition = null;
      } else {
        selectTiles(position);
      }
    }
  }

  function onTileSelectionEnd(event: MouseEvent) {
    if (mouseDownPosition) {
      const position = getPosition(event);
      selectTiles(position);
    }
    mouseDownPosition = null;
  }
</script>
