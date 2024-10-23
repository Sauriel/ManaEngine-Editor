<div id="map" style={`--tileSize: ${tileSize}px;`}>
  <canvas bind:this={canvas} {width} {height} onclick={onCanvasClick}></canvas>
  <MapTools
    selected={selectedTool}
    onselect={(value) => (selectedTool = value)}
  />
</div>

<style>
  #map {
    grid-area: map;
    overflow: auto;
    max-height: calc(100dvh - var(--header-size));
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
  import tilemap from "$lib/stores/tilemapStore";
  import activeLayerIndex from "$lib/stores/layerStore";

  const GL_ID = "map-renderer";
  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(48);
  let selectedTool = $state<Tool>("brush");

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
              const tile = tilemap.find(twc.key);
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

  function onCanvasClick(event: MouseEvent) {
    const position = getPosition(event);
    if (selectedTool !== "eraser") {
      const tiles = selectedTiles.get();
      if (tiles.length > 0) {
        map.draw($activeLayerIndex, position, tiles);
      }
    } else {
      map.remove($activeLayerIndex, position);
    }
  }
</script>
