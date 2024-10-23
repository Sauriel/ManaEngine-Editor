<aside style={`--tileSize: ${tileSize}px;`}>
  <canvas
    bind:this={canvas}
    {width}
    {height}
    onmousedown={onTileSelectionStart}
    onmousemove={onTileSelectionMove}
    onmouseup={onTileSelectionEnd}
  ></canvas>
</aside>

<style>
  aside {
    grid-area: tilemap;
    width: calc(8 * var(--tileSize) + var(--scrollbar-width));
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100dvh;
  }
</style>

<script lang="ts">
  import { gameloop } from "$lib/stores/gameloop";
  import tilemap from "$lib/stores/tilemapStore";
  import { drawCheckerBg } from "$lib/utils/canvas/checkerBg";
  import { type MousePosition } from "$lib/utils/canvas/types";
  import { onDestroy, onMount } from "svelte";

  const activeBorderWidth = 4;
  const GL_ID = "tilemap-renderer";
  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(48);
  const tilemapWidth = $state<number>(8);
  let selectedTiles = $state<string[]>([]);
  let mouseDownPosition = $state<MousePosition | null>(null);

  const width = $derived<number>(tilemapWidth * tileSize);
  const height = $derived<number>(
    Math.ceil($tilemap.length / tilemapWidth) * tileSize
  );

  onMount(() => {
    gameloop.addLoopParticipant({
      id: GL_ID,
      render: redrawCanvas,
    });
  });

  onDestroy(() => gameloop.removeLoopParticipant(GL_ID));

  function redrawCanvas() {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let tilemapIndex = 0;
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          drawCheckerBg(ctx, tileSize, x, y);

          if ($tilemap.length > 0 && tilemapIndex < $tilemap.length) {
            const tile = $tilemap[tilemapIndex++];
            tile.renderer.drawPreview(ctx, x, y);

            if (selectedTiles.includes(tile.key)) {
              ctx.fillStyle = getComputedStyle(document.body).getPropertyValue(
                "--color-front"
              );
              ctx.globalAlpha = 0.2;
              ctx.fillRect(x, y, tileSize, tileSize);
              ctx.globalAlpha = 1;
              ctx.fillRect(x, y, tileSize, activeBorderWidth);
              ctx.fillRect(
                x,
                y + (tileSize - activeBorderWidth),
                tileSize,
                activeBorderWidth
              );
              ctx.fillRect(x, y, activeBorderWidth, tileSize);
              ctx.fillRect(
                x + (tileSize - activeBorderWidth),
                y,
                activeBorderWidth,
                tileSize
              );
            }
          }
        }
      }
    }
  }

  function getPosition(event: MouseEvent): MousePosition {
    return {
      x: Math.floor(event.offsetX / tileSize),
      y: Math.floor(event.offsetY / tileSize),
    };
  }

  function findTileKey(position: MousePosition): string | null {
    const index = position.y * tilemapWidth + position.x;
    const tile = $tilemap[index];
    if (!tile) {
      return null;
    }
    return tile.key;
  }

  function getAllPointsInArea(
    start: MousePosition,
    end: MousePosition
  ): MousePosition[] {
    const points: MousePosition[] = [];

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

  function selectTiles(position: MousePosition) {
    selectedTiles = [];
    getAllPointsInArea(mouseDownPosition!, position)
      .map(findTileKey)
      .forEach((key) => {
        if (key && !selectedTiles.includes(key)) {
          selectedTiles.push(key);
        }
      });
  }

  function onTileSelectionStart(event: MouseEvent) {
    const position = getPosition(event);
    const key = findTileKey(position);
    const isLastSelected =
      selectedTiles.length === 1 && selectedTiles[0] === key;
    selectedTiles = [];
    if (!isLastSelected) {
      if (key) {
        selectedTiles.push(key);
      }
      mouseDownPosition = position;
    }
  }

  function onTileSelectionMove(event: MouseEvent) {
    if (mouseDownPosition) {
      const position = getPosition(event);
      selectTiles(position);
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
