<MapTools
  selected={selectedTool}
  onselect={(value) => (selectedTool = value)}
/>
<div id="map" style={`--tileSize: ${tileSize}px;`}>
  <canvas
    bind:this={canvas}
    {width}
    {height}
    onmousedown={onCanvasMouseDown}
    onmousemove={onCanvasMouseMove}
    onmouseup={onCanvasMouseUp}
  ></canvas>
  <MapEditorLayers />
</div>

<style>
  #map {
    grid-area: map;
    overflow: auto;
    max-height: 100dvh;
    position: relative;
  }
</style>

<script lang="ts">
  import MapTools from "./MapTools.svelte";
  import map from "$lib/stores/mapStore";
  import { drawCheckerBg } from "$lib/utils/canvas/checkerBg";
  import type { Tool } from "$lib/utils/map/types";
  import { onDestroy, onMount } from "svelte";
  import { gameloop } from "$lib/stores/gameloop";
  import selectedTiles from "$lib/stores/selectedTilesStore";
  import type { MousePosition } from "$lib/utils/canvas/types";
  import tilemapStore from "$lib/stores/tilemapStore";
  import activeLayerIndex from "$lib/stores/layerStore";
  import MapEditorLayers from "./MapEditorLayers.svelte";

  const GL_ID = "map-renderer";
  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(48);
  let selectedTool = $state<Tool>("brush");
  let mouseDownPosition = $state<MousePosition | null>(null);

  const width = $derived<number>($map.width * tileSize);
  const height = $derived<number>($map.height * tileSize);

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
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          drawCheckerBg(ctx, tileSize, x, y);
          for (let layer = 0; layer < $map.layers.length; layer++) {
            const twc = map.getTileWithConfig(layer, toMousePosition(x, y));
            if (twc) {
              const tile = tilemapStore.find(twc.key);
              if (tile) {
                tile.renderer.draw(ctx, x, y, twc.config);
              }
            }
          }
        }
      }
    }
  }

  function getPosition(event: MouseEvent): MousePosition {
    return toMousePosition(event.offsetX, event.offsetY);
  }

  function toMousePosition(x: number, y: number): MousePosition {
    return {
      x: Math.floor(x / tileSize),
      y: Math.floor(y / tileSize),
    };
  }

  function onCanvasMouseDown(event: MouseEvent) {
    const position = getPosition(event);
    mouseDownPosition = position;
    if (selectedTool === "brush") {
      const tiles = selectedTiles.get();
      if (tiles.length > 0) {
        map.draw($activeLayerIndex, position, tiles);
      }
    } else if (selectedTool === "eraser") {
      map.remove($activeLayerIndex, position);
    }
  }

  function onCanvasMouseMove(event: MouseEvent) {
    if (mouseDownPosition) {
      const position = getPosition(event);
      if (selectedTool === "brush") {
        const tiles = selectedTiles.get();
        if (tiles.length > 0) {
          map.draw($activeLayerIndex, position, tiles);
        }
      } else if (selectedTool === "eraser") {
        map.remove($activeLayerIndex, position);
      }
    }
  }

  function onCanvasMouseUp(event: MouseEvent) {
    if (mouseDownPosition) {
      const position = getPosition(event);
      const tiles = selectedTiles.get();
      switch (selectedTool) {
        case "fill":
          map.fill($activeLayerIndex, position, tiles);
          break;
        case "brush":
        case "line":
        case "rect-fill":
        case "rect-border":
        case "circle-fill":
        case "circle-border":
        case "eraser":
          break;
      }
    }
    mouseDownPosition = null;
  }
</script>
